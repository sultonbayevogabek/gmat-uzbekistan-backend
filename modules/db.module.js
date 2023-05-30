import { Sequelize } from 'sequelize';
import config from '../config.js'

const sequelize = new Sequelize(config.DB_CONNECTION_STRING, {
   logging: (...msg) => console.log(msg)
})

export default async () => {
   const db = {}

   db.users = (await import('../models/user.model.js'))(Sequelize, sequelize)

   await sequelize.sync({ force: true })

   return db
}
