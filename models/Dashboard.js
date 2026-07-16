const db = require("../database/config");

// ==================== TOTAL USER ====================

function totalUser() {

    const result = db.prepare(`
        SELECT COUNT(*) AS total
        FROM users
    `).get();

    return result.total;

}

// ==================== TOTAL KATEGORI ====================

function totalKategori() {

    const result = db.prepare(`
        SELECT COUNT(*) AS total
        FROM categories
    `).get();

    return result.total;

}

// ==================== TOTAL PRODUK ====================

function totalProduk() {

    const result = db.prepare(`
        SELECT COUNT(*) AS total
        FROM products
    `).get();

    return result.total;

}

// ==================== TOTAL TRANSAKSI ====================

function totalTransaksi() {

    const result = db.prepare(`
        SELECT COUNT(*) AS total
        FROM transactions
    `).get();

    return result.total;

}

module.exports = {
    totalUser,
    totalKategori,
    totalProduk,
    totalTransaksi
};