import db from "../config/Database.js";
import Users from "./UserModel.js";
import { Sequelize } from "sequelize";

const {DataTypes} = Sequelize;

const DataPasien = db.define('datapasien',{
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    fasilitas:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    data:{
        type: DataTypes.JSON,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    namaDokter:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    tanggalDatang:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    jamDatang:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    }
},{
    freezeTableName: true
});

Users.hasMany(DataPasien);
DataPasien.belongsTo(Users, {foreignKey: 'userId'});

export default DataPasien;

