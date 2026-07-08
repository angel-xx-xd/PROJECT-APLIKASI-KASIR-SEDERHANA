const db = require("../database/config");

function tambahDetail(data) {
    return db.prepare(`
        INSERT INTO transaction_details
        (transaction_id, product_id, qty, subtotal)
        VALUES (?, ?, ?, ?)
    `).run(
        data.transaction_id,
        data.product_id,
        data.qty,
        data.subtotal
    );
}

function getDetailByTransaction(id) {
    return db.prepare(`
        SELECT
            transaction_details.*,
            products.nama_produk
        FROM transaction_details
        JOIN products
        ON transaction_details.product_id = products.id
        WHERE transaction_id = ?
    `).all(id);
}

module.exports = {
    tambahDetail,
    getDetailByTransaction
};