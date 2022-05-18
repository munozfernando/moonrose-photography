import sharp from 'sharp'

//Size will be as follows
// Get primary axis (the widest one)
// Check if undex x amount
//      yes: compute only lesser resolutions
//      no: compute all resolutions
// Sizes will be: thumbnail, 500, 1000, full res 

const THUMBNAIL = 250,
    SMALL = 500,
    MEDIUM = 1000,
    LARGE = 2000

interface ComputedSizes {
    thumbnail: Number,
    small: Number,
    medium: Number,
    large: Number
}

// Compute sizes such that the max size does not exceed the image's original size
function computeSizes(primaryAxisSize: Number): ComputedSizes {
    let sizes = {
        thumbnail: primaryAxisSize,
        small: primaryAxisSize,
        medium: primaryAxisSize,
        large: primaryAxisSize
    }

    if (primaryAxisSize > THUMBNAIL) sizes.thumbnail = THUMBNAIL
    if (primaryAxisSize > SMALL) sizes.small = SMALL
    if (primaryAxisSize > MEDIUM) sizes.medium = MEDIUM
    if (primaryAxisSize > LARGE) sizes.large = LARGE
    //console.log("Sizes", JSON.stringify(sizes, null, 2));
    return sizes
}

export default function generateFiles(imgBuffer: Buffer, callback: Function): void {
    if (!Buffer.isBuffer(imgBuffer)) throw new Error('Argument must be of type buffer')

    const rawImage = sharp(imgBuffer)

    rawImage
        .metadata()
        .then(metadata => {
            
            const defaultResizer = (axisName:string, size:Number):Buffer => {
                //console.log("Resizing now to", size )
                return rawImage
                    .resize({ [axisName]: size })
                    .jpeg({ quality: 100, chromaSubsampling: '4:4:4' })
                    .toBuffer()
            }

            // Where primary axis is the larger of the two axes and and is either 'width' or 'length'
            let primaryAxisName: string = metadata.width > metadata.height ? 'width' : 'height'
            let targetSizes = computeSizes(metadata[primaryAxisName]);

            let resizedImagePromises = [
                defaultResizer(primaryAxisName, targetSizes.large),
                defaultResizer(primaryAxisName, targetSizes.medium),
                defaultResizer(primaryAxisName, targetSizes.small),
                defaultResizer(primaryAxisName, targetSizes.thumbnail)
            ]
            return Promise.all(resizedImagePromises)
        })
        .then(resizedImages => {
            // console.log(`Resizing of ${resizedImages.length} images complete`)
            // console.log("Original byte size:", imgBuffer.length)
            // resizedImages.forEach(element => {
            //     console.log("New byte size:", element.length)
            // });
            callback(resizedImages)
        })
        .catch(err => console.log("Something went wrong when resizing the images:", err))
}

