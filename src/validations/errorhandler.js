const joiErrorHandler = (error)=>{
    const errorObj = {};
    const details = error.details;
details.map(d=>{
   errorObj[ d.path] =[d.message]
} )
  return errorObj
};

const mongooseErrorHandler = (error)=>{
  const errorObj ={};
  const details = error.errors;
  for (const key in details) {
    errorObj[key]=[details[key].message]
  }
  return errorObj;
}
module.exports ={joiErrorHandler,mongooseErrorHandler}
