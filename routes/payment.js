const express = require("express");

const router = express.Router();

const PaymentController = require("../controllers/PaymentController");

const {

    isAuthenticated

} = require("../middlewares/authMiddleware");

router.get(
    "/list",
    isAuthenticated,
    PaymentController.list
);

router.get(
    "/create",
    isAuthenticated,
    PaymentController.showCreateForm
);

router.post(
    "/create",
    isAuthenticated,
    PaymentController.create
);

module.exports = router;