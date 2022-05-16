import DBConnection from "./db"
import IStorer from "./IStorer"


class ImageStorer implements IStorer {
    _dbConnection: typeof DBConnection

    constructor(connection: typeof DBConnection) {
        this._dbConnection = connection
    }

    create(file:Buffer) {
        return this._dbConnection.pool.query(`CALL sproc_create_image(?)`, file, (err, result, fields) => {
            if (err) {
                return console.log("ERROR:", err)
            }
            console.log(result, fields)
        })
    }
    read(): boolean {
        throw new Error("Method not implemented.");
    }
    update(): boolean {
        throw new Error("Method not implemented.");
    }
    delete(): boolean {
        throw new Error("Method not implemented.");
    }
}

const instance = new ImageStorer(DBConnection)
export default instance