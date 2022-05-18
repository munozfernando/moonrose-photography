// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import formidable from 'formidable'
import { Writable } from 'node:stream'
import DatabaseProxy from '../../lib/DatabaseProxy'
import UncompressedImageOperations from '../../lib/UncompressedImageOperations'
import resizer from '../../lib/image-util/resizer'


// Needed for NextJS API endpoint
export const config = {
  api: {
    bodyParser: false,
  }
};


// Bypass default behavior of writing to local filesystem
class FileWriteStream extends Writable {
  file = []
  _write(chunk, enc, next) {
    this.file.push(chunk)
    next()
  }
  // Send to database when we are done receiving the file
  // TODO: implement file checksum verification
  _final(callback) {
    resizer(Buffer.concat(this.file), (resizedImages) => {
      resizedImages.forEach( ri => {
        DatabaseProxy.execute(UncompressedImageOperations.create, ri).then(thing => console.log("Done uploading image of size", ri.length))
      })
      callback()
    })
  }

  _destroy(err, callback) {
    console.log("Destroying writestream")
    callback(err)
  }
}
// TODO: change the structure of these calls to only return when the database is done being written
export default async function (req, res) {
  if (req.method.toLowerCase() === 'post') {
    const form = formidable({
      fileWriteStreamHandler: () => new FileWriteStream()
    });
    //console.log("Im written before the promise")
    await new Promise((resolve, reject) => {
      const success = (callback) => {
        //console.log("Now resolving promise")
        res.writeHead(201)
        res.end()
        callback(true)
      }

      const failure = (callback) => {
        //console.log("Now rejecting promise")
        res.writeHead(400)
        res.end()
        console.error
        callback(false)
      }

      form.parse(req, success(resolve))
      form.on('error', failure(reject))
    })
    //console.log("Im written after the promise")
  } else {
    // Only allow http POST
    res.status(405);
    res.end();
  }
}
