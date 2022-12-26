import KaderBidan from "../models/KaderBidanModel.js";
import Akun from "../models/AkunModel.js";
import { Op } from "sequelize";
import db from "../config/Database.js";

export const muatSemuaKaderBidan = async (req, res) => {
    const search = req.query.search_query || "";
    const totalRows = await KaderBidan.count({
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
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || totalRows;
    const offset = limit * page;
    const totalPage = Math.ceil(totalRows / limit);

    try {
        const response = await KaderBidan.findAll({
            attributes: [
                [
                    db.fn("DATE_FORMAT", db.col("tanggalLahir"), "%d/%m/%Y"),
                    "tanggalLahirBaru",
                ],
                [
                    db.fn(
                        "DATE_FORMAT",
                        db.col("periodeKerjaMulai"),
                        "%d/%m/%Y"
                    ),
                    "periodeKerjaMulaiBaru",
                ],
                [
                    db.fn(
                        "DATE_FORMAT",
                        db.col("periodeKerjaBerakhir"),
                        "%d/%m/%Y"
                    ),
                    "periodeKerjaBerakhirBaru",
                ],
                "nik",
                "nama",
                "tempatLahir",
                "tanggalLahir",
                "alamat",
                "agama",
                "status",
                "jabatan",
                "periodeKerjaMulai",
                "periodeKerjaBerakhir",
                "akunNoHp",
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

export const muatKaderBidan = async (req, res) => {
    try {
        const response = await KaderBidan.findOne({
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
                "agama",
                "status",
                "jabatan",
                "periodeKerjaMulai",
                "periodeKerjaBerakhir",
                "akunNoHp",
            ],
            where: {
                nik: req.params.nik,
            },
        });
        if (!response)
            return res.status(404).json({ msg: "Data tidak ditemukan" });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const simpanKaderBidan = async (req, res) => {
    const {
        nik,
        nama,
        tempatLahir,
        tanggalLahir,
        alamat,
        agama,
        status,
        jabatan,
        periodeKerjaMulai,
        periodeKerjaBerakhir,
        akunNoHp,
    } = req.body;
    const response = await KaderBidan.findOne({
        where: {
            nik: nik,
        },
    });
    if (response) return res.status(400).json({ msg: "NIK sudah digunakan" });

    const noHp = await KaderBidan.findOne({
        where: {
            akunNoHp: akunNoHp,
        },
    });
    if (noHp)
        return res
            .status(400)
            .json({ msg: "No Hp sudah dipakai oleh petugas lain" });
    const resKaderBidan = await Akun.findOne({
        where: {
            noHp: akunNoHp,
        },
    });
    if (!resKaderBidan)
        return res.status(400).json({ msg: "No Hp tidak ada di data akun" });
    try {
        await KaderBidan.create({
            nik: nik,
            nama: nama,
            tempatLahir: tempatLahir,
            tanggalLahir: tanggalLahir,
            alamat: alamat,
            agama: agama,
            status: status,
            jabatan: jabatan,
            periodeKerjaMulai: periodeKerjaMulai,
            periodeKerjaBerakhir: periodeKerjaBerakhir,
            akunNoHp: akunNoHp,
        });
        res.status(201).json({ msg: "Data Kader/Bidan berhasil dibuat" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const updateKaderBidan = async (req, res) => {
    const {
        nama,
        tempatLahir,
        tanggalLahir,
        alamat,
        agama,
        status,
        jabatan,
        periodeKerjaMulai,
        periodeKerjaBerakhir,
        akunNoHp,
    } = req.body;
    const kaderBidan = await KaderBidan.findOne({
        where: {
            nik: req.params.nik,
        },
    });
    if (!kaderBidan)
        return res.status(404).json({ msg: "Data Kader Bidan tidak ada" });
    const cariNoHp = await KaderBidan.findOne({
        where: {
            akunNoHp: akunNoHp,
        },
    });

    const cariNoHpAkun = await Akun.findOne({
        where: {
            noHp: akunNoHp,
        },
    });

    if (!cariNoHpAkun)
        return res.status(400).json({ msg: "Nomor Hp tidak terdaftar" });

    if (cariNoHp && cariNoHp.akunNoHp !== kaderBidan.akunNoHp)
        return res
            .status(400)
            .json({ msg: "Nomor Hp sudah dipakai oleh Kader lain" });

    try {
        await KaderBidan.update(
            {
                nama: nama,
                tempatLahir: tempatLahir,
                tanggalLahir: tanggalLahir,
                alamat: alamat,
                agama: agama,
                status: status,
                jabatan: jabatan,
                periodeKerjaMulai: periodeKerjaMulai,
                periodeKerjaBerakhir: periodeKerjaBerakhir,
                akunNoHp: akunNoHp,
            },
            {
                where: {
                    nik: kaderBidan.nik,
                },
            }
        );
        res.status(200).json({ msg: "Data Kader/Bidan berhasil diubah" });
    } catch (error) {
        res.status(400).json({
            msg: error.msg,
        });
    }
};

export const hapusKaderBidan = async (req, res) => {
    const kaderBidan = await KaderBidan.findOne({
        where: {
            nik: req.params.nik,
        },
    });
    if (!kaderBidan)
        return res.status(404).json({ msg: "Data Kader Bidan tidak ada" });
    try {
        await KaderBidan.destroy({
            where: {
                nik: kaderBidan.nik,
            },
        });
        res.status(200).json({ msg: "Data Kader Bidan berhasil dihapus" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};
