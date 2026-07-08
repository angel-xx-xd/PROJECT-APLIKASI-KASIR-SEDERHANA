require("dotenv").config();

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

// Parsing form
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session
app.use(
    session({
        secret: process.env.SESSION_SECRET || "kasir-secret",
        resave: false,
        saveUninitialized: false,
    })
);

// Handlebars
app.engine(
    "hbs",
    engine({
        extname: ".hbs",
        defaultLayout: "main",
        layoutsDir: path.join(__dirname, "views/layouts"),
    })
);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// Bootstrap
app.use(
    "/bootstrap",
    express.static(path.join(__dirname, "node_modules/bootstrap/dist"))
);

// Public
app.use(express.static(path.join(__dirname, "public")));

// Session ke semua view
app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});

// Dashboard
app.get("/", (req, res) => {
    if (!req.session.user) {
        return res.redirect("/auth/login");
    }

    res.render("pages/dashboard/index", {
        title: "Dashboard",
    });
});

// Routes
app.use("/auth", authRoutes);
app.use("/kategori", categoryRoutes);
app.use("/produk", productRoutes);
app.use("/transaksi", transactionRoutes);
app.use("/pembayaran", paymentRoutes);

// Jalankan server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});