const express = require("express");
const router = express.Router();

const ProductController = require("../controllers/ProductController");

router.get("/", ProductController.index);

router.get("/create", ProductController.create);

router.post("/store", ProductController.store);

router.get("/edit/:id", ProductController.edit);

router.post("/update/:id", ProductController.update);

router.get("/delete/:id", ProductController.destroy);

module.exports = router;