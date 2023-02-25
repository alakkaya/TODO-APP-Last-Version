const mongoose = require("mongoose");
const bcrypt = require("bcrypt"),
    SALT_WORK_FACTOR = 10;


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
}, { collection: "myuser", timestamps: true })

userSchema.pre("save", function (next) {
    var user = this
    //only hash the password if it modified or is new
    if (!user.isModified("password")) return next();

    //generate salt
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) return next(err)

        //hash the password using our new salt
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err)

            //override the cleartext password with the hashed one
            user.password = hash;
            next();
        })
    })
})


userSchema.methods.comparePassword = function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) return callback(err);
        callback(undefined, isMatch);
    })
}

const User = mongoose.model("myuser", userSchema)
module.exports = User;