const express = require("express");

const router = express.Router();

const ProductController = require("../controllers/ProductController");
const { isAuthenticated } = require("../middlewares/authMiddleware");

router.get("/list", isAuthenticated, ProductController.list);

router.get("/create", isAuthenticated, ProductController.showCreateForm);
router.post("/create", isAuthenticated, ProductController.create);

router.get("/edit/:id", isAuthenticated, ProductController.showEditForm);
router.post("/edit/:id", isAuthenticated, ProductController.edit);

router.get("/delete/:id", isAuthenticated, ProductController.hapus);

module.exports = router;