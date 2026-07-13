const express = require("express");

const router = express.Router();

const CategoryController = require("../controllers/CategoryController");

const {
    isAuthenticated
} = require("../middlewares/authMiddleware");

// ==================== LIST ====================

router.get(
    "/list",
    isAuthenticated,
    CategoryController.list
);

// ==================== CREATE ====================

router.get(
    "/create",
    isAuthenticated,
    CategoryController.showCreateForm
);

router.post(
    "/create",
    isAuthenticated,
    CategoryController.create
);

// ==================== EDIT ====================

router.get(
    "/edit/:id",
    isAuthenticated,
    CategoryController.showEditForm
);

router.post(
    "/edit/:id",
    isAuthenticated,
    CategoryController.edit
);

// ==================== DELETE ====================

router.get(
    "/delete/:id",
    isAuthenticated,
    CategoryController.hapus
);

module.exports = router;