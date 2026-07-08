const db = require("../database/config");

function getUserByEmail(email) {
    return db.prepare(`
        SELECT * FROM users
        WHERE email = ?
    `).get(email);
}

function getUserById(id) {
    return db.prepare(`
        SELECT * FROM users
        WHERE id = ?
    `).get(id);
}

function tambahUser(data) {
    return db.prepare(`
        INSERT INTO users
        (nama, email, password, role)
        VALUES (?, ?, ?, ?)
    `).run(
        data.nama,
        data.email,
        data.password,
        data.role
    );
}

module.exports = {
    getUserByEmail,
    getUserById,
    tambahUser
};