require("dotenv").config();
require("./database/init");

const express = require("express");
const { engine } = require("express-handlebars");
const path = require("path");
const session = require("express-session");

const authRoutes = require("./routes/auth");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const transactionRoutes = require("./routes/transaction");
const paymentRoutes = require("./routes/payment");

const app = express();

// ======================
// Body Parser
// ======================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ======================
// Session
// ======================
app.use(
    session({
        secret: process.env.SESSION_SECRET || "kasir-secret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60
        }
    })
);

// ======================
// Handlebars
// ======================
app.engine(
    "hbs",
    engine({
        extname: ".hbs",
        defaultLayout: "main",
        layoutsDir: path.join(__dirname, "views/layouts")
    })
);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// ======================
// Static Files
// ======================
app.use(
    "/bootstrap",
    express.static(path.join(__dirname, "node_modules/bootstrap/dist"))
);

app.use(express.static(path.join(__dirname, "public")));

// ======================
// Session ke View
// ======================
app.use((req, res, next) => {

    res.locals.session = req.session;

    next();

});

// ======================
// Dashboard
// ======================
app.get("/", (req, res) => {

    if (!req.session.user_id) {
        return res.redirect("/auth/login");
    }

    res.render("pages/dashboard/index", {
        title: "Dashboard"
    });

});

// ======================
// Routes
// ======================
app.use("/auth", authRoutes);
app.use("/kategori", categoryRoutes);
app.use("/produk", productRoutes);
app.use("/transaksi", transactionRoutes);
app.use("/pembayaran", paymentRoutes);

// ======================
// 404
// ======================
app.use((req, res) => {

    res.status(404).send("404 | Halaman tidak ditemukan");

});

// ======================
// Error Handler
// ======================
app.use((err, req, res, next) => {

    console.error(err);

    res.status(500).send("Terjadi kesalahan pada server.");

});

// ======================
// Start Server
// ======================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`Server berjalan di http://localhost:${PORT}`);

});