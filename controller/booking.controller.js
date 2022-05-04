const e = require("express")
const { formatDate, reverseDate, dataProcess, sleep } = require("../config/helper")
const { getRoomMapByID, getRoomByID, getTicketPrice, postBookTicket, handleCustomerPoint, getScheduleSeatMapByID, updateScheduleSeatMap, postBillDetail } = require("../models/booking.model")
const { getALlMovieID, getMovieDetailById } = require("../models/movie.model")
const { getScheduleByDate, getScheduleDateList, getScheduleByMovie, getScheduleByID } = require("../models/schedule.model")
const adminProduct = require('../models/adminProduct.model');
const { handleLogin } = require("../models/account.model")

const getScheduleList = async (req, res) => {
    // const date = "2022-05-18";
    let date = req.query['date']
    let context = []
    let scheduleDate
    scheduleDate = dataProcess(await getScheduleDateList()).map(e => formatDate(e.day))
    if (date === "") {
        date = reverseDate(scheduleDate[0])
    }
    try {
        const movieIdList = await getALlMovieID()
        const data = await getScheduleByDate(date)
        const scheduleValue = dataProcess(data)
        dataProcess(movieIdList).forEach(async i => {
            let tmp = scheduleValue.filter(e => e.idphim === i.idphim)
            const movieDataRaw = await getMovieDetailById(i.idphim)

            if (movieDataRaw) {
                const movieReleaseDate = formatDate(movieDataRaw.release_date)
                const movieData = {
                    id: movieDataRaw.idphim,
                    img: movieDataRaw.poster_path,
                    title: movieDataRaw.title,
                    overview: movieDataRaw.overview,
                    vote_average: movieDataRaw.vote_average,
                    release_date: movieReleaseDate,
                    duration: movieDataRaw.duration
                }

                tmp = tmp.map(e => ({
                    schedule: {
                        idsuatchieu: e.idsuatchieu,
                        start: e.start.slice(0, -3),
                        day: formatDate(e.day),
                        idphim: e.idphim,
                        idphongchieu: e.idphongchieu,
                        seatmap: JSON.parse(e.seatmap)
                    },
                }
                ))
                context = [
                    ...context,
                    {
                        movieInfo: movieData,
                        schedules: tmp
                    }
                ]
            }
        });

    } catch (error) {
        console.error(error.message)
    }

    await sleep(100)


    res.render('booking/schedule', {
        title: "Schedule",
        path: "schedule",
        currentDate: reverseDate(date),
        context,
        scheduleDate
    })
}


const getMovieSchedule = async (req, res) => {
    const id = req.query['id']
    if (id === undefined) {
        return res.redirect('/')
    }
    let movieData
    let scheduleDateList = []
    try {
        const scheduleDateListRaw = dataProcess(await getScheduleByMovie(id))
        const dateList = (new Set(scheduleDateListRaw.map(e => e.day)))
        dateList.forEach(e => {
            let tmp = scheduleDateListRaw.filter(i => i.day === e)

            tmp = tmp.map(e => ({
                idsuatchieu: e.idsuatchieu,
                start: e.start.slice(0, -3),
                day: formatDate(e.day),
                idphim: e.idphim,
                idphongchieu: e.idphongchieu,
                seatmap: JSON.parse(e.seatmap)
            }
            ))
            scheduleDateList = [
                ...scheduleDateList,
                {
                    session: {
                        date: formatDate(e),
                        list: tmp
                    }
                }
            ]
        })
        movieRaw = await getMovieDetailById(id)

        movieData = {
            id: movieRaw.idphim,
            title: movieRaw.title,
            overview: movieRaw.overview,
            vote_average: movieRaw.vote_average,
            release_date: formatDate(movieRaw.release_date),
            poster_path: movieRaw.poster_path,
            duration: movieRaw.duration
        }

    } catch (error) {
        console.error(error.message)
    }

    res.render("booking/book", {
        title: "Booking",
        path: "booking",
        movieData,
        scheduleDateList
    })
}

