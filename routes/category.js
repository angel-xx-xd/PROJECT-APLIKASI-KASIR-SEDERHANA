const express = require("express");

const router = express.Router();

const CategoryController = require("../controllers/CategoryController");
const { isAuthenticated } = require("../middlewares/authMiddleware");

router.get("/list", isAuthenticated, CategoryController.list);

router.get("/create", isAuthenticated, CategoryController.showCreateForm);
router.post("/create", isAuthenticated, CategoryController.create);

router.get("/edit/:id", isAuthenticated, CategoryController.showEditForm);
router.post("/edit/:id", isAuthenticated, CategoryController.edit);

router.get("/delete/:id", isAuthenticated, CategoryController.hapus);

module.exports = router;