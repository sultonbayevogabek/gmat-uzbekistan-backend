import {Sequelize, DataTypes} from 'sequelize'
import config from "../config.js";

const sequelize = new Sequelize(config.DB_CONNECTION_STRING, {
    logging: (...msg) => console.log(msg + '')
})

export const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(32),
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING(9),
        is: /^998([378]{2}|(9[013-57-9]))\d{7}$/,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(32),
        allowNull: false
    },
    role: {
        type: DataTypes.STRING(5),
        isIn: [['user', 'admin']],
        defaultValue: 'user'
    },
    avatar: {
        type: DataTypes.STRING(30),
        allowNull: true
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

(async () => {
    await sequelize.sync({ alter: false })
})()

export default { User }
