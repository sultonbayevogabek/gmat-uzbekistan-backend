import { Sequelize, DataTypes } from 'sequelize'

const sequelize = new Sequelize()

const User = sequelize.define('User', {
      id: {
         type: Sequelize.DataTypes.UUID,
         defaultValue: Sequelize.DataTypes.UUIDV4,
         primaryKey: true
      },
      name: {
         type: Sequelize.DataTypes.STRING(64),
         allowNull: false
      },
      phone: {
         type: Sequelize.DataTypes.STRING(9),
         allowNull: false
      },
      password: {
         type: Sequelize.DataTypes.STRING(64),
         allowNull: false
      },
      role: {
         type: Sequelize.DataTypes.STRING(5),
         isIn: [['user', 'admin']],
         defaultValue: 'user'
      },
      avatar: {
         type: Sequelize.DataTypes.STRING,
         allowNull: false
      }
})

(async ()  => {
   await sequelize.sync({ force: true })
})()
