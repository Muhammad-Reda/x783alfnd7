import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Ibu from "./IbuModels.js";

const { DataTypes } = Sequelize;

const BayiBalita = db.define(
    "bayi",
    {
        id: {
            type: DataTypes.BIGINT(13),
            allowNull: false,
            primaryKey: true,
            validate: {
                len: {
                    args: 13,
                    msg: "ID Bayi harus terdiri dari 13 digit angka",
                },
            },
        },
        nama: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Nama tidak boleh kosong",
                },
            },
        },
        tempatLahir: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Tempat lahir tidak boleh kosong",
                },
            },
        },
        tanggalLahir: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Tanggal lahir tidak boleh kosong",
                },
            },
        },
        jenisKelamin: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Jenis kelamin tidak boleh kosong",
                },
            },
        },
        beratLahir: {
            type: DataTypes.DECIMAL(4, 2),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Berat lahir tidak boleh kosong",
                },
            },
        },
        panjangLahir: {
            type: DataTypes.DECIMAL(4, 2),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Panjang lahir tidak boleh kosong",
                },
            },
        },
        kondisiPersalinan: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Kondisi persalinan tidak boleh kosong",
                },
            },
        },
        anakKe: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: {
                    args: [1, 2],
                    msg: "Anak ke- tidak boleh kosong",
                },
            },
        },
    },
    {
        freezeTableName: true,
    }
);

Ibu.hasMany(BayiBalita, {
    onDelete: "SET NULL",
});
BayiBalita.belongsTo(Ibu, {});

export default BayiBalita;
