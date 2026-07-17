const Transaction = require("../models/Transaction");

// ==================== LIST ====================

function list(req, res) {

    const transactions = Transaction.ambilSemuaTransaksi();

    res.render("pages/transactions/list", {
        title: "Data Transaksi",
        transactions
    });

}

// ==================== FORM TRANSAKSI ====================

function showCreateForm(req, res) {

    const products = Transaction.ambilSemuaProduk();

    res.render("pages/transactions/create", {
        title: "Transaksi Baru",
        products,
        pesanError: [],
        formData: {}
    });

}

// ==================== SIMPAN TRANSAKSI ====================

function create(req, res) {

    let { product_id, qty } = req.body;

    const pesanError = [];

    if (!product_id) {
        product_id = [];
    }

    if (!Array.isArray(product_id)) {
        product_id = [product_id];
    }

    if (!Array.isArray(qty)) {
        qty = [qty];
    }

    let total = 0;
    const detail = [];

    for (let i = 0; i < product_id.length; i++) {

        const produk = Transaction.ambilProdukById(product_id[i]);

        if (!produk) {
            continue;
        }

        const jumlah = parseInt(qty[i]);

        if (jumlah > produk.stok) {
            pesanError.push(`Stok ${produk.nama_produk} tidak mencukupi`);
            continue;
        }

        const subtotal = jumlah * produk.harga;

        total += subtotal;

        detail.push({
            product_id: produk.id,
            qty: jumlah,
            subtotal
        });

    }

    if (pesanError.length > 0) {

        return res.render("pages/transactions/create", {
            title: "Transaksi Baru",
            products: Transaction.ambilSemuaProduk(),
            pesanError
        });

    }

    // ==========================
    // DEBUG SESSION
    // ==========================

    console.log("SESSION :", req.session);
    console.log("USER ID :", req.session.user_id);

    // Sementara gunakan user id = 1
    const transaksiId = Transaction.tambahTransaksi(
        1,
        total
    );

    detail.forEach(item => {

        Transaction.tambahDetail(
            transaksiId,
            item.product_id,
            item.qty,
            item.subtotal
        );

        Transaction.updateStok(
            item.product_id,
            item.qty
        );

    });

    res.redirect("/transaksi/detail/" + transaksiId);

}

// ==================== DETAIL ====================

function detail(req, res) {

    const transaksi = Transaction
        .ambilSemuaTransaksi()
        .find(t => t.id == req.params.id);

    const detail = Transaction
        .ambilDetailTransaksi(req.params.id);

    res.render("pages/transactions/detail", {
        title: "Detail Transaksi",
        transaksi,
        detail
    });

}

module.exports = {
    list,
    showCreateForm,
    create,
    detail
};