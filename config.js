import dotenv from 'dotenv';
dotenv.config({ path: './config.env' })

exports = {
   PORT: process.env.PORT,
   SECRET_WORD: process.env.SECRET_WORD,
   DB_CONNECTION_STRING: process.env.PG_CONNECTION_STRING
}
