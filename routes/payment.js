const express = require("express");
const router = express.Router();

const PaymentController = require("../controllers/PaymentController");

router.get("/", PaymentController.index);

module.exports = router;