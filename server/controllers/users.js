const userModel = require("../schemas/users")

async function register(user) {
    console.log(user)
    const newUser = new userModel({ ...user })
    try {
        const result = await newUser.save()
        return result
    }
    catch (err) {
        return console.log(err.message)

    }
}
async function checkEmail(email) {
    try {
        const user = await userModel.find({ email })
        console.log(user)
        return user
    }
    catch (err) {
        return console.log(err.message)
    }
}


async function idExist(id) {
    try {
        const user = await userModel.find({ id })
        console.log(user)
        return user
    }
    catch (err) {
        return console.log(err.message)
    }
}








module.exports = {
    register,checkEmail,idExist
}