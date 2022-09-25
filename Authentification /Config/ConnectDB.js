const res = require('express/lib/response')
const mongoose = require('mongoose')

const ConnectDB =async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('DB is connected')
    } catch (error) {
        console.log("DB is not connected")
    }
}
module.exports = ConnectDB