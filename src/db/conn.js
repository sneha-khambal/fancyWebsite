const mongoose = require("mongoose");

//connection to db;
mongoose.connect(process.env.MONGODB_URI || " mongodb://localhost:27017/dynamicpage ",)
 
.then(
    ()=>{
            console.log("connection sucessfull")}
).catch(
    (e)=>{
        console.log(`connection error :${e}`)

    }

)