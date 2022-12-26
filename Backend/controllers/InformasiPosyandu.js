import InformasiPosyandu from "../models/InformasiPosyanduModel.js";
import db from "../config/Database.js";

export const muatSemuaInformasiPosyandu = async (req, res) => {
    try {
        const response = await InformasiPosyandu.findAll({
            attributes: [
                [
                    db.fn(
                        "DATE_FORMAT",
                        db.col("tanggalMulai"),
                        "%d-%m-%Y %H:%i:%s"
                    ),
                    "tanggalMulaiBaru",
                ],
                [
                    db.fn(
                        "DATE_FORMAT",
                        db.col("tanggalSelesai"),
                        "%d-%m-%Y %H:%i:%s"
                    ),
                    "tanggalSelesaiBaru",
                ],
                "id",
                "tanggalMulai",
                "tanggalSelesai",
                "berita",
            ],
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const muatInformasiPosyadu = async (req, res) => {
    try {
        const response = await InformasiPosyandu.findOne(
            {
                attributes: [
                    [
                        db.fn(
                            "DATE_FORMAT",
                            db.col("tanggalMulai"),
                            "%m-%d-%Y %H:%i:%s"
                        ),
                        "tanggalMulaiBaru",
                    ],
                    [
                        db.fn(
                            "DATE_FORMAT",
                            db.col("tanggalSelesai"),
                            "%d-%m-%Y %H:%i:%s"
                        ),
                        "tanggalSelesaiBaru",
                    ],
                    "tanggalMulai",
                    "tanggalSelesai",
                    "berita",
                ],
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const updateInformasiPosyandu = async (req, res) => {
    const { tanggalMulai, tanggalSelesai, berita } = req.body;

    try {
        await InformasiPosyandu.update(
            {
                tanggalMulai: db.fn(
                    "DATE_FORMAT",
                    tanggalMulai,
                    "%Y-%m-%d %H:%i:%s"
                ),
                tanggalSelesai: db.fn(
                    "DATE_FORMAT",
                    tanggalSelesai,
                    "%Y-%m-%d %H:%i:%s"
                ),
                berita: berita,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );
        res.status(200).json({ msg: "Informasi Posyandu berhasil diubah" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};
