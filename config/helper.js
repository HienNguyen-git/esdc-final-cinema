var days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];



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

const getDays = (date) => {
    const isoDateTime = new Date(date)
    return days[isoDateTime.getDay()]
}

const getMonths = (date)=>{
    const isoDateTime = new Date(date)
    return months[isoDateTime.getMonth()]
}

const getDates = (date)=>{
    const isoDateTime = new Date(date)
    return isoDateTime.getDate()
}

const getYears = (date)=>{
    const isoDateTime = new Date(date)
    return isoDateTime.getFullYear()
}


module.exports = {
    formatDate,
    reverseDate,
    dataProcess,
    sleep,
    convertNumToLetter,
    getDays,
    getMonths,
    getDates,
    getYears
}