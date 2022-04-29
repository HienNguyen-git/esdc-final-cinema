
const formatDate = (date) => {
    const isoDateTime = new Date(date)
    const myDay = +isoDateTime.getDate() < 10 ? "0" + isoDateTime.getDate() : isoDateTime.getDate()
    const getMonthValue = +isoDateTime.getMonth()
    const month = getMonthValue + 1 < 10 ? "0" + (getMonthValue + 1) : (getMonthValue + 1)

    return myDay + "-" + month + "-" + isoDateTime.getFullYear()
}

const reverseDate = (date) => {
    return date.split("-").reverse().join("-")
}

module.exports = {
    formatDate,
    reverseDate
}