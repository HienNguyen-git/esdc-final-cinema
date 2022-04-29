const { formatDate, reverseDate } = require("../config/helper")
const { getALlMovieID, getMovieDetailById } = require("../models/movie.model")
const { getScheduleByDate, getScheduleDateList } = require("../models/schedule.model")


const getScheduleList = async (req, res) => {
    // const date = "2022-05-18";
    let date = req.query['date']
    let context = []
    let scheduleDate
    scheduleDate = Object.values(JSON.parse(JSON.stringify(await getScheduleDateList()))).map(e => formatDate(e.day))
    if(date===""){
        date = reverseDate(scheduleDate[0])
    }
    console.log(date)
    try {
        const movieIdList = await getALlMovieID()
        const data = await getScheduleByDate(date)
        const scheduleValue = Object.values(JSON.parse(JSON.stringify(data)))
        Object.values(JSON.parse(JSON.stringify(movieIdList))).forEach(async i => {
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
                console.log(tmp)
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

module.exports = {
    getScheduleList
}