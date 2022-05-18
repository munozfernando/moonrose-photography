import mysql from 'mysql2'

const connectionPool =  mysql.createPool({
    host: process.env.DB_DOMAIN,
    user: process.env.DB_USERNAME,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number.parseInt(process.env.DB_PORT),
    waitForConnections: true,
    connectionLimit: 100,
    queueLimit: 0
}).promise()


class DBConnection {
    _connectionPool

    constructor(connectionPool:any){
        this._connectionPool = connectionPool
    }

    public get pool(){
        return this._connectionPool
    }
}

export default new DBConnection(connectionPool)
