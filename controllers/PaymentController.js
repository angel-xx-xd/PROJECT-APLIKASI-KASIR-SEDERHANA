const Payment = require("../models/Payment");

function index(req, res) {
    res.render("pages/payments/index", {
        title: "Pembayaran"
    });
}

module.exports = {
    index
};