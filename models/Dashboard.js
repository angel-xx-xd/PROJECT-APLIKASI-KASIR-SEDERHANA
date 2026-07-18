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

// ==================== TOTAL PEMBAYARAN ====================

function totalPembayaran() {

    const result = db.prepare(`
        SELECT COUNT(*) AS total
        FROM payments
    `).get();

    return result.total;

}

// ==================== PRODUK TERBARU ====================

function produkTerbaru() {

    return db.prepare(`
        SELECT
            products.nama_produk,
            categories.nama_kategori,
            products.harga,
            products.stok
        FROM products
        JOIN categories
        ON products.category_id = categories.id
        ORDER BY products.id DESC
        LIMIT 5
    `).all();

}

// ==================== TRANSAKSI TERBARU ====================

function transaksiTerbaru() {

    return db.prepare(`
        SELECT
            transactions.id,
            users.nama,
            transactions.tanggal,
            transactions.total
        FROM transactions
        JOIN users
        ON transactions.user_id = users.id
        ORDER BY transactions.id DESC
        LIMIT 5
    `).all();

}

// ==================== PEMBAYARAN TERBARU ====================

function pembayaranTerbaru() {

    return db.prepare(`
        SELECT
            payments.id,
            payments.metode_pembayaran,
            payments.jumlah_bayar,
            payments.kembalian,
            payments.waktu_pembayaran,
            transactions.total
        FROM payments
        JOIN transactions
        ON payments.transaction_id = transactions.id
        ORDER BY payments.id DESC
        LIMIT 5
    `).all();

}

module.exports = {

    totalUser,
    totalKategori,
    totalProduk,
    totalTransaksi,
    totalPembayaran,

    produkTerbaru,
    transaksiTerbaru,
    pembayaranTerbaru

};