const express = require("express");
const path = require("path");
const hbs = require("hbs")
const app = express();
const Message = require("./models/schema");
const validator = require("validator");
const regSchema = require("./validations/regValidations");
 const {joiErrorHandler,mongooseErrorHandler} = require("./validations/errorhandler");
  
require("./db/conn")
const port = process.env.PORT || 8000;
// parsing
app.use(express.json())
 app.use(express.urlencoded({extended:false}))
//static page;
const staticPath = path.join(__dirname,"../public");
const templatePath = path.join(__dirname,"../views");
const chanagedPath = path.join(__dirname,"../templates/views");
const partialsPath = path.join(__dirname,"../templates/partials");

app.use('/css',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")));
app.use('/js',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")));
app.use('/jq',express.static(path.join(__dirname,"../node_modules/jquery/dist")));
 app.use(express.static(staticPath));
 
//dynamic page

app.set("view engine","hbs");
app.set("views",chanagedPath);
hbs.registerPartials(partialsPath)
// error
 

  app.get("/",(req,res)=>{
   res.render("index")});

  
   app.get("/contact",(req,res)=>{
    res.render("contact")
    
  });
 
      
   app.get("*",(req,res)=>{
    res.render("pagenotFound")
   });
 
  
      
      app.post("/contact" ,async(req,res)=>{
        try{
         
          const validateReg = regSchema.validate(req.body,{abortEarly:false});
          if(validateReg.error){
            console.log(validateReg.error)
       return res.render("contact",
       {message:{
      type:'error',
    body:'validation Errors'},
  errors:joiErrorHandler(validateReg.error),
FormData:req.body}
)}



 
  const saveMessage = new Message({
  name :req.body.name,
  city :req.body.city,
  email :req.body.email,
  phone:req.body.phone,
  message:req.body.message
});
console.log(saveMessage)
 
await saveMessage.save();
res.status(201).render("thanku",{message:{
 type:'success',
body:"Registration Successful."},
errors:{},
FormData:req.body})}


  catch(e){
 
        
        return res.status(400).render('index',{message:{
            type:'error',
           body:'Invalid Information'},
           errors:mongooseErrorHandler(e),
           FormData:req.body}
           )
        }
      });

       







   //listening to port
    app.listen(port,()=>{
        console.log(`listening :${port}`)
      })