// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { IncomingForm } from 'formidable'

export const config = {
  api: {
    bodyParser: false,
  }
};

export default async (req, res) => {
  return new Promise(resolve => {
    if (req.method.toLowerCase() === 'post') {
      let form = new IncomingForm();
      let fields = [], files = [];

      form.on('field', function (field, value) {
        //fields.push([field, value]);
      });
      form.on('file', function (field, file) {
        console.log("file received");
        //files.push([field, file]);
      });
      form.on('error', () => {
        res.writeHead(400);
        res.end();
        console.error;
        return resolve()
      });

      form.parse(req, () => {
        res.writeHead(201);
        res.end();
        return resolve();
      });
    } else {
      res.status(405);
      res.end();
      return resolve()
    } 
  })
}
