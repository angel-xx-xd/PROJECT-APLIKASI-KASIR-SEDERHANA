const Category = require("../models/Category");

function index(req, res) {
    const categories = Category.getAllCategory();

    res.render("pages/categories/index", {
        title: "Data Kategori",
        categories
    });
}

function create(req, res) {
    res.render("pages/categories/create", {
        title: "Tambah Kategori"
    });
}

function store(req, res) {
    Category.tambahCategory(req.body.nama_kategori);
    res.redirect("/kategori");
}

function edit(req, res) {
    const category = Category.getCategoryById(req.params.id);

    res.render("pages/categories/edit", {
        title: "Edit Kategori",
        category
    });
}

function update(req, res) {
    Category.updateCategory(
        req.params.id,
        req.body.nama_kategori
    );

    res.redirect("/kategori");
}

function destroy(req, res) {
    Category.hapusCategory(req.params.id);

    res.redirect("/kategori");
}

module.exports = {
    index,
    create,
    store,
    edit,
    update,
    destroy
};