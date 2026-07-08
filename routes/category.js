const express = require("express");
const router = express.Router();

const CategoryController = require("../controllers/CategoryController");

router.get("/", CategoryController.index);

router.get("/create", CategoryController.create);

router.post("/store", CategoryController.store);

router.get("/edit/:id", CategoryController.edit);

router.post("/update/:id", CategoryController.update);

router.get("/delete/:id", CategoryController.destroy);

module.exports = router;