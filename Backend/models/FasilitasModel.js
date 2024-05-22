import {Sequelize} from "sequelize";
import db from "../config/Database.js"
import Users from "./UserModel.js";

const {DataTypes} = Sequelize;

const Fasilitas = db.define('fasilitas',{
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull:false,
        validate:{
            notEmpty: true
        }
    },
    namafasilitas:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    deskripsifasilitas:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },

},{
    freezeTableName: true
});

Users.hasMany(Fasilitas);
Fasilitas.belongsTo(Users, {foreignKey: 'userId'});

export default Fasilitas;