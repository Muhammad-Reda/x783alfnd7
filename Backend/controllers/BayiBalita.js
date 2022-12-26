import BayiBalita from "../models/BayiBalitaModel.js";
import Ibu from "../models/IbuModels.js";
import db from "../config/Database.js";
import { Op } from "sequelize";

export const muatSemuaBayiBalita = async (req, res) => {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search_query || "";
    const offset = limit * page;
    const totalRows = await BayiBalita.count({
        where: {
            [Op.or]: [
                {
                    nama: {
                        [Op.like]: "%" + search + "%",
                    },
                },
            ],
        },
    });
    const totalPage = Math.ceil(totalRows / limit);
    try {
        const response = await BayiBalita.findAll({
            attributes: [
                [
                    db.fn("DATE_FORMAT", db.col("tanggalLahir"), "%d/%m/%Y"),
                    "tanggalLahirBaru",
                ],
                "id",
                "ibuNik",
                "nama",
                "tempatLahir",
                "tanggalLahir",
                "jenisKelamin",
                "beratLahir",
                "panjangLahir",
                "kondisiPersalinan",
                "anakKe",
            ],
            where: {
                [Op.or]: [
                    {
                        nama: {
                            [Op.like]: "%" + search + "%",
                        },
                    },
                ],
            },
            offset: offset,
            limit: limit,
            order: [["nama", "ASC"]],
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

export const muatBayiBalita = async (req, res) => {
    try {
        const response = await BayiBalita.findOne({
            attributes: [
                [
                    db.fn("DATE_FORMAT", db.col("tanggalLahir"), "%d/%m/%Y"),
                    "tanggalLahirBaru",
                ],
                "ibuNik",
                "nama",
                "tempatLahir",
                "tanggalLahir",
                "jenisKelamin",
                "beratLahir",
                "panjangLahir",
                "kondisiPersalinan",
                "anakKe",
            ],
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(response);
        console.log(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const muatBayiBalitaIbu = async (req, res) => {
    try {
        const response = await BayiBalita.findOne({
            attributes: [
                [
                    db.fn("DATE_FORMAT", db.col("tanggalLahir"), "%d/%m/%Y"),
                    "tanggalLahirBaru",
                ],
                "id",
                "ibuNik",
                "nama",
                "tempatLahir",
                "tanggalLahir",
                "jenisKelamin",
                "beratLahir",
                "panjangLahir",
                "kondisiPersalinan",
                "anakKe",
            ],
            where: {
                ibuNik: req.params.ibuNik,
            },
        });
        if (!response)
            return res.status(404).json({ msg: "Data tidak ditemukan" });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const simpanBayiBalita = async (req, res) => {
    const {
        id,
        ibuNik,
        nama,
        tempatLahir,
        tanggalLahir,
        jenisKelamin,
        beratLahir,
        panjangLahir,
        kondisiPersalinan,
        anakKe,
    } = req.body;
    const response = await BayiBalita.findOne({
        where: {
            id: id,
        },
    });
    if (response)
        return res.status(400).json({ msg: "Data bayi/balita sudah ada" });
    const resIbu = await Ibu.findOne({
        where: {
            nik: ibuNik,
        },
    });
    if (!resIbu)
        return res.status(400).json({ msg: "Data ibu belum terdaftar" });

    try {
        await BayiBalita.create({
            id: id,
            ibuNik: ibuNik,
            nama: nama,
            tempatLahir: tempatLahir,
            tanggalLahir: tanggalLahir,
            jenisKelamin: jenisKelamin,
            beratLahir: beratLahir,
            panjangLahir: panjangLahir,
            kondisiPersalinan: kondisiPersalinan,
            anakKe: anakKe,
        });
        res.status(201).json({ msg: "Data Bayi berhasil dibuat" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const updateBayiBalita = async (req, res) => {
    const bayiBalita = await BayiBalita.findOne({
        where: {
            id: req.params.id,
        },
    });
    if (!bayiBalita)
        return res.status(404).json({ msg: "Data bayi/balita tidak ada" });
    const {
        ibuNik,
        nama,
        tempatLahir,
        tanggalLahir,
        jenisKelamin,
        beratLahir,
        panjangLahir,
        kondisiPersalinan,
        anakKe,
    } = req.body;

    const nikIbu = await Ibu.findOne({
        where: {
            nik: ibuNik,
        },
    });
    if (!nikIbu)
        return res.status(404).json({ msg: "NIK ibu tidak ditemukan" });

    try {
        await BayiBalita.update(
            {
                ibuNik: ibuNik,
                nama: nama,
                tempatLahir: tempatLahir,
                tanggalLahir: tanggalLahir,
                jenisKelamin: jenisKelamin,
                beratLahir: beratLahir,
                panjangLahir: panjangLahir,
                kondisiPersalinan: kondisiPersalinan,
                anakKe: anakKe,
            },
            {
                where: {
                    id: bayiBalita.id,
                },
            }
        );
        res.status(200).json({ msg: "Data bayi/balita berhasil diubah" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const hapusBayiBalita = async (req, res) => {
    const bayiBalita = await BayiBalita.findOne({
        where: {
            id: req.params.id,
        },
    });
    if (!bayiBalita)
        return res.status(404).json({ msg: "Data Bayi/Balita tidak ada" });
    try {
        await BayiBalita.destroy({
            where: {
                id: bayiBalita.id,
            },
        });
        res.status(200).json({ msg: "Data Bayi/Balita berhasil dihapus" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};
