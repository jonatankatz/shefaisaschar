const express = require('express')
const router = express.Router()
const moment = require("moment")
const bcrypt = require('bcryptjs'); 
const Joi = require("@hapi/joi")
const jwtExpTime = "1h"
const fs = require("fs")
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const israelIdRegex = /^[0-9]{9}$/
const keyLogger = require("../../utils/keyLog");

const {checkEmail,register,idExist} =  require("../../controllers/users")
const israeliIdVerification = require("../../utils/israeliIdVerification")
const getJwt = require("../../utils/Jwt")
const passwordVerification = require("../../utils/passwordVerification")

const privateKey = fs.readFileSync('private.key','utf8');
console.log(privateKey)
var i  = 'jonas sites';          
var s  = 'jonatankatz4@gmail.com';         
var a  = 'http://shefaisaschar.co.il';

const jwtOptions = {
    issuer:  i,
 subject:  s,
 audience:  a,
expiresIn:jwtExpTime,
algorithm:  "RS256"

}



// you can add issuer subject and audience to the options 
//it will look like this{issuer:"jonas sites", sub:"jonatan@jonassites.com aud:"domain of my site"}





const userRegSchema = Joi.object({
    id: Joi.string().pattern(israelIdRegex).required(),
    email: Joi.string().pattern(emailRegex).required(),
    password: Joi.string().min(6).max(16).required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    city:Joi.string().required(),
    street:Joi.string().required(),
    role: Joi.string().required()
})

const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegex).required(),
    password: Joi.string().min(6).max(16).required()
})

router.use("/register",(req,res,next)=>{
    console.log("trying to register")
    req.body.role="user"
    const {id} = req.body
     const {error}  = userRegSchema.validate(req.body) 
    if (error) return res.json({ messageTitle: "Registration Failed !", messageText: "please enter valid user params for registration", redirect: false }).status(400)
    const verifyId = israeliIdVerification(id)
    console.log(verifyId,"id verification")
    if(!verifyId)  return   res.json({ messageTitle: "Registration Failed !", messageText: "please enter a valid israeli id ", redirect: false }).status(400)
    next()
 })

 router.use("/login", (req, res, next) => {
    const { error } = loginSchema.validate(req.body)
    if (error) return res.json({ messageTitle: " Logged in failed!", messageText: "User or password is incorrect", redirect: false }).status(400)
    next()
})


 router.post("/register",async(req,res)=>{
     console.log("registering..")
    try{
        const {id,email,password,firstName,lastName,city,street,role} = req.body
        const user = await checkEmail(email)
        console.log(user)
        if (user.length) return res.json({ messageTitle: "Registration Failed !", messageText:`user with email or id  is already exist `,redirect:false})
        const checkingId = await idExist(id)
        console.log(checkingId)
        if (checkingId.length) return res.json({ messageTitle: "Registration Failed !", messageText:`user with email or id  is already exist `,redirect:false})
        const salt = bcrypt.genSaltSync(10)
        const encryptPassword = bcrypt.hashSync(password, salt)
         const result = await register({ id,email,password:encryptPassword, salt,role,firstName,lastName,address:{city,street}})
         console.log(result)
        if (!result) return res.json({messageTitle: "Registration Failed !", messageText: "", redirect: false}).status(400)
        return res.status(201).json({ messageTitle:"Registration success !", messageText:`hello ${firstName} ${lastName} your user ${email} `,redirect:true})
} catch (ex) {
        if (ex) return res.json({messageTitle: "Registration Failed !", messageText: "", redirect: false}).status(400)
}
})

router.post("/login",async(req,res)=>{
    try{
        console.log("..login in")
    const {email,password} = req.body
    const checkingUser = await checkEmail(email)
    const validUser = checkingUser[0]
    if (!validUser) return res.json({ messageTitle: " Logged in failed!", messageText: "User or password is incorrect", redirect: false }).status(400)
    const encryptedPs = validUser.password
    const psVerification = await passwordVerification(password,encryptedPs)
    if (!psVerification) return res.json({ messageTitle: " Logged in failed!", messageText: "User or password is incorrect", redirect: false }).status(400)
    const userEmail = validUser.email
    const userFname = validUser.firstName
    const userLname = validUser.lastName
    const role = validUser.role
    const payload = {userEmail,userFname,userLname,role}
    const token = await getJwt(payload,privateKey,jwtOptions)
    console.log(token)
    if (role === "admin") return res.status(201).json({ messageTitle: "You have logged in successfully!", messageText:`welcome admin `,redirect:true,admin:true, apiKey:token,userId:validUser._id,userName:validUser.firstName}).status(200)
    keyLogger.info(`userName: ${email}, key:${JSON.stringify(token)} ,Date :${moment().format("MMMM Do YYYY, h:mm:ss a")}`)
    return res.status(201).json({ messageTitle: "You have logged in successfully!", messageText: `Welcome ${validUser.firstName} ${validUser.lastName}  `, redirect: true, admin: false, apiKey: token, userId: validUser._id, userName: validUser.first_name}).status(200)
} catch (ex) {
        if (ex) return res.json({ messageTitle: " Logged in failed!", messageText: "Server error", redirect: false }).status(400)
}
})









module.exports = router;
