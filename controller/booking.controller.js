const { formatDate, reverseDate, dateProcess } = require("../config/helper")
const { getALlMovieID, getMovieDetailById } = require("../models/movie.model")
const { getScheduleByDate, getScheduleDateList, getScheduleByMovie } = require("../models/schedule.model")


const getScheduleList = async (req, res) => {
    // const date = "2022-05-18";
    let date = req.query['date']
    let context = []
    let scheduleDate
    scheduleDate = dateProcess(await getScheduleDateList()).map(e => formatDate(e.day))
    if (date === "") {
        date = reverseDate(scheduleDate[0])
    }
    try {
        const movieIdList = await getALlMovieID()
        const data = await getScheduleByDate(date)
        const scheduleValue = dateProcess(data)
        dateProcess(movieIdList).forEach(async i => {
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

                tmp = tmp.map(e => {
                    const date = new Date(e.day)
                    return ({
                        schedule: {
                            idsuatchieu: e.idsuatchieu,
                            start: e.start.slice(0, -3),
                            day: date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear(),
                            idphim: e.idphim,
                            idphongchieu: e.idphongchieu,
                            seatmap: JSON.parse(e.seatmap)
                        },
                    }
                    )
                })
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

    await sleep(1000)
    function sleep(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }

    res.render('booking/schedule', {
        title: "Schedule",
        path: "schedule",
        context,
        scheduleDate
    })
}


const getMovieSchedule = async (req, res) => {
    const id = req.query['id']
    let movieData
    let scheduleDateList = []
    try {
        const scheduleDateListRaw = dateProcess(await getScheduleByMovie(id))
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
            console.log(tmp)
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

        console.log(scheduleDateList)
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


module.exports = {
    getScheduleList,
    getMovieSchedule
}