import dotenv from 'dotenv'
dotenv.config({ path: './config.env' })
export default {
    PORT: process.env.PORT,
    DB_CONNECTION_STRING: 'postgres://bkzmtcho:GITOuzOr2YyeWNlAxj3DxE-VZhwwHDyl@kashin.db.elephantsql.com/bkzmtcho'
};
