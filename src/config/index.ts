import pg from 'pg'
import dotenv from 'dotenv'
dotenv.config()
const pool = new pg.Pool(
    {
        user:'postgres' as string,
        password:'123@samuel.' as string,
        database:'stack' as string,
        host:'localhost' as string,
        port:5433
    }
)

console.log('Here');



export default pool