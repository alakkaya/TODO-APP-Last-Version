const todo = require("../models/todoModel")




const todoAdd = async (req, res) => {
    try {
        const _todo = await todo.findOne({ name: req.body.name })
        if (_todo) {
            return res.status(400).json({
                success: false,
                message: "Can't created because there are already exists same name data."
            })
        }

        const todoAdd = new todo(req.body)          //new todo:dahil ettiğimiz todo şeması

        await todoAdd.save() //veritabanına kaydet
            .then(() => {
                return res.status(201).json(todoAdd)
            })
            .catch((err) => {
                return res.status(400).json({
                    success: false,
                    message: "Kayıt oluşturulurken hata çıktı." + err
                })
            })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Kayıt oluşturulamadı !"
        })
    }
}

const todoGetAll = async (req, res) => { //her zaman tüm data'yı çekmek sıkıntı çıkarır.
    const { page } = req.query
    const limit = 2 //2-2 verileri çekecek
    const skip = Number(page - 1) * limit    //doğru şekilde kaldığı yeri bulabilecek
    try {
        const todoGetAll = await todo.find({}).limit(limit).skip(skip) //boş obje ile tüm kayıtşarı çekmesini istedik
        return res.status(200).json({
            success: true,
            data: todoGetAll
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Kayıt getirilemedi !"
        })
    }
}

const todoUpdate = async (req, res) => {
    const { id } = req.params
    try {
        const todoUpdate = await todo.findByIdAndUpdate(id, req.body)
        if (todoUpdate) {
            return res.status(200).json({
                success: true,
                message: "Güncelleme Başarılı"
            })
        }
        else return res.status(400).json({
            success: false,
            message: "Kayıt güncellenemedi !"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Kayıt Güncellenemedi"
        })
    }

}

const todoDelete = async (req, res) => {
    const { id } = req.params //=req.params.id ile aynısı    
    try {
        const todoDelete = await todo.findByIdAndDelete(id)
        if (todoDelete) {
            return res.status(200).json({
                success: true,
                message: "Kayıt silinmiştir."
            })
        }
        else {
            return res.status(400).json({
                success: false,
                message: "Kayıt silinemedi."
            })
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Kayıt silinemedi"
        })
    }
}

const todoGet = async (req, res) => {
    const { id } = req.params

    const todoGet = await todo.findById(id)

    if (todoGet) {
        return res.status(200).json(todoGet)
    } else {
        return res.status(404).json({
            success: false,
            message: "Kayıt bulunamadı .!"
        })
    }
}


module.exports = {
    todoAdd,
    todoGetAll,
    todoUpdate,
    todoDelete,
    todoGet
}