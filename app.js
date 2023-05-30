import { readdir } from 'fs'
import express from 'express'
import config from './config.js'
import cors from 'cors'
import { Sequelize } from 'sequelize';

const app = express()

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

const sequelize = new Sequelize(config.DB_CONNECTION_STRING, {
   logging: (...msg) => console.log(msg)
})

try {
   await sequelize.authenticate();
   console.log('Connection has been established successfully.');
} catch (error) {
   console.error('Unable to connect to the database:', error);
}
// app.use(async (req, _, next) => {
//    req.db = await db()
//    next()
// })

readdir('routes', (err, files) => {
   files.forEach(async file => {
      const routing = (await import('./routes/' + file)).default
      app.use(routing.route, routing.router)
   })
})

app.listen(config.PORT, () => {
   console.log('SERVER RUNNING ON: http://localhost:' + config.PORT)
})
