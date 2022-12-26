import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Akun from "./AkunModel.js";

const { DataTypes } = Sequelize;

const KaderBidan = db.define(
    "kader_bidan",
    {
        nik: {
            type: DataTypes.BIGINT(11),
            allowNull: false,
            primaryKey: true,
            validate: {
                len: {
                    args: 11,
                    msg: "Nik harus 11 digit",
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
                    mag: "Tanggal lahir tidak boleh kosong",
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
        agama: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Agama tidak boleh kosong",
                },
            },
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Status tidak boleh kosong",
                },
            },
        },
        jabatan: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        periodeKerjaMulai: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Periode kerja mulai tidak boleh kosong",
                },
            },
        },
        periodeKerjaBerakhir: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Periode kerja berakhir tidak boleh kosong",
                },
            },
        },
    },
    {
        freezeTableName: true,
    }
);

export default KaderBidan;
