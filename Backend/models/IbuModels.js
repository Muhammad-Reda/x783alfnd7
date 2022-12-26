import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Akun from "./AkunModel.js";

const { DataTypes } = Sequelize;

const Ibu = db.define(
    "ibu",
    {
        nik: {
            type: DataTypes.BIGINT(11),
            allowNull: false,
            primaryKey: true,
            validate: {
                len: {
                    args: 11,
                    msg: "Nik harus terdiri dari 11 digit angka",
                },
            },
        },
        nama: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Nama tidak bolehk kosong",
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
        alamat: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Alamat tidak boleh kosong",
                },
            },
        },
        rt: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "RT tidak boleh kosong",
                },
            },
        },
        rw: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "RW tidak boleh kosong",
                },
            },
        },
        agama: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Agama tidak boleh kosong",
                },
            },
        },
        jumlahAnak: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: {
                    args: [1, 2],
                    msg: "Jumlah anak tidak boleh kosong",
                },
            },
        },
    },
    {
        freezeTableName: true,
    }
);

export default Ibu;
