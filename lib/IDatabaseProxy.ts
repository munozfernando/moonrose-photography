export default interface IDatabaseProxy {
    execute(operation: string, value: Number | Buffer | null):Promise<any>
}