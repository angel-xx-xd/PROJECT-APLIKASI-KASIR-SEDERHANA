const db = require("../database/config");

// ==================== DASHBOARD ====================

function totalUser() {

    return db.prepare(`
        SELECT COUNT(*) AS total
        FROM users
    `).get().total;

}

function totalKategori() {

    return db.prepare(`
        SELECT COUNT(*) AS total
        FROM categories
    `).get().total;

}

function totalProduk() {

    return db.prepare(`
        SELECT COUNT(*) AS total
        FROM products
    `).get().total;

}

function totalTransaksi() {

    return db.prepare(`
        SELECT COUNT(*) AS total
        FROM transactions
    `).get().total;

}

module.exports = {
    totalUser,
    totalKategori,
    totalProduk,
    totalTransaksi
};