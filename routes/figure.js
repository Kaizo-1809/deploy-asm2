var express = require("express");
const FigureModel = require("../models/FigureModel");
var router = express.Router();

router.get("/", async (req, res) => {
  var figure = await FigureModel.find();
  res.render("toy/figure/index", { figure: figure });
});

router.get("/delete/:id", async (req, res) => {
  var id = req.params.id;
  await FigureModel.findByIdAndDelete(id)
    .then(() => console.log("Delete successfully"))
    .catch((error) => console.log("Delete failed"));
  res.redirect("/toy/figure");
});

router.get("/deleteall", async (req, res) => {
  await FigureModel.deleteMany()
    .then(() => console.log("Delete successfully"))
    .catch((error) => console.log("Delete failed"));
  res.redirect("/toy/figure");
});

router.get("/edit/:id", async (req, res) => {
  var id = req.params.id;
  var figure = await FigureModel.findById(id);
  res.render("toy/figure/edit", { figure: figure });
});

router.post("/edit/:id", async (req, res) => {
  var id = req.params.id;
  var updatedfigure = req.body;

  var originalfigure = await FigureModel.findById(id);

  Object.keys(updatedfigure).forEach((key) => {
      if (updatedfigure[key] !== "" && updatedfigure[key] !== undefined) {
        originalfigure[key] = updatedfigure[key];
      }
  });
  await originalfigure.save();
  res.redirect("/toy/figure");
});

router.get("/add", (req, res) => {
  res.render("toy/figure/add");
});

router.post("/add", async (req, res) => {
  var figure = req.body;

  await FigureModel.create(figure);
  res.redirect("/toy/figure");
});

router.get("/detail/:id", async (req, res) => {
  var id = req.params.id;
  var figure = await FigureModel.findById(id);
  
  res.render("toy/figure/detail", { figure: figure });
  
});
module.exports = router;