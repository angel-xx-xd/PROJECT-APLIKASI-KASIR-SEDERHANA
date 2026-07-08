const db = require("../database/config");

function tambahPayment(data) {
    return db.prepare(`
        INSERT INTO payments
        (transaction_id, metode_pembayaran, jumlah_bayar, kembalian)
        VALUES (?, ?, ?, ?)
    `).run(
        data.transaction_id,
        data.metode_pembayaran,
        data.jumlah_bayar,
        data.kembalian
    );
}

function getPaymentByTransaction(id) {
    return db.prepare(`
        SELECT *
        FROM payments
        WHERE transaction_id = ?
    `).get(id);
}

module.exports = {
    tambahPayment,
    getPaymentByTransaction
};