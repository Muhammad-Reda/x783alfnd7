import Akun from "../models/AkunModel.js";

export const verifyAkun = async (req, res, next) => {
    // Mengecek apakah session akunId ada
    if (!req.session.akunId) {
        return res.status(401).json({ msg: "Mohon login terlebih dahulu" });
    }

    const akun = await Akun.findOne({
        where: {
            noHp: req.session.akunId, // Menggunakan session akunId
        },
    });

    if (!akun) return res.status(404).json({ msg: "Tidak dapat masuk" });
    req.akunId = akun.noHp;
    req.status = akun.status;
    next();
};

export const ketuaOnly = async (req, res, next) => {
    const akun = await Akun.findOne({
        where: {
            noHp: req.session.akunId, // Menggunakan session akunId
        },
    });

    if (!akun) return res.status(404).json({ msg: "Tidak dapat masuk" });
    if (akun.status !== "ketua")
        return res.status(403).json({ msg: "Akses ditolak" });
    next();
};

export const kaderOnly = async (req, res, next) => {
    const akun = await Akun.findOne({
        where: {
            noHp: req.session.akunId, // Menggunakan session akunId
        },
    });

    if (!akun) return res.status(404).json({ msg: "Tidak dapat masuk" });
    if (akun.status !== "kader")
        return res.status(403).json({ msg: "Akses ditolak" });
    next();
};

export const akesAkun = async (req, res, next) => {
    const akun = await Akun.findOne({
        where: {
            noHp: req.session.akunId, // Menggunakan session akunId
        },
    });

    if (!akun) return res.status(404).json({ msg: "Tidak dapat masuk" });
    if (akun.status !== "ketua")
        if (akun.status !== "kader")
            return res.status(403).json({ msg: "Akses ditolak" });
    next();
};

export const noIbu = async (req, res, next) => {
    const akun = await Akun.findOne({
        where: {
            noHp: req.session.akunId, // Menggunakan session akunId
        },
    });

    if (!akun) return res.status(404).json({ msg: "Tidak dapat masuk" });
    if (akun.status == "ibu")
        return res.status(403).json({ msg: "Akses ditolak" });
    next();
};
