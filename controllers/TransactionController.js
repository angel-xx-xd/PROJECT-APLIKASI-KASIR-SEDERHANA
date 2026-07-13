const Transaction = require("../models/Transaction");

// ==================== LIST ====================

function list(req, res) {

    const transactions = Transaction.ambilSemuaTransaksi();

    res.render("pages/transaction/list", {
        title: "Data Transaksi",
        transactions
    });

}

// ==================== FORM TRANSAKSI ====================

function showCreateForm(req, res) {

    const products = Transaction.ambilSemuaProduk();

    res.render("pages/transaction/create", {
        title: "Transaksi Baru",
        products,
        pesanError: [],
        formData: {}
    });

}

// ==================== SIMPAN TRANSAKSI ====================

function create(req, res) {

    let {

        product_id,

        qty

    } = req.body;

    const pesanError = [];

    if (!Array.isArray(product_id)) {
        product_id = [product_id];
    }

    if (!Array.isArray(qty)) {
        qty = [qty];
    }

    if (product_id.length === 0) {

        pesanError.push("Produk belum dipilih");

    }

    let total = 0;

    const detail = [];

    for (let i = 0; i < product_id.length; i++) {

        const produk = Transaction.ambilProdukById(product_id[i]);

        if (!produk) {

            pesanError.push("Produk tidak ditemukan");

            continue;

        }

        const jumlah = parseInt(qty[i]);

        if (isNaN(jumlah) || jumlah <= 0) {

            pesanError.push("Jumlah produk tidak valid");

            continue;

        }

        if (jumlah > produk.stok) {

            pesanError.push(
                `Stok ${produk.nama_produk} tidak mencukupi`
            );

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

        const products = Transaction.ambilSemuaProduk();

        return res.render("pages/transaction/create", {

            title: "Transaksi Baru",

            products,

            pesanError

        });

    }

    const transaksiId = Transaction.tambahTransaksi(

        req.session.user_id,

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

    res.redirect("/transaction/detail/" + transaksiId);

}

// ==================== DETAIL ====================

function detail(req, res) {

    const transaksi = Transaction
        .ambilSemuaTransaksi()
        .find(t => t.id == req.params.id);

    const detail = Transaction
        .ambilDetailTransaksi(req.params.id);

    res.render("pages/transaction/detail", {

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