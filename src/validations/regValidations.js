const Joi = require('joi');

const regSchema = Joi.object({
    name: Joi.string()
        .trim()    
         
         .min(3)
        .max(30)
        .required(),

       city: Joi.string()
        .trim()    
        .min(3)
        .max(30)
        .required(),

        phone: Joi.number()
        .integer()
        .min(10)
        
   
        .required(),

        message: Joi.string()
        .max(100)
        .required(),
      
        email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net','in'] } })
})
    .with('email', 'message')
  

 
 module.exports = regSchema;