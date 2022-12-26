import Ibu from "../models/IbuModels.js";
import BayiBalita from "../models/BayiBalitaModel.js";
import { Op } from "sequelize";

export const muatSemuaInformasiPerkembanganBayiBalita = async (req, res) => {
    const search = req.query.search_query || "";
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
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || totalRows;
    const offset = limit * page;

    const totalPage = Math.ceil(totalRows / limit);

    try {
        const response = await BayiBalita.findAll({
            attributes: ["id", "nama", "tanggalLahir"],
            include: [
                {
                    model: Ibu,
                    as: "ibu",
                    attributes: ["nama"],
                },
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
            order: [["id", "ASC"]],
        });

        if (!response)
            return res
                .status(404)
                .json({ msg: "Informasi bayi/balita tidak ditemukan" });
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

export const muatSemuaInformasiPerkembanganBayiBalitaIbu = async (req, res) => {
    const ibuNik = req.query.nik || 0;

    try {
        const response = await BayiBalita.findAll({
            attributes: ["id", "nama", "tanggalLahir"],
            where: {
                ibuNik: ibuNik,
            },
            include: [
                {
                    model: Ibu,
                    as: "ibu",
                    attributes: ["nama"],
                },
            ],

            order: [["nama", "ASC"]],
        });

        if (!response)
            return res
                .status(404)
                .json({ msg: "Informasi bayi/balita tidak ditemukan" });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
