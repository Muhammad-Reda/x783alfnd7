import Ibu from "../models/IbuModels.js";
import Akun from "../models/AkunModel.js";
import db from "../config/Database.js";
import { Op } from "sequelize";
import sequelize from "sequelize";
import BayiBalita from "../models/BayiBalitaModel.js";

export const muatSemuaIbu = async (req, res) => {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search_query || "";
    const offset = limit * page;
    const totalRows = await Ibu.count({
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
        const response = await Ibu.findAll({
            attributes: [
                [
                    db.fn("DATE_FORMAT", db.col("tanggalLahir"), "%d/%m/%Y"),
                    "tanggalLahirBaru",
                ],
                "nik",
                "nama",
                "tempatLahir",
                "tanggalLahir",
                "alamat",
                "rt",
                "rw",
                "agama",
                "jumlahAnak",
                "akunNoHp",
                [
                    sequelize.literal(
                        `(SELECT COUNT(*) FROM bayi WHERE ibuNik = ibu.nik)`
                    ),
                    "jumlahBayi",
                ],
            ],
            include: [
                {
                    model: BayiBalita,
                    attributes: [],
                    required: false,
                },
            ],
            group: ["ibu.nik"],
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
        console.error("nihhhhhhhh" + error);
        res.status(500).json({ msg: error.message });
    }
};

export const muatIbu = async (req, res) => {
    try {
        const response = await Ibu.findOne({
            attributes: [
                [
                    db.fn("DATE_FORMAT", db.col("tanggalLahir"), "%d/%m/%Y"),
                    "tanggalLahirBaru",
                ],
                "nik",
                "nama",
                "tempatLahir",
                "tanggalLahir",
                "alamat",
                "rt",
                "rw",
                "agama",
                "jumlahAnak",
                "akunNoHp",
            ],
            where: {
                nik: req.params.nik,
            },
        });
        if (!response)
            return res.status(404).json({ msg: "Data ibu tidak ditemukan" });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const simpanIbu = async (req, res) => {
    const {
        nik,
        nama,
        tempatLahir,
        tanggalLahir,
        alamat,
        rt,
        rw,
        agama,
        jumlahAnak,
        akunNoHp,
    } = req.body;
    const response = await Ibu.findOne({
        where: {
            nik: nik,
        },
    });
    if (response) return res.status(400).json({ msg: "Data ibu sudah ada" });
    const noHp = await Ibu.findOne({
        where: {
            akunNoHp: akunNoHp,
        },
    });
    if (noHp) return res.status(400).json({ msg: "No Hp sudah terdaftar" });
    const resAkun = await Akun.findOne({
        where: {
            noHp: akunNoHp,
        },
    });
    if (!resAkun)
        return res.status(400).json({ msg: "No Hp tidak ada di data akun" });

    try {
        await Ibu.create({
            nik: nik,
            nama: nama,
            tempatLahir: tempatLahir,
            tanggalLahir: tanggalLahir,
            alamat: alamat,
            rt: rt,
            rw: rw,
            agama: agama,
            jumlahAnak: jumlahAnak,
            akunNoHp: akunNoHp,
        });
        res.status(201).json({ msg: "Data ibu berhasil dibuat" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const updateIbu = async (req, res) => {
    const ibu = await Ibu.findOne({
        where: {
            nik: req.params.nik,
        },
    });
    if (!ibu) return res.status(404).json({ msg: "Data ibu tidak ada" });
    const {
        nama,
        tempatLahir,
        tanggalLahir,
        alamat,
        rt,
        rw,
        agama,
        jumlahAnak,
        akunNoHp,
    } = req.body;

    const noHp = await Akun.findOne({
        where: {
            noHp: akunNoHp,
        },
    });
    if (!noHp) return res.status(404).json({ msg: "No HP tidak terdaftar" });

    try {
        await Ibu.update(
            {
                nama: nama,
                tempatLahir: tempatLahir,
                tanggalLahir: tanggalLahir,
                alamat: alamat,
                rt: rt,
                rw: rw,
                agama: agama,
                jumlahAnak: jumlahAnak,
                akunNoHp: akunNoHp,
            },
            {
                where: {
                    nik: ibu.nik,
                },
            }
        );
        res.status(200).json({ msg: "Data ibu berhasil diubah" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const hapusIbu = async (req, res) => {
    const ibu = await Ibu.findOne({
        where: {
            nik: req.params.nik,
        },
    });
    if (!ibu) return res.status(404).json({ msg: "Data ibu tidak ada" });
    try {
        await Ibu.destroy({
            where: {
                nik: ibu.nik,
            },
        });
        res.status(200).json({ msg: "Data ibu berhasil dihapus" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};
