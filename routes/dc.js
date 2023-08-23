var express = require("express");
const DcModel = require("../models/DcModel");
var router = express.Router();

router.get("/", async (req, res) => {
  var dc = await DcModel.find();
  res.render("toy/dc/index", { dc: dc });
});

router.get("/delete/:id", async (req, res) => {
  var id = req.params.id;
  await DcModel.findByIdAndDelete(id)
    .then(() => console.log("Delete successfully"))
    .catch((error) => console.log("Delete failed"));
  res.redirect("/toy/dc");
});

router.get("/deleteall", async (req, res) => {
  await DcModel.deleteMany()
    .then(() => console.log("Delete successfully"))
    .catch((error) => console.log("Delete failed"));
  res.redirect("/toy/dc");
});

router.get("/edit/:id", async (req, res) => {
  var id = req.params.id;
  var dc = await DcModel.findById(id);
  res.render("toy/dc/edit", { dc: dc });
});

router.post("/edit/:id", async (req, res) => {
  var id = req.params.id;
  var updateddc = req.body;

  var originaldc = await DcModel.findById(id);

  Object.keys(updateddc).forEach((key) => {
      if (updateddc[key] !== "" && updateddc[key] !== undefined) {
        originaldc[key] = updateddc[key];
      }
  });
  await originaldc.save();
  res.redirect("/toy/dc");
});

router.get("/add", (req, res) => {
  res.render("toy/dc/add");
});

router.post("/add", async (req, res) => {
  var dc = req.body;

  await DcModel.create(dc);
  res.redirect("/toy/dc");
});

router.get("/detail/:id", async (req, res) => {
  var id = req.params.id;
  var dc = await DcModel.findById(id);
  
  res.render("toy/dc/detail", { dc: dc });
  
});
module.exports = router;