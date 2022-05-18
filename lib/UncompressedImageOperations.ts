let operations = {
    create: 'INSERT INTO images_uncompressed(id, file) VALUES (null,?)',
    read: '',
    readAll: 'SELECT * FROM images_uncompressed',
    update: '',
    delete: 'CALL sproc_delete_uncompressed_image(?)' 
}

export default operations;