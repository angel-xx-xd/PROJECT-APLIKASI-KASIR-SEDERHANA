const Dashboard = require("../models/Dashboard");

function index(req, res) {

    const totalUser = Dashboard.totalUser();

    const totalKategori = Dashboard.totalKategori();

    const totalProduk = Dashboard.totalProduk();

    const totalTransaksi = Dashboard.totalTransaksi();

    res.render("pages/dashboard/index", {

        title: "Dashboard",

        totalUser,

        totalKategori,

        totalProduk,

        totalTransaksi

    });

}

module.exports = {
    index
};