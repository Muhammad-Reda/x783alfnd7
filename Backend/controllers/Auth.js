import Akun from "../models/AkunModel.js";
import argon2 from "argon2";

export const Login = async (req, res) => {
    const akun = await Akun.findOne({
        where: {
            noHp: req.body.noHp,
        },
    });
    if (!akun)
        return res.status(404).json({ msg: "Password atau no Hp salah" });
    const match = await argon2.verify(akun.password, req.body.password);
    if (!match)
        return res.status(400).json({ msg: "Password atau no Hp salah" });

    // Menyimpan session akunId
    req.session.akunId = akun.noHp;

    const noHp = akun.noHp;
    const username = akun.username;
    const status = akun.status;
    res.status(200).json({ noHp, username, status });
};

export const Me = async (req, res) => {
    // Mengecek apakah session akunId ada
    if (!req.session.akunId) {
        return res.status(401).json({ msg: "Mohon login terlebih dahulu" });
    }

    const akun = await Akun.findOne({
        attributes: ["noHp", "username", "status"],
        where: {
            noHp: req.session.akunId, // Menggunakan session akunId
        },
    });

    if (!akun) return res.status(404).json({ msg: "Tidak dapat masuk" });
    res.status(200).json(akun);
};

export const logOut = (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(400).json({ msg: "Tidak dapat logout" });
        res.status(200).json({ msg: "Anda telah logout" });
    });
};
