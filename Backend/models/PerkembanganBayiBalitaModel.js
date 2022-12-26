import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import BayiBalita from "./BayiBalitaModel.js";

const { DataTypes } = Sequelize;

const PerkembanganBayiBalita = db.define(
    "perkembangan_bayi_balita",
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
        nama: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Nama bayi/balita tidak boleh kosong",
                },
            },
        },
        tanggalPemeriksaan: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Tanggal pemeriksaan tidak boleh kosong",
                },
            },
        },
        beratBadan: {
            type: DataTypes.DECIMAL(4, 2),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Berat badan tidak boleh kosong",
                },
            },
        },
        tinggiBadan: {
            type: DataTypes.DECIMAL(4, 2),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Tinggi badan tidak boleh kosong",
                },
            },
        },
        lingkarKepala: {
            type: DataTypes.DECIMAL(4, 2),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Lingkar kepala tidak boleh kosong",
                },
            },
        },
        imunisasi: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Imunisasi tidak boleh kosong",
                },
            },
        },
        vitaminA: {
            type: DataTypes.STRING(5),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Vitamin A tidak boleh kosong",
                },
            },
        },
    },
    {
        freezeTableName: true,
    }
);

BayiBalita.hasMany(PerkembanganBayiBalita, {
    onDelete: "SET NULL",
});
PerkembanganBayiBalita.belongsTo(BayiBalita, {});

export default PerkembanganBayiBalita;
