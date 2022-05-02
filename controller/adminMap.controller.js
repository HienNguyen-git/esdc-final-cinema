const { sleep } = require("../config/helper")
const { handleGetMapList } = require("../models/adminMap.model")



const getMapList = async (req,res)=>{
    let mapList =[]
    try {
        const mapListRaw = await handleGetMapList()
        mapList = mapListRaw.map(e=>({
            id: e.id,
            numrow: e.numrow,
            numcolumn: e.numcolumn
        }))


    } catch (error) {
        console.error(error.message)
    }
    sleep(100)
    res.render('admin/map', { title: 'Blueprint',path: "not-header",isAdmin: true,layout:'admin' ,routerPath: 'admin/maps', mapList});
}


module.exports = {
    getMapList
}