const getBookingOption = async (req, res) => {
    if(req.session.user===undefined){
        return res.redirect('/account/login')
    }else{

        const idSchedule = req.query["id"]
        let schedule
        let movieData
        let roomMap
        let roomData
        let price
        let idkh
    
        if (idSchedule === undefined) {
            return res.redirect('/')
        }
    
        try {
            //popcorn
            const adminProducts = await adminProduct.handleReadProduct();
            var resultArray = Object.values(JSON.parse(JSON.stringify(adminProducts)));
            //ticket seat
            const priceRaw = await getTicketPrice()
            price = priceRaw.price
            //get user
            const userRaw = await handleLogin(req.session.user)
            console.log(userRaw)
            idkh = userRaw.idkh
            console.log(idkh)
            // Schedule
            const scheduleRaw = await getScheduleByID(idSchedule)
            schedule = {
                idsuatchieu: scheduleRaw.idsuatchieu,
                start: scheduleRaw.start.slice(0, -3),
                day: formatDate(scheduleRaw.day),
                idphim: scheduleRaw.idphim,
                idphongchieu: scheduleRaw.idphongchieu,
                seatmap: JSON.parse(scheduleRaw.seatmap)
            }
    
    
            if (schedule) {
                const movieDataRaw = await getMovieDetailById(schedule.idphim)
                const roomDataRaw = await getRoomByID(schedule.idphongchieu)
    
                movieData = {
                    id: movieDataRaw.idphim,
                    img: movieDataRaw.poster_path,
                    title: movieDataRaw.title,
                    overview: movieDataRaw.overview,
                    vote_average: movieDataRaw.vote_average,
                    release_date: formatDate(movieDataRaw.release_date),
                    duration: movieDataRaw.duration
                }
    
                roomData = {
                    id: roomDataRaw.idphongchieu,
                    name: roomDataRaw.name,
                    idMap: roomDataRaw.idmap
                }
    
                const roomMapRaw = await getRoomMapByID(roomData.idMap)
    
                roomMap = {
                    id: roomMapRaw.id,
                    numRow: roomMapRaw.numrow,
                    numColumn: roomMapRaw.numcolumn,
                }
            }
    
        } catch (error) {
            console.error(error.message)
        }
    
        await sleep(100)
    
    
        res.render('booking/option', {
            title: "Book ticket & more options",
            path: "option",
            price,
            idkh,
            movieData,
            roomMap,
            roomData,
            schedule,
            resultArray
        })
    }
}

const bookTicket = async (req, res) => {
    console.log(req.body)
    let { seats, bookedMap, idsuatchieu, price, idkh,productFood } = req.body
    let ticketId
    if (!seats) {
        return res.json({
            code: 1,
            message: "Please choose your seat before paying"
        })
    }
    else if (!idsuatchieu || !price || !idkh || !bookedMap) {
        return res.json({
            code: 1,
            message: "Failure to book a ticket due to a lack of input data"
        })
    } else {
        try {
            ticketId = await postBookTicket(seats, idsuatchieu, price, idkh);
            
            if (ticketId) {
                // Convert string to array
                bookedMap = bookedMap.split(",").map(e => +e)
                // Get seat map
                let getMap = await getScheduleSeatMapByID(idsuatchieu)
                const seatIndex = []
                getMap = JSON.parse(getMap.seatmap)
                let checkCount = 0
                for (let e of bookedMap) {
                    if (getMap.includes(e)) {
                        seatIndex.push(e)
                        checkCount++
                    }
                }
                if (checkCount === 0) {
                    getMap = [...getMap, ...bookedMap]
                    let scheduleStatus = await updateScheduleSeatMap(idsuatchieu, JSON.stringify(getMap))
                    //handle booking food
                    if(productFood.length === 0) {
                        
                        if (scheduleStatus == true) {
                            return res.json({
                                code: 0,
                                ticketId,
                                message: "Book ticket successfully"
                            })
                        } else {
                            return res.json({
                                code: 1,
                                message: "Something went wrong!"
                            })
                        }
                    }else{
                        // let result;
                        // let re
                        let ticketArray = [ticketId]
                        // console.log(ticketArray)
                        // var output = productFood.map(function(obj) {
                        //     return Object.keys(obj).sort().map(function(key) { 
                        //       return obj[key];
                        //     });
                        //   });
                        // console.log(output)
                        var output = []
                        productFood.forEach(e => {
                            output = [...output,[e.idsp,e.quantity,ticketId]]
                        })
                        //console.log(output);

                        // for(let pf of productFood){
                            // console.log(pf);
                            // result =  Object.keys(pf).map((key) => [pf[key]]);
                            // re = result.concat(ticketArray)
                            // console.log(re)
                        // }

                        // console.log(ticketId)
                        if(await postBillDetail(output) ){
                            return res.json({
                                code: 0,
                                ticketId,
                                message: "Book ticket successful!"
                            })
                        } else {
                            return res.json({
                                code: 1,
                                message: "Something went wrong!"
                            })
                        }
                    }

                } else {
                    return res.json({
                        code: 1,
                        seatIndex,
                        message: "Someone has occupied seat "
                    })
                }

            } else {
                return res.json({
                    code: 1,
                    message: "Something went wrong!"
                })
            }
        } catch (error) {
            console.log("Get some error")
            console.error(error.message)
        }
    }
}

const bookProduct = (req,res) =>{
    let { productFood } = req.body;
    console.log(productFood);
    // productFood.forEach(p => console.log(p.idsp))
}

module.exports = {
    getScheduleList,
    getMovieSchedule,
    getBookingOption,
    bookTicket,
    bookProduct
}