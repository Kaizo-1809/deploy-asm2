const mongoose = require('mongoose')

var FigureSchema = mongoose.Schema({
    brandName: String,
    modelName: String,
    description: String,
    price: Number,
    image: String,
    quantity : Number
})

const FigureModel = mongoose.model("figure", FigureSchema, "figure")

module.exports = FigureModel