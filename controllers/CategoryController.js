const Category = require("../models/Category");

// ==================== VALIDASI ====================

function validasiKategori(nama_kategori) {

    const pesanError = [];

    if (!nama_kategori || nama_kategori.trim() === "") {
        pesanError.push("Nama kategori tidak boleh kosong");
    }

    if (nama_kategori && nama_kategori.length > 100) {
        pesanError.push("Nama kategori maksimal 100 karakter");
    }

    return pesanError;

}

// ==================== LIST ====================

function list(req, res) {

    const categories = Category.ambilSemuaKategori();

    res.render("pages/category/list", {
        title: "Kategori",
        categories
    });

}

// ==================== FORM TAMBAH ====================

function showCreateForm(req, res) {

    res.render("pages/category/create", {
        title: "Tambah Kategori",
        formData: {},
        pesanError: []
    });

}

// ==================== TAMBAH ====================

function create(req, res) {

    const { nama_kategori } = req.body;

    const pesanError = validasiKategori(nama_kategori);

    if (pesanError.length > 0) {

        return res.render("pages/category/create", {
            pesanError,
            formData: {
                nama_kategori
            }
        });

    }

    Category.tambahKategori(nama_kategori);

    res.redirect("/category/list");

}

// ==================== FORM EDIT ====================

function showEditForm(req, res) {

    const category = Category.ambilKategoriById(req.params.id);

    res.render("pages/category/edit", {
        title: "Edit Kategori",
        category,
        pesanError: [],
        formData: {}
    });

}

// ==================== EDIT ====================

function edit(req, res) {

    const { nama_kategori } = req.body;

    const pesanError = validasiKategori(nama_kategori);

    if (pesanError.length > 0) {

        return res.render("pages/category/edit", {
            pesanError,
            category: {
                id: req.params.id,
                nama_kategori
            }
        });

    }

    Category.updateKategori(
        req.params.id,
        nama_kategori
    );

    res.redirect("/category/list");

}

// ==================== DELETE ====================

function hapus(req, res) {

    Category.hapusKategori(req.params.id);

    res.redirect("/category/list");

}

module.exports = {
    list,
    showCreateForm,
    create,
    showEditForm,
    edit,
    hapus
};