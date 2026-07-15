const db = require("../database/config");

// ==================== LIST ====================

function ambilSemuaProduk() {

    return db.prepare(`
        SELECT
            products.id,
            products.nama_produk,
            products.harga,
            products.stok,
            products.category_id,
            categories.nama_kategori
        FROM products
        JOIN categories
            ON products.category_id = categories.id
        ORDER BY products.id DESC
    `).all();

}

// ==================== KATEGORI ====================

function ambilSemuaKategori() {

    return db.prepare(`
        SELECT *
        FROM categories
        ORDER BY nama_kategori
    `).all();

}

// ==================== DETAIL ====================

function ambilProdukById(id) {

    return db.prepare(`
        SELECT *
        FROM products
        WHERE id = ?
    `).get(id);

}

// ==================== INSERT ====================

function tambahProduk(
    category_id,
    nama_produk,
    harga,
    stok
) {

    return db.prepare(`
        INSERT INTO products
        (
            category_id,
            nama_produk,
            harga,
            stok
        )
        VALUES
        (
            ?, ?, ?, ?
        )
    `).run(
        category_id,
        nama_produk,
        harga,
        stok
    );

}

// ==================== UPDATE ====================

function updateProduk(
    id,
    category_id,
    nama_produk,
    harga,
    stok
) {

    return db.prepare(`
        UPDATE products
        SET
            category_id = ?,
            nama_produk = ?,
            harga = ?,
            stok = ?
        WHERE id = ?
    `).run(
        category_id,
        nama_produk,
        harga,
        stok,
        id
    );

}

// ==================== DELETE ====================

function hapusProduk(id) {

    return db.prepare(`
        DELETE FROM products
        WHERE id = ?
    `).run(id);

}

module.exports = {

    ambilSemuaProduk,
    ambilSemuaKategori,
    ambilProdukById,
    tambahProduk,
    updateProduk,
    hapusProduk

};