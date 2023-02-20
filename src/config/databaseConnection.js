const mongoose = require("mongoose")
mongoose.set('strictQuery', true);

mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

    .then(() => {
        console.log("Veritabanına başarı ile bağlandı.");
    })
    .catch((err) => {
        console.log("Veritabanına bağlanılamadı:" + err);
    })