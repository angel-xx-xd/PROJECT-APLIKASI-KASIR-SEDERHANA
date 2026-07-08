const db = require("../database/config");

function getAllTransaction() {
    return db.prepare(`
        SELECT *
        FROM transactions
        ORDER BY id DESC
    `).all();
}

function tambahTransaction(data) {
    return db.prepare(`
        INSERT INTO transactions
        (user_id, total)
        VALUES (?, ?)
    `).run(
        data.user_id,
        data.total
    );
}

function getTransactionById(id) {
    return db.prepare(`
        SELECT *
        FROM transactions
        WHERE id = ?
    `).get(id);
}

module.exports = {
    getAllTransaction,
    tambahTransaction,
    getTransactionById
};