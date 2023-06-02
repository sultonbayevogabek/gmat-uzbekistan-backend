import {Sequelize, DataTypes} from 'sequelize'
import config from "../config.js";
import { flatten } from 'express/lib/utils.js';

const sequelize = new Sequelize(config.DB_CONNECTION_STRING, {
    logging: false
})

export const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(32),
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING(13),
        is: /^\+998[0-9]{9}$/,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(64),
        allowNull: false
    },
    role: {
        type: DataTypes.STRING(5),
        isIn: [['user', 'premium-user', 'admin']],
        defaultValue: 'user'
    },
    avatar: {
        type: DataTypes.STRING(30),
        allowNull: true
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

(async () => {
    await sequelize.sync({ force: false })
})()
