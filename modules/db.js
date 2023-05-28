import { Sequelize } from 'sequelize'
import { DB_CONNECTION_STRING } from '../config.js'

const sequelize = new Sequelize(DB_CONNECTION_STRING, {
   logging: true
})

export default async function () {
   try {
      const db = {}

      db.users = await require('../models/user-model')(Sequelize, sequelize)

      await db.users.hasMany(db.messages, {
         foreignKey: {
            name: 'userId',
            allowNull: false
         }
      })

      await sequelize.sync({ force: false })

      return db
   } catch (e) {
      console.log(e + "")
   }
}