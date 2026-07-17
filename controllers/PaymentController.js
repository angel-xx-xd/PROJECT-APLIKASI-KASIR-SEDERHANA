const Payment = require("../models/Payment");

// ==================== LIST ====================

function list(req, res) {

    const payments = Payment.ambilSemuaPembayaran();

    res.render("pages/payments/list", {
        title: "Data Pembayaran",
        payments
    });

}

// ==================== FORM ====================

function showCreateForm(req, res) {

    const transaksi = Payment.ambilTransaksiBelumDibayar();

    res.render("pages/payments/create", {
        title: "Pembayaran",
        transaksi,
        pesanError: []
    });

}

// ==================== SIMPAN ====================

function create(req, res) {

    const {
        transaction_id,
        metode_pembayaran,
        jumlah_bayar
    } = req.body;

    const pesanError = [];

    const transaksi = Payment.ambilTransaksiById(transaction_id);

    if (!transaksi) {
        pesanError.push("Transaksi tidak ditemukan");
    }

    if (
        transaksi &&
        (!jumlah_bayar || Number(jumlah_bayar) < Number(transaksi.total))
    ) {
        pesanError.push("Uang pembayaran kurang");
    }

    if (pesanError.length > 0) {

        return res.render("pages/payments/create", {
            title: "Pembayaran",
            transaksi: Payment.ambilTransaksiBelumDibayar(),
            pesanError
        });

    }

    const kembalian =
        Number(jumlah_bayar) - Number(transaksi.total);

    Payment.tambahPembayaran(
        transaction_id,
        metode_pembayaran,
        jumlah_bayar,
        kembalian
    );

    res.redirect("/pembayaran/list");

}

module.exports = {
    list,
    showCreateForm,
    create
};