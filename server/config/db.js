const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = async() => {
    try{
        mongoose.set('strictQuery',false);
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`database connected: ${conn.connection.host}`);
    }catch(error){
        console.log(error);
    }  
}
module.exports = connectDB;




