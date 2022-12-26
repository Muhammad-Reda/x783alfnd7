import PerkembanganBayiBalita from "../models/PerkembanganBayiBalitaModel.js";
import BayiBalita from "../models/BayiBalitaModel.js";
import Ibu from "../models/IbuModels.js";
import Akun from "../models/AkunModel.js";
import db from "../config/Database.js";
import { Op } from "sequelize";

export const muatDataPerkembanganChart = async (req, res) => {
    const currentYear = new Date().getFullYear();
    const search = req.query.tahun || currentYear;
    const idBayi = parseInt(req.query.idBayi) || 0;

    try {
        const response = await PerkembanganBayiBalita.findAll({
            attributes: [
                [
                    db.fn("DATE_FORMAT", db.col("tanggalPemeriksaan"), "%M"),
                    "bulanPemeriksaan",
                ],
                "imunisasi",
                "beratBadan",
                "tinggiBadan",
                "lingkarKepala",
            ],
            where: {
                bayiId: idBayi,
                tanggalPemeriksaan: {
                    [Op.between]: [
                        new Date(search, 0, 1),
                        new Date(search, 11, 31),
                    ],
                },
            },
        });
        res.status(200).json({
            response: response,
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const muatDataImunisasi = async (req, res) => {
    const idBayi = parseInt(req.query.idBayi) || 0;
    try {
        const response = await PerkembanganBayiBalita.findAll({
            attributes: ["imunisasi"],
            where: {
                bayiId: idBayi,
            },
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const muatSemuaPerkembanganBayiBalita = async (req, res) => {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search_query || "";
    const offset = limit * page;
    const totalRows = await PerkembanganBayiBalita.count({
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
        const response = await PerkembanganBayiBalita.findAll({
            attributes: [
                [
                    db.fn(
                        "DATE_FORMAT",
                        db.col("tanggalPemeriksaan"),
                        "%d/%m/%Y"
                    ),
                    "tanggalPemeriksaanBaru",
                ],
                [
                    db.fn("DATE_FORMAT", db.col("tanggalPemeriksaan"), "%Y"),
                    "tahunPemeriksaan",
                ],
                [
                    db.fn("DATE_FORMAT", db.col("tanggalPemeriksaan"), "%M"),
                    "bulanPemeriksaan",
                ],
                "id",
                "bayiId",
                "nama",
                "tanggalPemeriksaan",
                "beratBadan",
                "tinggiBadan",
                "lingkarKepala",
                "imunisasi",
                "vitaminA",
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

export const muatPerkembanganBayiBalitaIbu = async (req, res) => {
    try {
        const response = await Akun.findAll({
            attributes: [],
            where: {
                noHp: req.params.noHp,
            },
            include: [
                {
                    model: Ibu,
                    attributes: ["nama"],
                    include: [
                        {
                            model: BayiBalita,
                            attributes: ["nama", "tanggalLahir", "id"],
                        },
                    ],
                },
            ],
        });
        if (!response)
            return res
                .status(404)
                .json({ msg: "Data perkembangan bayi/balita tidak ditemukan" });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const muatPerkembanganBayiBalita = async (req, res) => {
    try {
        const response = await PerkembanganBayiBalita.findOne({
            attributes: [
                "id",
                "bayiId",
                "nama",
                "tanggalPemeriksaan",
                "beratBadan",
                "tinggiBadan",
                "lingkarKepala",
                "imunisasi",
                "vitaminA",
            ],
            where: {
                id: req.params.id,
            },
        });
        if (!response)
            return res
                .status(404)
                .json({ msg: "Data perkembangan bayi/balita tidak ditemukan" });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const simpanPerkembanganBayiBalita = async (req, res) => {
    const {
        id,
        bayiId,
        nama,
        tanggalPemeriksaan,
        beratBadan,
        tinggiBadan,
        lingkarKepala,
        imunisasi,
        vitaminA,
    } = req.body;

    const resBayi = await BayiBalita.findOne({
        where: {
            id: bayiId,
        },
    });
    if (!resBayi)
        return res.status(400).json({ msg: "ID bayi tidak ditemukan" });

    try {
        await PerkembanganBayiBalita.create({
            id: id,
            bayiId: bayiId,
            nama: nama,
            tanggalPemeriksaan: tanggalPemeriksaan,
            beratBadan: beratBadan,
            tinggiBadan: tinggiBadan,
            lingkarKepala: lingkarKepala,
            imunisasi: imunisasi,
            vitaminA: vitaminA,
        });
        res.status(201).json({
            msg: "Data perkembangan Bayi/Balita berhasil dibuat",
        });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const updatePerkembanganBayiBalita = async (req, res) => {
    const perkembangan = await PerkembanganBayiBalita.findOne({
        where: {
            id: req.params.id,
        },
    });
    if (!perkembangan)
        return res.status(404).json({ msg: "Data perkembangan tidak ada" });
    const {
        bayiId,
        nama,
        tanggalPemeriksaan,
        beratBadan,
        tinggiBadan,
        lingkarKepala,
        imunisasi,
        vitaminA,
    } = req.body;

    const idBayi = await BayiBalita.findOne({
        where: {
            id: bayiId,
        },
    });
    if (!idBayi)
        return res.status(404).json({ msg: "ID bayi/balita tidak ditemukan" });

    try {
        await PerkembanganBayiBalita.update(
            {
                bayiId: bayiId,
                nama: nama,
                tanggalPemeriksaan: tanggalPemeriksaan,
                beratBadan: beratBadan,
                tinggiBadan: tinggiBadan,
                lingkarKepala: lingkarKepala,
                imunisasi: imunisasi,
                vitaminA: vitaminA,
            },
            {
                where: {
                    id: perkembangan.id,
                },
            }
        );
        res.status(200).json({
            msg: "Data perkembangan bayi/balita berhasil diubah",
        });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const hapusPerkembanganBayiBalita = async (req, res) => {
    const perkembangan = await PerkembanganBayiBalita.findOne({
        where: {
            id: req.params.id,
        },
    });
    if (!perkembangan)
        return res.status(404).json({ msg: "Data perkembangan tidak ada" });
    try {
        await PerkembanganBayiBalita.destroy({
            where: {
                id: perkembangan.id,
            },
        });
        res.status(200).json({ msg: "Data perkembangan berhasil dihapus" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};
