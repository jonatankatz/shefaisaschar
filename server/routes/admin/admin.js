const express = require('express')
const router = express.Router()




router.get("/check",async(req,res)=>{
    try {
    res.send("admin authorized")
    }
    catch{
        return res.json({ messageTitle: " Logged in failed!", messageText: "not authorized", redirect: false }).status(400)
    }
})


module.exports = router;
