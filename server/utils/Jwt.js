const jwt = require("jsonwebtoken");



function getJwt(p,privateKey,options) {
    return new Promise((resolve, reject) => {
        jwt.sign(p, privateKey, options, (err, token) => {
            console.log(err)
            if (err) reject("error")
            resolve(token)
        })
    })
}

module.exports = getJwt