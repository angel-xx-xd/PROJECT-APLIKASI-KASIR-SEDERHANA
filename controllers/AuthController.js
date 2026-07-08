const bcrypt = require("bcrypt");
const User = require("../models/User");

// Menampilkan halaman login
function showLoginForm(req, res) {
    res.render("pages/auth/login", {
        title: "Login"
    });
}

// Proses login
function login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.render("pages/auth/login", {
            title: "Login",
            error: "Email dan Password harus diisi!"
        });
    }

    const user = User.getUserByEmail(email);

    if (!user) {
        return res.render("pages/auth/login", {
            title: "Login",
            error: "Email tidak ditemukan!"
        });
    }

    const cocok = bcrypt.compareSync(password, user.password);

    if (!cocok) {
        return res.render("pages/auth/login", {
            title: "Login",
            error: "Password salah!"
        });
    }

    req.session.user = user;
    req.session.userId = user.id;
    req.session.nama = user.nama;
    req.session.role = user.role;

    res.redirect("/");
}

// Logout
function logout(req, res) {
    req.session.destroy(() => {
        res.redirect("/auth/login");
    });
}

module.exports = {
    showLoginForm,
    login,
    logout
};