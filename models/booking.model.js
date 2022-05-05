const connect = require("../database/db")

const getRoomMapByID = async (id) => new Promise((resolve, reject) => {
    connect.query("Select * from map where id=?", [id], (err, result) => {
        if (err) reject(err.message)
        resolve(result[0])
    })
})

const getQuantitySeatOfRoom = async(id)=> new Promise((resolve,reject)=>{
    connect.query("SELECT numrow,numcolumn FROM map, room where room.idmap=map.id and room.idphongchieu=?", [id], (err, result) => {
        if (err) reject(err.message)
        resolve(result[0])
    })
})

const getListQuantitySeatOfRoom = async(id)=> new Promise((resolve,reject)=>{
    connect.query("SELECT * FROM map, room where room.idmap=map.id", (err, result) => {
        if (err) reject(err.message)
        resolve(result)
    })
})

const getRoomByID = async (id) => new Promise((resolve, reject) => {
    connect.query("Select * from room where idphongchieu=?", [id], (err, result) => {
        if (err) reject(err.message)
        resolve(result[0])
    })
})


const postBillDetail = async detail => new Promise((resolve, reject) => {
    // let tmp = ""
    // detail.forEach(e => {
    //    tmp+="(?,?,?)"
    // });
    // console.log(detail)
    connect.query("Insert into billdetail(idsp,quantity,idve) values ?", [detail], (err, result) => {
        if (err) {
            
            console.error(err.message)
            reject(false)
        }
        resolve(true)
    })
})

// INSERT INTO `ticket`(`idve`, `price`, `seat`, `idsuatchieu`, `idkh`) VALUES ('[value-1]','[value-2]','[value-3]','[value-4]','[value-5]')
const postBookTicket = async (seat, idsuatchieu, price, idkh) => new Promise((resolve, reject) => {
    connect.query("Insert into ticket(price, seat, idsuatchieu, idkh) value(?,?,?,?)", [price, seat, idsuatchieu, idkh], (err, result) => {
        if (err) {
            
            console.error(err.message)
            reject(false)
        }
        // console.log(result)
        resolve(result.insertId)
    })
})

const getTicketPrice = async () => new Promise((resolve, reject) => {
    connect.query("Select * from priceticket", (err, result) => {
        if (err) reject(err.message)
        resolve(result[0])
    })
})

const getCustomerPoint = async (id) => new Promise((resolve, reject) => {
    connect.query("Select points from customer where idkh=?", [id], (err, result) => {
        if (err) reject(err.message)
        resolve(result[0])
    })
})

const handleCustomerPoint = async (id, point, option = true) => new Promise(async (resolve, reject) => {
    /// option value
    // true: accumulate
    // false: diminish
    try {
        let currPoint = await getCustomerPoint(id)
        const newPoint = option ? currPoint.points + point : currPoint.points - point
        connect.query("update customer set points = ? where idkh=?", [newPoint, id], (err, result) => {
            if (err) reject(false)
            resolve(true)
        })
    } catch (error) {
        reject(error.message)
    }

})


const getScheduleSeatMapByID = async (id) => new Promise((resolve, reject) => {
    connect.query("Select seatmap from showtime where idsuatchieu=?", [id], (err, result) => {
        if (err) reject(err.message)
        resolve(result[0])
    })
})

const updateScheduleSeatMap = async (id, seatMap) => new Promise((resolve, reject) => {
    connect.query("update showtime set seatmap=? where idsuatchieu=?", [seatMap, id], (err) => {
        if (err) reject(err)
        resolve(true)
    })
})

module.exports = {
    getRoomMapByID,
    getRoomByID,
    postBookTicket,
    getTicketPrice,
    getCustomerPoint,
    handleCustomerPoint,
    getScheduleSeatMapByID,
    updateScheduleSeatMap,
    postBillDetail,
    getQuantitySeatOfRoom,
    getListQuantitySeatOfRoom
}