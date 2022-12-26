import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Ibu from "./IbuModels.js";
import KaderBidan from "./KaderBidanModel.js";

const { DataTypes } = Sequelize;

const Akun = db.define(
    "akun",
    {
        noHp: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false,
            validate: {
                len: {
                    args: [5, 20],
                    msg: "No Hp harus memiliki panjang antara 5 hingga 20 digit",
                },
            },
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [3, 255],
                    msg: "Username harus memiliki panjang antara 3 hingga 255 karakter",
                },
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [8, 255],
                    msg: "password harus memiliki panjang antara 8 hingga 255 karakter",
                },
            },
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Mohon pilih status terlebih dahulu ",
                },
            },
        },
    },
    {
        freezeTableName: true,
    }
);

Akun.hasOne(Ibu, {
    onDelete: "SET NULL",
});
Ibu.belongsTo(Akun);

Akun.hasOne(KaderBidan, {
    onDelete: "SET NULL",
});
KaderBidan.belongsTo(Akun);

export default Akun;
