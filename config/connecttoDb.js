//load env var
if(process.env.NODE_ENV!="production"){
    require("dotenv").config();
}   
const mongoose=require("mongoose");

async function connecttoDb(){
    // console.log("connected");
    try{
        console.log("connected");
        await mongoose.connect(process.env.DB_URL);
    }
    catch(err){console.log(err);}
}
module.exports =connecttoDb;