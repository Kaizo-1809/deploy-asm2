var express = require('express');
const LegoModel = require('../models/LegoModel');
const DcModel = require('../models/DcModel');
const FigureModel = require('../models/FigureModel');
var router = express.Router();

router.get("/", async (req, res) => {
  var lego = await LegoModel.find();
  var dc = await DcModel.find();
  var figure = await FigureModel.find();
  res.render('index', { lego:lego, dc:dc, figure:figure });
});

router.post('/search', async (req, res) => {
  var keyword = req.body.keyword;

  try {
    var lego = await LegoModel.find({
      $or: [
        { brandName: new RegExp(keyword, 'i') },
        { modelName: new RegExp(keyword, 'i') }
      ]
    });

    var dc = await DcModel.find({
      $or: [
        { brandName: new RegExp(keyword, 'i') },
        { modelName: new RegExp(keyword, 'i') }
      ]
    });

    var figure = await FigureModel.find({
      $or: [
        { brandName: new RegExp(keyword, 'i') },
        { modelName: new RegExp(keyword, 'i') }
      ]
    });

    res.render('index', { lego:lego, dc:dc, figure:figure }); 
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
