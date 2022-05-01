const { formatDate, reverseDate, dataProcess, sleep } = require("../config/helper")
const { getRoomMapByID } = require("../models/booking.model")
const { getALlMovieID, getMovieDetailById } = require("../models/movie.model")
const { getScheduleByDate, getScheduleDateList, getScheduleByMovie, getScheduleByID } = require("../models/schedule.model")


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
    const idSchedule = req.query["id"]
    let schedule
    let movieData
    let roomMap
    if (idSchedule === undefined) {
        return res.redirect('/')
    }

    try {
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
            const roomMapRaw = await getRoomMapByID(schedule.idphongchieu)
            console.log(roomMapRaw)

            movieData = {
                id: movieDataRaw.idphim,
                img: movieDataRaw.poster_path,
                title: movieDataRaw.title,
                overview: movieDataRaw.overview,
                vote_average: movieDataRaw.vote_average,
                release_date: formatDate(movieDataRaw.release_date),
                duration: movieDataRaw.duration
            }

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
        movieData,
        roomMap,
        schedule
    })
}


module.exports = {
    getScheduleList,
    getMovieSchedule,
    getBookingOption
}