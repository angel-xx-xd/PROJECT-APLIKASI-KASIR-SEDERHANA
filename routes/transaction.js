const express = require("express");
const router = express.Router();

const TransactionController = require("../controllers/TransactionController");

router.get("/", TransactionController.index);

router.get("/create", TransactionController.create);

module.exports = router;