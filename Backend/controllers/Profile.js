import Akun from "../models/AkunModel.js";
import argon2 from "argon2";

export const muatProfile = async (req, res) => {
    try {
        const response = await Akun.findOne({
            attributes: ["noHp", "username", "status"],
            where: {
                noHp: req.params.noHp,
            },
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const updateProfile = async (req, res) => {
    const akun = await Akun.findOne({
        where: {
            noHp: req.params.noHp,
        },
    });
    if (!akun) return res.status(404).json({ msg: "Akun tidak ada" });
    const { username, password, passwordBaru } = req.body;
    const cariUser = await Akun.findOne({
        where: {
            username: req.body.username,
        },
    });

    if (cariUser && cariUser.username !== akun.username)
        return res.status(400).json({ msg: "Username Sudah digunakan" });

    let hashPassword;
    if (
        (password == "" || password == null) &&
        (passwordBaru == "" || passwordBaru == null)
    ) {
        hashPassword = akun.password;
    } else {
        const match = await argon2.verify(akun.password, req.body.password);
        if (!match) return res.status(400).json({ msg: "password lama salah" });
        hashPassword = await argon2.hash(passwordBaru);
    }

    try {
        await Akun.update(
            {
                username: username,
                password: hashPassword,
            },
            {
                where: {
                    noHp: akun.noHp,
                },
            }
        );
        res.status(200).json({ msg: "Profile berhasil diubah" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};
