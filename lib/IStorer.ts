export default interface IStoreable {
    create(data:Buffer): Promise<any>,
    read(): boolean,
    update():boolean,
    delete():boolean,
}