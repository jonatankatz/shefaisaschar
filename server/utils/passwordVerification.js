const bcrypt = require("bcryptjs")

async function passwordVerification(password, exPassword) {
    try {
        console.log("comparing ",password,exPassword)
        const compare = await bcrypt.compare(password, exPassword)
        if (compare) {
            return true
        } else {
          return false
        }
    }
    catch (err) {
        console.log(err.message)
        return false
    }
}


module.exports = passwordVerification