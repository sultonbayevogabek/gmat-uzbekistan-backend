import { Sequelize, DataTypes } from 'sequelize';
import config from '../config.js';

export const sequelize = new Sequelize(config.DB_CONNECTION_STRING, {
    logging: false
});

export const User = sequelize.define('user', {
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
        type: DataTypes.STRING(13),
        is: /^\+998[0-9]{9}$/,
        unique: true,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING(64),
        isEmail: true,
        unique: true,
        allowNull: true
    },
    password: {
        type: DataTypes.STRING(64),
        allowNull: true
    },
    role: {
        type: DataTypes.STRING(12),
        isIn: [ [ 'user', 'premium-user', 'admin' ] ],
        defaultValue: 'user'
    },
    avatar: {
        type: DataTypes.STRING(128),
        allowNull: true
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

export const Payment = sequelize.define('payment', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    paymentUserId: {
        type: DataTypes.UUID,
        allowNull: false,
        foreignKey: true
    },
    paymentScreenshot: {
        type: DataTypes.STRING(128),
        allowNull: false
    },
    seenTime: {
        type: DataTypes.DATE,
        allowNull: true
    }
});

export const Lesson = sequelize.define('lesson', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING(128),
        allowNull: false,
        foreignKey: true
    },
    description: {
        type: DataTypes.STRING(256),
        allowNull: false
    },
    duration: {
        type: DataTypes.STRING(16),
        allowNull: false,
        default: ''
    },
    videoId: {
        type: DataTypes.STRING(16),
        allowNull: false
    },
    unit: {
        type: DataTypes.STRING(16),
        allowNull: false
    },
    pdfFiles: {
        type: DataTypes.ARRAY(DataTypes.STRING(64)),
        allowNull: true
    },
    views: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

User.hasOne(Payment, { foreignKey: 'paymentUserId' });
Payment.belongsTo(User, { foreignKey: 'paymentUserId' });

(async () => {
    await sequelize.sync({ force: false });
})();
