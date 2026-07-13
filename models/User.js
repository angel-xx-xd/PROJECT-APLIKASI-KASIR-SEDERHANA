const db = require("../database/config");

// ==================== AMBIL USER ====================

function ambilUserByEmail(email) {

    return db.prepare(`
        SELECT
            id,
            nama,
            email,
            password,
            role
        FROM users
        WHERE email = ?
    `).get(email);

}

function ambilUserById(id) {

    return db.prepare(`
        SELECT
            id,
            nama,
            email,
            role
        FROM users
        WHERE id = ?
    `).get(id);

}

function ambilSemuaUser() {

    return db.prepare(`
        SELECT
            id,
            nama,
            email,
            role,
            created_at
        FROM users
        ORDER BY id DESC
    `).all();

}

// ==================== CRUD USER ====================

function tambahUser(nama, email, password, role) {

    return db.prepare(`
        INSERT INTO users
        (
            nama,
            email,
            password,
            role
        )
        VALUES
        (
            ?, ?, ?, ?
        )
    `).run(
        nama,
        email,
        password,
        role
    );

}

function updateUser(id, nama, email, role) {

    return db.prepare(`
        UPDATE users
        SET
            nama = ?,
            email = ?,
            role = ?
        WHERE id = ?
    `).run(
        nama,
        email,
        role,
        id
    );

}

function updatePassword(id, password) {

    return db.prepare(`
        UPDATE users
        SET password = ?
        WHERE id = ?
    `).run(
        password,
        id
    );

}

function hapusUser(id) {

    return db.prepare(`
        DELETE FROM users
        WHERE id = ?
    `).run(id);

}

module.exports = {
    ambilUserByEmail,
    ambilUserById,
    ambilSemuaUser,
    tambahUser,
    updateUser,
    updatePassword,
    hapusUser
};