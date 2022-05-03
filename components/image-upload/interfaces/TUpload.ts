import React, { ChangeEvent } from 'react'
type TUpload = {
    file: File,
    url: string,
    progress: number,
    removeSelf: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export default TUpload