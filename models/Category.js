const db = require("../database/config");

// ==================== AMBIL SEMUA ====================

function ambilSemuaKategori() {

    return db.prepare(`
        SELECT
            id,
            nama_kategori,
            created_at
        FROM categories
        ORDER BY id DESC
    `).all();

}

// ==================== AMBIL BERDASARKAN ID ====================

function ambilKategoriById(id) {

    return db.prepare(`
        SELECT
            id,
            nama_kategori
        FROM categories
        WHERE id = ?
    `).get(id);

}

// ==================== TAMBAH ====================

function tambahKategori(nama_kategori) {

    return db.prepare(`
        INSERT INTO categories
        (
            nama_kategori
        )
        VALUES
        (
            ?
        )
    `).run(
        nama_kategori
    );

}

// ==================== UPDATE ====================

function updateKategori(id, nama_kategori) {

    return db.prepare(`
        UPDATE categories
        SET
            nama_kategori = ?
        WHERE id = ?
    `).run(
        nama_kategori,
        id
    );

}

// ==================== HAPUS ====================

function hapusKategori(id) {

    return db.prepare(`
        DELETE FROM categories
        WHERE id = ?
    `).run(id);

}

module.exports = {
    ambilSemuaKategori,
    ambilKategoriById,
    tambahKategori,
    updateKategori,
    hapusKategori
};