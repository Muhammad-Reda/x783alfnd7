import Akun from "../models/AkunModel.js";
import argon2 from "argon2";
import { Op } from "sequelize";

export const muatSemuaAkunPetugas = async (req, res) => {
    const search = req.query.search_query || "";
    const totalRows = await Akun.count({
        where: {
            [Op.and]: [
                {
                    username: {
                        [Op.like]: "%" + search + "%",
                    },
                },
                {
                    [Op.or]: [
                        {
                            status: "ketua",
                        },
                        {
                            status: "kader",
                        },
                        {
                            status: "bidan",
                        },
                    ],
                },
            ],
        },
    });
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || totalRows;
    const offset = limit * page;
    const totalPage = Math.ceil(totalRows / limit);

    try {
        const response = await Akun.findAll({
            attributes: ["noHp", "username", "status"],
            where: {
                [Op.and]: [
                    {
                        username: {
                            [Op.like]: "%" + search + "%",
                        },
                    },
                    {
                        [Op.or]: [
                            {
                                status: "kader",
                            },
                            {
                                status: "bidan",
                            },
                            {
                                status: "ketua",
                            },
                        ],
                    },
                ],
            },
            offset: offset,
            limit: limit,
            order: [["username", "ASC"]],
        });
        res.status(200).json({
            response: response,
            page: page,
            limit: limit,
            totalRows: totalRows,
            totalPage: totalPage,
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const muatSemuaAkunIbu = async (req, res) => {
    const search = req.query.search_query || "";
    const totalRows = await Akun.count({
        where: {
            [Op.and]: [
                {
                    username: {
                        [Op.like]: "%" + search + "%",
                    },
                },
                {
                    status: "ibu",
                },
            ],
        },
    });
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || totalRows;
    const offset = limit * page;
    const totalPage = Math.ceil(totalRows / limit);

    try {
        const response = await Akun.findAll({
            attributes: ["noHp", "username", "status"],
            where: {
                [Op.and]: [
                    {
                        username: {
                            [Op.like]: "%" + search + "%",
                        },
                    },
                    {
                        status: "ibu",
                    },
                ],
            },
            offset: offset,
            limit: limit,
            order: [["username", "ASC"]],
        });
        res.status(200).json({
            response: response,
            page: page,
            limit: limit,
            totalRows: totalRows,
            totalPage: totalPage,
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const muatAkun = async (req, res) => {
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

export const simpanAkun = async (req, res) => {
    const { noHp, username, password, confPassword, status } = req.body;

    const response = await Akun.findOne({
        where: {
            noHp: noHp,
        },
    });

    const cariUsername = await Akun.findOne({
        where: {
            username: username,
        },
    });

    if (response)
        return res.status(400).json({ msg: "Akun atau No Hp sudah terdaftar" });
    if (cariUsername)
        return res.status(400).json({ msg: "Username sudah terdaftar" });
    if (noHp == 0)
        return res.status(400).json({ msg: "Isi data dengan benar" });
    if (password !== confPassword)
        return res
            .status(400)
            .json({ msg: "Password dan Konfirmasi Password tidak cocok" });
    const hashPassword = await argon2.hash(password);
    try {
        await Akun.create({
            noHp: noHp,
            username: username,
            password: hashPassword,
            status: status,
        });
        res.status(201).json({ msg: "Akun berhasil dibuat" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const updateAkun = async (req, res) => {
    const akun = await Akun.findOne({
        where: {
            noHp: req.params.noHp,
        },
    });
    if (!akun) return res.status(404).json({ msg: "Akun tidak ada" });
    const { username, password, confPassword, status } = req.body;
    let hashPassword;
    if (password === "" || password === null) {
        hashPassword = akun.password;
    } else {
        hashPassword = await argon2.hash(password);
    }
    if (password !== confPassword)
        return res
            .status(400)
            .json({ msg: "Password dan Konfirmasi Password tidak cocok" });
    try {
        await Akun.update(
            {
                username: username,
                password: hashPassword,
                status: status,
            },
            {
                where: {
                    noHp: akun.noHp,
                },
            }
        );
        res.status(200).json({ msg: "Akun berhasil diubah" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const hapusAkun = async (req, res) => {
    const akun = await Akun.findOne({
        where: {
            noHp: req.params.noHp,
        },
    });
    if (!akun) return res.status(404).json({ msg: "Akun tidak ada" });
    try {
        await Akun.destroy({
            where: {
                noHp: akun.noHp,
            },
        });
        res.status(200).json({ msg: "Akun berhasil dihapus" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};
