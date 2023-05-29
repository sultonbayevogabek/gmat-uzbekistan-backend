import { join } from 'path';
import { readdir } from 'fs';
import express from 'express';
import cors from 'cors';
import { PORT } from './config.js';

const db = require('./modules/db.js')
const {user} = require('./middlewares/auth.middleware')
const app = express()

app.use(express.static(join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(async (req, res, next) => {
   req.db = await db()
   next()
})

app.use(user)

readdir(join(__dirname, 'routes'), (err, files) => {
   files.forEach(file => {
      const router = import(join(__dirname, 'routes', file))
      app.use(router.route, router.router)
   })
})

app.listen(PORT, () => {
   console.log('SERVER RUNNING AT: http://localhost' + PORT)
})

