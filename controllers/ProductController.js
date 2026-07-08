const ProductModel = require("../models/Product");
const CategoryModel = require("../models/Category");

// ==================== VALIDATION ====================

function validateProduct(nama_produk, category_id, harga, stok) {
    const pesanError = [];

    if (!nama_produk || nama_produk.trim() === "") {
        pesanError.push("Nama produk tidak boleh kosong");
    }

    if (!category_id) {
        pesanError.push("Kategori harus dipilih");
    }

    if (!harga || parseInt(harga) <= 0) {
        pesanError.push("Harga tidak valid");
    }

    if (!stok || parseInt(stok) < 0) {
        pesanError.push("Stok tidak valid");
    }

    return pesanError;
}

// ==================== CRUD ====================

function listProduct(req, res) {

}

function showCreateForm(req, res) {

}

function createProduct(req, res) {

}

function showEditForm(req, res) {

}

function editProduct(req, res) {

}

function deleteProduct(req, res) {

}

module.exports = {
    listProduct,
    showCreateForm,
    createProduct,
    showEditForm,
    editProduct,
    deleteProduct
};