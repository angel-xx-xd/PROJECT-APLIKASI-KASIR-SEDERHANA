const db = require("./config");
const bcrypt = require("bcrypt");

// =======================
// Buat tabel users
// =======================
db.prepare(`
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nama TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
`).run();

// =======================
// Password admin
// =======================
const password = bcrypt.hashSync("admin123", 10);

// =======================
// Cek admin
// =======================
const admin = db.prepare(`
SELECT * FROM users
WHERE email = ?
`).get("admin@gmail.com");

// =======================
// Insert admin
// =======================
if (!admin) {

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
        password,
        "admin"
    );

    console.log("Admin berhasil dibuat.");

} else {

    console.log("Admin sudah ada.");

}