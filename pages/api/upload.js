// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import formidable from 'formidable'
import { Writable } from 'node:stream'
import ImageStorer from '../../lib/ImageStorer'

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

    _final(callback){
      ImageStorer.create(Buffer.concat(this.file))
      .then(result => {
        console.log("File uploaded successfully") 
        callback()
      })
      .catch(err => {
        console.log("Something went wrong", err)
        callback(err)
      })
    }

    _destroy(err, callback){
       callback(err) 
    }
  }

export default async (req, res) => {
  return new Promise(resolve => {
    if (req.method.toLowerCase() === 'post') {
      const form = formidable({
        fileWriteStreamHandler: () => new FileWriteStream()
      });

      form.on('error', () => {
        res.writeHead(400);
        res.end();
        console.error;
        return resolve()
      })

      form.parse(req, () => {
        res.writeHead(201);
        res.end();
        return resolve();
      })
    } else {
      // Only allow http POST
      res.status(405);
      res.end();
      return resolve()
    } 
  },
  reject => {})
}
