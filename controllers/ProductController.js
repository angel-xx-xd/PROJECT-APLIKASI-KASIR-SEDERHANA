const Product = require("../models/Product");

// ==================== VALIDASI ====================

function validasiProduk(category_id, nama_produk, harga, stok) {

    const pesanError = [];

    if (!category_id || category_id.trim() === "") {
        pesanError.push("Kategori harus dipilih");
    }

    if (!nama_produk || nama_produk.trim() === "") {
        pesanError.push("Nama produk tidak boleh kosong");
    }

    if (!harga || harga.trim() === "") {
        pesanError.push("Harga tidak boleh kosong");
    }

    if (isNaN(harga) || Number(harga) <= 0) {
        pesanError.push("Harga harus berupa angka dan lebih dari 0");
    }

    if (!stok || stok.trim() === "") {
        pesanError.push("Stok tidak boleh kosong");
    }

    if (isNaN(stok) || Number(stok) < 0) {
        pesanError.push("Stok tidak valid");
    }

    return pesanError;

}

// ==================== LIST ====================

function list(req, res) {

    const products = Product.ambilSemuaProduk();

    res.render("pages/product/list", {
        title: "Produk",
        products
    });

}

// ==================== FORM TAMBAH ====================

function showCreateForm(req, res) {

    const categories = Product.ambilSemuaKategori();

    res.render("pages/product/create", {
        title: "Tambah Produk",
        categories,
        formData: {},
        pesanError: []
    });

}

// ==================== TAMBAH ====================

function create(req, res) {

    const {
        category_id,
        nama_produk,
        harga,
        stok
    } = req.body;

    const pesanError = validasiProduk(
        category_id,
        nama_produk,
        harga,
        stok
    );

    if (pesanError.length > 0) {

        const categories = Product.ambilSemuaKategori();

        return res.render("pages/product/create", {

            pesanError,

            categories,

            formData: {
                category_id,
                nama_produk,
                harga,
                stok
            }

        });

    }

    Product.tambahProduk(
        category_id,
        nama_produk,
        harga,
        stok
    );

    res.redirect("/product/list");

}

// ==================== FORM EDIT ====================

function showEditForm(req, res) {

    const product = Product.ambilProdukById(req.params.id);

    const categories = Product.ambilSemuaKategori();

    res.render("pages/product/edit", {

        title: "Edit Produk",

        product,

        categories,

        pesanError: [],

        formData: {}

    });

}

// ==================== UPDATE ====================

function edit(req, res) {

    const {
        category_id,
        nama_produk,
        harga,
        stok
    } = req.body;

    const pesanError = validasiProduk(
        category_id,
        nama_produk,
        harga,
        stok
    );

    if (pesanError.length > 0) {

        const categories = Product.ambilSemuaKategori();

        return res.render("pages/product/edit", {

            categories,

            pesanError,

            product: {

                id: req.params.id,

                category_id,

                nama_produk,

                harga,

                stok

            }

        });

    }

    Product.updateProduk(

        req.params.id,

        category_id,

        nama_produk,

        harga,

        stok

    );

    res.redirect("/product/list");

}

// ==================== DELETE ====================

function hapus(req, res) {

    Product.hapusProduk(req.params.id);

    res.redirect("/product/list");

}

module.exports = {

    list,

    showCreateForm,

    create,

    showEditForm,

    edit,

    hapus

};