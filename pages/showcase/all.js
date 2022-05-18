import UploadContainer from '../../components/image-upload/upload-container';
import Image from 'next/image'


function All({ image }) {
   return (
      <>
         <img src={`data:image/webp;base64,${image}`}/>
      </>
   )
}

import DatabaseProxy from '../../lib/DatabaseProxy'
import UncompressedImageOperations from '../../lib/UncompressedImageOperations'
import { Blob } from "buffer"
export async function getStaticProps() {

   let image = await DatabaseProxy.execute(UncompressedImageOperations.readAll, null)
   image = image[0][0].file.toString('base64')
   return {
      props: {
         image
      },
      revalidate: 3600,
   }
}

export default All
