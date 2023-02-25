const User = require("../models/userModel")


const register = (req, res) => {
    var email = req.body.email
    var password = req.body.password

    var newuser = new User()
    newuser.email = email
    newuser.password = password
    newuser.save((err, savedUser) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Kullanıcı Oluşturulamadı" + err
            })
        }
        return res.status(200).json({
            success: true,
            message: "Kullanıcı Oluşturuldu",
            data: newuser
        })
    })
}

const login = (req, res) => {
    var email = req.body.email
    var password = req.body.password

    User.findOne({ email: email }, (err, user) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Giriş bşarısız" + err
            })
        }
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Your sign up failed !"
            })
        }

        user.comparePassword(password, (err, isMatch) => {
            if (isMatch && isMatch == true) {
                req.session.user = user
                return res.status(200).json({
                    success: true,
                    message: "Succesfully Logged In.",
                    data: user
                })
            } else {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized"
                })
            }
        })
    })
}
const dashboard = (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({
            success: false,
            message: "Unauthenticated"
        })
    }
    return res.status(200).json({
        success: true,
        message: "Welcome to TODO API"
    })
}
const logout = (req, res) => {
    req.session.destroy()
    return res.status(200).json({
        success: true,
        message: "Succesfully Logged Out."
    })
}
module.exports = {
    register,
    login,
    dashboard,
    logout
}