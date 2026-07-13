const express = require("express");

const router = express.Router();

const TransactionController = require("../controllers/TransactionController");
const { isAuthenticated } = require("../middlewares/authMiddleware");

router.get(
    "/list",
    isAuthenticated,
    TransactionController.list
);

router.get(
    "/create",
    isAuthenticated,
    TransactionController.showCreateForm
);

router.post(
    "/create",
    isAuthenticated,
    TransactionController.create
);

router.get(
    "/detail/:id",
    isAuthenticated,
    TransactionController.detail
);

module.exports = router;