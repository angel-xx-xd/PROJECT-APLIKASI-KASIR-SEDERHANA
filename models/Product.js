const db = require("../database/config");

function getAllProduct() {
    return db.prepare(`
        SELECT
            products.*,
            categories.nama_kategori
        FROM products
        JOIN categories
        ON products.category_id = categories.id
        ORDER BY products.id DESC
    `).all();
}

function getProductById(id) {
    return db.prepare(`
        SELECT *
        FROM products
        WHERE id = ?
    `).get(id);
}

function tambahProduct(data) {
    return db.prepare(`
        INSERT INTO products
        (category_id, nama_produk, harga, stok)
        VALUES (?, ?, ?, ?)
    `).run(
        data.category_id,
        data.nama_produk,
        data.harga,
        data.stok
    );
}

function updateProduct(data) {
    return db.prepare(`
        UPDATE products
        SET category_id = ?,
            nama_produk = ?,
            harga = ?,
            stok = ?
        WHERE id = ?
    `).run(
        data.category_id,
        data.nama_produk,
        data.harga,
        data.stok,
        data.id
    );
}

function hapusProduct(id) {
    return db.prepare(`
        DELETE FROM products
        WHERE id = ?
    `).run(id);
}

module.exports = {
    getAllProduct,
    getProductById,
    tambahProduct,
    updateProduct,
    hapusProduct
};