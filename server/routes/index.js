const express = require('express')
const app = express()
const authRouter = require("./auth/auth");
const adminRouter = require("./admin/admin");
const addressRouter = require("./address/adress")
const moment = require("moment")
const bodyParser = require("body-parser")
const jwt = require("jsonwebtoken");
const fs = require("fs")
const publicKey = fs.readFileSync('public.key','utf8');
const logger = require("../utils/logger")
const jwtExpTime = "1h"
  const i  = 'jonas sites';          
    const s  = 'jonatankatz4@gmail.com';         
    const a  = 'http://shefaisaschar.co.il';

const jwtOptions = {
    issuer:  i,
 subject:  s,
 audience:  a,
    expiresIn:jwtExpTime,
     algorithms:  ["RS256"]
}

app.use(bodyParser.json())


app.use((req,res,next)=>{
    let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    logger.info(`Date: [${moment().format('DD-MM-YYYY, h:mm:ss a')}] - Path : [${fullUrl}] - From Ip [ ${req.ip}]`)
    next()
})


app.get("/hc",(req,res)=>{
    res.send("ok")
})

app.use("/address", addressRouter)
app.use("/auth",authRouter)


app.use((req, res, next) => {
    const {authorization} = req.headers
    console.log(authorization)
    var legit = jwt.verify(authorization, publicKey, jwtOptions);
  if (!legit) return res.status(401).json({error:"Please Login" ,redirect:true})
      next()
})


app.get("/authcheck",(req,res)=>{
    res.send("authorized")
})

app.use((req,res,next)=>{
    const {authorization} = req.headers
    const decoded = jwt.decode(authorization)
    const admin =  decoded.role === "admin" ? true : false
    if(!admin) return res.status(403).json({message:"not Authorized"})
    next()
})

app.use("/admin",adminRouter)



module.exports = app;


/*


app.use("/psUpdate",passwordUpdateRouter)
app.use("/admin",adminRouter)  */