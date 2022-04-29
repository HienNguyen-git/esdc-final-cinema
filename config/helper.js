
const formatDate = (date) => {
    const isoDateTime = new Date(date)
    const myDay = isoDateTime.getDate() < 10 ? "0" + isoDateTime.getDate() : isoDateTime.getDate()
    const month = isoDateTime.getMonth() < 10 ? "0" + isoDateTime.getMonth() : isoDateTime.getMonth()

    return myDay + "-" + month + "-" + isoDateTime.getFullYear()
}

const reverseDate = (date) => {
    return date.split("-").reverse().join("-")
}

module.exports = {
    formatDate,
    reverseDate
}