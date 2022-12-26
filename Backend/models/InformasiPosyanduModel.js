import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const InformasiPosyandu = db.define(
    "informasi_posyandu",
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            validate: {
                notEmpty: {
                    msg: "ID tidak boleh kosong",
                },
            },
        },
        tanggalMulai: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Tanggal mulai tidak boleh kosong",
                },
            },
        },
        tanggalSelesai: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Tanggal selesai tidak boleh kosong",
                },
            },
        },
        berita: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        freezeTableName: true,
    }
);

export default InformasiPosyandu;
