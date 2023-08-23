const mongoose = require('mongoose')

var DcSchema = mongoose.Schema({
    brandName: String,
    modelName: String,
    description: String,
    price: Number,
    image: String,
    quantity : Number
})

const DcModel = mongoose.model("dc", DcSchema, "dc")

module.exports = DcModel