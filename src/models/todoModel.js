const mongoose = require("mongoose")

const todoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true    //başı veya sonundaki gereksiz boşlukları silip kaydeder.
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false,
    }
}, { collection: "Todo", timestamps: true }) //burdaki sayesinde "Todo" adlı collection açtık.

const todo = mongoose.model("Todo", todoSchema)

module.exports = todo     //diğer sayfalardan bu şemaya(model) erişebiliriz.