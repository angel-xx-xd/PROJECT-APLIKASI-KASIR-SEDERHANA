const Dashboard = require("../models/Dashboard");

function index(req, res) {

    const totalUser = Dashboard.totalUser();

    const totalKategori = Dashboard.totalKategori();

    const totalProduk = Dashboard.totalProduk();

    const totalTransaksi = Dashboard.totalTransaksi();

    const totalPembayaran = Dashboard.totalPembayaran();

    const produkTerbaru = Dashboard.produkTerbaru();

    const transaksiTerbaru = Dashboard.transaksiTerbaru();

    const pembayaranTerbaru = Dashboard.pembayaranTerbaru();

    res.render("pages/dashboard/index", {

        title: "Dashboard",

        totalUser,

        totalKategori,

        totalProduk,

        totalTransaksi,

        totalPembayaran,

        produkTerbaru,

        transaksiTerbaru,

        pembayaranTerbaru

    });

}

module.exports = {
    index
};