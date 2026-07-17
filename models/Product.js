const db = require("../database/config");

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
        ORDER BY products.id DESC
    `).all();

}

// ==================== AMBIL SEMUA KATEGORI ====================

function ambilSemuaKategori() {

    return db.prepare(`
        SELECT
            id,
            nama_kategori
        FROM categories
        ORDER BY nama_kategori ASC
    `).all();

}

// ==================== AMBIL PRODUK BERDASARKAN ID ====================

function ambilProdukById(id) {

    return db.prepare(`
        SELECT
            id,
            category_id,
            nama_produk,
            harga,
            stok
        FROM products
        WHERE id = ?
    `).get(id);

}

// ==================== TAMBAH PRODUK ====================

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

// ==================== UPDATE PRODUK ====================

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

// ==================== HAPUS PRODUK ====================

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