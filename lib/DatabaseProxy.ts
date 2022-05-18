import DBConnection from "./db"
import IDatabaseProxy from "./IDatabaseProxy"

class DatabaseProxy implements IDatabaseProxy {
    _dbConnection: typeof DBConnection

    constructor() {
        this._dbConnection = DBConnection
    }

    execute(operation: string, value = null) {
        if(!operation.length) return Promise.reject("operation string cannot be empty")
        return this._dbConnection.pool.query(operation, value, (err, result, fields) => {
            if (err) return console.log("ERROR:", err)
            console.log(result, fields)
        })
    }
}

export default new DatabaseProxy();