const db = require("../database/config");

// ==================== AMBIL TRANSAKSI BELUM DIBAYAR ====================

function ambilTransaksiBelumDibayar() {

    return db.prepare(`
        SELECT
            t.id,
            t.tanggal,
            t.total,
            u.nama
        FROM transactions t
        JOIN users u
            ON t.user_id = u.id
        LEFT JOIN payments p
            ON t.id = p.transaction_id
        WHERE p.id IS NULL
        ORDER BY t.id DESC
    `).all();

}

// ==================== AMBIL TRANSAKSI ====================

function ambilTransaksiById(id) {

    return db.prepare(`
        SELECT
            *
        FROM transactions
        WHERE id = ?
    `).get(id);

}

// ==================== SIMPAN PEMBAYARAN ====================

function tambahPembayaran(
    transaction_id,
    metode_pembayaran,
    jumlah_bayar,
    kembalian
) {

    return db.prepare(`
        INSERT INTO payments
        (
            transaction_id,
            metode_pembayaran,
            jumlah_bayar,
            kembalian
        )
        VALUES
        (
            ?, ?, ?, ?
        )
    `).run(
        transaction_id,
        metode_pembayaran,
        jumlah_bayar,
        kembalian
    );

}

// ==================== LIST PEMBAYARAN ====================

function ambilSemuaPembayaran() {

    return db.prepare(`
        SELECT
            p.id,
            p.metode_pembayaran,
            p.jumlah_bayar,
            p.kembalian,
            p.waktu_pembayaran,
            t.total
        FROM payments p
        JOIN transactions t
            ON p.transaction_id = t.id
        ORDER BY p.id DESC
    `).all();

}

module.exports = {

    ambilTransaksiBelumDibayar,

    ambilTransaksiById,

    tambahPembayaran,

    ambilSemuaPembayaran

};