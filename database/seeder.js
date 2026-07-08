const db = require("./config");
const bcrypt = require("bcrypt");

// Password admin
const password = bcrypt.hashSync("admin123", 10);

// Cek apakah admin sudah ada
const admin = db.prepare(`
    SELECT * FROM users
    WHERE email = ?
`).get("admin@gmail.com");

if (!admin) {
    db.prepare(`
        INSERT INTO users
        (nama, email, password, role)
        VALUES (?, ?, ?, ?)
    `).run(
        "Administrator",
        "admin@gmail.com",
        password,
        "admin"
    );

    console.log("Admin berhasil ditambahkan.");
} else {
    console.log("Admin sudah ada.");
}