const db = require("../database/config");

// ==================== AMBIL SEMUA TRANSAKSI ====================

function ambilSemuaTransaksi() {

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
    `).all();

}

// ==================== AMBIL SEMUA PRODUK ====================

function ambilSemuaProduk() {

    return db.prepare(`
        SELECT
            products.id,
            products.nama_produk,
            products.harga,
            products.stok,
            categories.nama_kategori
        FROM products
        JOIN categories
            ON products.category_id = categories.id
        ORDER BY products.nama_produk ASC
    `).all();

}

// ==================== AMBIL PRODUK BERDASARKAN ID ====================

function ambilProdukById(id) {

    return db.prepare(`
        SELECT *
        FROM products
        WHERE id = ?
    `).get(id);

}

// ==================== SIMPAN TRANSAKSI ====================

function tambahTransaksi(user_id, total) {

    const result = db.prepare(`
        INSERT INTO transactions
        (
            user_id,
            total
        )
        VALUES
        (
            ?, ?
        )
    `).run(
        user_id,
        total
    );

    return result.lastInsertRowid;

}

// ==================== SIMPAN DETAIL ====================

function tambahDetail(transaction_id, product_id, qty, subtotal) {

    return db.prepare(`
        INSERT INTO transaction_details
        (
            transaction_id,
            product_id,
            qty,
            subtotal
        )
        VALUES
        (
            ?, ?, ?, ?
        )
    `).run(
        transaction_id,
        product_id,
        qty,
        subtotal
    );

}

// ==================== UPDATE STOK ====================

function updateStok(product_id, qty) {

    return db.prepare(`
        UPDATE products
        SET
            stok = stok - ?
        WHERE id = ?
    `).run(
        qty,
        product_id
    );

}

// ==================== DETAIL TRANSAKSI ====================

function ambilDetailTransaksi(id) {

    return db.prepare(`
        SELECT

            td.qty,

            td.subtotal,

            p.nama_produk,

            p.harga

        FROM transaction_details td

        JOIN products p

        ON td.product_id = p.id

        WHERE td.transaction_id = ?

    `).all(id);

}

module.exports = {

    ambilSemuaTransaksi,

    ambilSemuaProduk,

    ambilProdukById,

    tambahTransaksi,

    tambahDetail,

    updateStok,

    ambilDetailTransaksi

};