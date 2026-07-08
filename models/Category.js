const db = require("../database/config");

function getAllCategory() {
    return db.prepare(`
        SELECT * FROM categories
        ORDER BY id DESC
    `).all();
}

function getCategoryById(id) {
    return db.prepare(`
        SELECT * FROM categories
        WHERE id = ?
    `).get(id);
}

function tambahCategory(nama_kategori) {
    return db.prepare(`
        INSERT INTO categories
        (nama_kategori)
        VALUES (?)
    `).run(nama_kategori);
}

function updateCategory(id, nama_kategori) {
    return db.prepare(`
        UPDATE categories
        SET nama_kategori = ?
        WHERE id = ?
    `).run(nama_kategori, id);
}

function hapusCategory(id) {
    return db.prepare(`
        DELETE FROM categories
        WHERE id = ?
    `).run(id);
}

module.exports = {
    getAllCategory,
    getCategoryById,
    tambahCategory,
    updateCategory,
    hapusCategory
};