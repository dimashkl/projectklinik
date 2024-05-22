import {Sequelize} from "sequelize";
import db from "../config/Database.js"
import Users from "./UserModel.js";

const {DataTypes} = Sequelize;

const ProfileFaskes = db.define('profilefaskes',{
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull:false,
        validate:{
            notEmpty: true
        }
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 100]
        }
    },
    image:{
        type: DataTypes.STRING,
        allowNull: true,
        validate:{
            notEmpty: false,
        }
    },

    url:{
        type: DataTypes.STRING,
        allowNull: true,
        validate:{
            notEmpty: false,
        }
    },
    
    deskripsiklinik:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    jenisFaskes:{
        type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true,
            }
    },
    /*hariOperasionalSatu:{
        type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true,
            }
    },
    jamBukaSatu:{
        type: DataTypes.TIME,
            allowNull: false,
            validate:{
                notEmpty: true,
            }
    },
    jamTutupSatu:{
        type: DataTypes.TIME,
            allowNull: false,
            validate:{
                notEmpty: true,
            }
    },
    hariOperasionalDua:{
        type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true,
            }
    },
    jamBukaDua:{
        type: DataTypes.TIME,
            allowNull: false,
            validate:{
                notEmpty: true,
            }
    },
    jamTutupDua:{
        type: DataTypes.TIME,
            allowNull: false,
            validate:{
                notEmpty: true,
            }
    },*/
    address:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    kelurahan:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    kecamatan:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    kota:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    provinsi:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    days:{
        type: DataTypes.JSON,
    },
    phone:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            isEmail: true
            }
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },

},{
    freezeTableName: true
});

Users.hasOne(ProfileFaskes);
ProfileFaskes.belongsTo(Users, {foreignKey: 'userId'});

export default ProfileFaskes;