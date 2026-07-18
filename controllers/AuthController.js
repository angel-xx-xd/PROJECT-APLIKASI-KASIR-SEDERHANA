const User = require("../models/User");

// ==========================
// MENAMPILKAN FORM LOGIN
// ==========================

function showLoginForm(req, res) {

    if (req.session.user_id) {
        return res.redirect("/");
    }

    res.render("pages/auth/login", {
        title: "Login",
        pesanError: [],
        formData: {}
    });

}

// ==========================
// PROSES LOGIN
// ==========================

function handleLogin(req, res) {

    const { email, password } = req.body;

    const pesanError = [];

    // Validasi
    if (!email || email.trim() === "") {
        pesanError.push("Email tidak boleh kosong");
    }

    if (!password || password.trim() === "") {
        pesanError.push("Password tidak boleh kosong");
    }

    if (pesanError.length > 0) {

        return res.render("pages/auth/login", {
            title: "Login",
            pesanError,
            formData: {
                email
            }
        });

    }

    // Cari user berdasarkan email
    const user = User.ambilUserByEmail(email);

    if (!user) {

        return res.render("pages/auth/login", {
            title: "Login",
            pesanError: ["Email tidak ditemukan"],
            formData: {
                email
            }
        });

    }

    // Cek password
    if (user.password !== password) {

        return res.render("pages/auth/login", {
            title: "Login",
            pesanError: ["Password salah"],
            formData: {
                email
            }
        });

    }

    // Simpan session
    req.session.user_id = user.id;
    req.session.nama = user.nama;
    req.session.email = user.email;
    req.session.role = user.role;

    return res.redirect("/");

}

// ==========================
// LOGOUT
// ==========================

function handleLogout(req, res) {

    req.session.destroy((err) => {

        if (err) {
            return res.redirect("/");
        }

        res.redirect("/auth/login");

    });

}

module.exports = {
    showLoginForm,
    handleLogin,
    handleLogout
};