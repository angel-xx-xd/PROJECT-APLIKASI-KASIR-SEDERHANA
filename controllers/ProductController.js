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

    res.render("pages/products/list", {
        title: "Produk",
        products
    });

}

// ==================== FORM TAMBAH ====================

function showCreateForm(req, res) {

    const categories = Product.ambilSemuaKategori();

    res.render("pages/products/create", {
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

        return res.render("pages/products/create", {
            title: "Tambah Produk",
            categories,
            pesanError,
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

    res.redirect("/produk/list");

}

// ==================== FORM EDIT ====================

function showEditForm(req, res) {

    const product = Product.ambilProdukById(req.params.id);

    const categories = Product.ambilSemuaKategori();

    res.render("pages/products/edit", {
        title: "Edit Produk",
        product,
        categories,
        pesanError: []
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

        return res.render("pages/products/edit", {
            title: "Edit Produk",
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

    res.redirect("/produk/list");

}

// ==================== DELETE ====================

function hapus(req, res) {

    Product.hapusProduk(req.params.id);

    res.redirect("/produk/list");

}

module.exports = {
    list,
    showCreateForm,
    create,
    showEditForm,
    edit,
    hapus
};