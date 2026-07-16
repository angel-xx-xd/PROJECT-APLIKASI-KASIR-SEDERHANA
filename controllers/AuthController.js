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

    // ==========================
    // LOGIN MANUAL
    // ==========================

    const ADMIN_EMAIL = "admin@gmail.com";
    const ADMIN_PASSWORD = "admin123";

    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {

        return res.render("pages/auth/login", {
            title: "Login",
            pesanError: ["Email atau Password salah"],
            formData: {
                email
            }
        });

    }

    req.session.user_id = 1;
    req.session.nama = "Administrator";
    req.session.email = ADMIN_EMAIL;
    req.session.role = "admin";

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