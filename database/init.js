const db = require("./config");
db.pragma("foreign_keys = ON");

db.prepare(`
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nama TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`).run();


db.prepare(`
CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nama_kategori TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`).run();


db.prepare(`
CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_id INTEGER NOT NULL,
    nama_produk TEXT NOT NULL,
    harga INTEGER NOT NULL,
    stok INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(category_id) REFERENCES categories(id)
)
`).run();


db.prepare(`
CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    tanggal TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total INTEGER NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id)
)
`).run();


db.prepare(`
CREATE TABLE IF NOT EXISTS transaction_details (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    transaction_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    qty INTEGER NOT NULL,
    subtotal INTEGER NOT NULL,
    FOREIGN KEY(transaction_id) REFERENCES transactions(id),
    FOREIGN KEY(product_id) REFERENCES products(id)
)
`).run();


db.prepare(`
CREATE TABLE IF NOT EXISTS payments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    transaction_id INTEGER NOT NULL UNIQUE,
    metode_pembayaran TEXT NOT NULL,
    jumlah_bayar INTEGER NOT NULL,
    kembalian INTEGER NOT NULL,
    waktu_pembayaran TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(transaction_id) REFERENCES transactions(id)
)
`).run();

console.log("Database berhasil dibuat.");

// ======================
// ADMIN DEFAULT 1
// ======================

const admin1 = db.prepare(`
    SELECT *
    FROM users
    WHERE email = ?
`).get("admin@gmail.com");

if (!admin1) {

    db.prepare(`
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
        "Administrator",
        "admin@gmail.com",
        "admin123",
        "admin"
    );

    console.log("Admin 1 berhasil dibuat.");

}

// ======================
// ADMIN DEFAULT 2
// ======================

const admin2 = db.prepare(`
    SELECT *
    FROM users
    WHERE email = ?
`).get("kasir@gmail.com");

if (!admin2) {

    db.prepare(`
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
        "Kasir",
        "kasir@gmail.com",
        "kasir123",
        "admin"
    );

    console.log("Admin 2 berhasil dibuat.");

}