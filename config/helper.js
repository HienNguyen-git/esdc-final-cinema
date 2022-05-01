
const formatDate = (date) => {
    const isoDateTime = new Date(date)
    const myDay = +isoDateTime.getDate() < 10 ? "0" + isoDateTime.getDate() : isoDateTime.getDate()
    const getMonthValue = +isoDateTime.getMonth()
    const month = getMonthValue + 1 < 10 ? "0" + (getMonthValue + 1) : (getMonthValue + 1)

    return myDay + "-" + month + "-" + isoDateTime.getFullYear()
}

const reverseDate = (date) => date.split("-").reverse().join("-")

const dataProcess = (data) => Object.values(JSON.parse(JSON.stringify(data)))

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

const convertNumToLetter = (n) => (n + 10).toString(36).toUpperCase()


module.exports = {
    formatDate,
    reverseDate,
    dataProcess,
    sleep,
    convertNumToLetter
}