const mongoose = require("mongoose");
const validator = require("validator")

const messageScema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            minlength:3,
            maxlength:30,
    
        },
       city:{
            type:String,
            required:true,

             
    
        },
        email:{
            type:String,
            required:true,
 validate(v){
               if(!validator.isEmail(v)){
                   throw new Error("email is invalid")
               } 
            }
    
        },
        phone:{
            type:Number,
            required:true,
            minlength:10,
            
        
        
    
        },
        message:{
            type:String,
            required:true,


        },
        date:{
            type:Date,
            default:Date.now
        }

    }
)
 
const Message = new mongoose.model("Message",messageScema);

module.exports = Message;