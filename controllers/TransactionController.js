const Transaction = require("../models/Transaction");

function index(req, res) {
    const transactions = Transaction.getAllTransaction();

    res.render("pages/transactions/index", {
        title: "Transaksi",
        transactions
    });
}

function create(req, res) {
    res.render("pages/transactions/create", {
        title: "Transaksi Baru"
    });
}

module.exports = {
    index,
    create
};