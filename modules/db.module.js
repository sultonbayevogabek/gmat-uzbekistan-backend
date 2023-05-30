import { Sequelize } from 'sequelize';
import config from '../config.js'

const sequelize = new Sequelize(config.DB_CONNECTION_STRING, {
   logging: (...msg) => console.log(msg)
})


export default async function () {
   const db = {}

   db.users = await import('../models/models.js')

   console.log(db)

   await sequelize.sync({ force: true })

   return db
}
