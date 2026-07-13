const db = require("../database/config");

function ambilSemuaProduk() {
    return db.prepare(`
        SELECT *
        FROM products
    `).all();
}

module.exports = {
    ambilSemuaProduk
};