import { useCallback } from 'react'
import Image from 'react-bootstrap/Image'
import classNames from 'classnames'
import { useDropzone } from 'react-dropzone'
import imgDrop from '../assets/images/drop.gif'

const UploadMeme = () => {
    // Drop it like it's hot 🔥
    const onDrop = useCallback((acceptedFiles: File[]) => {
        console.log("🎤:", acceptedFiles)
    }, [])

    const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
        maxFiles: 1,
        maxSize: 4 * 1024 * 1024, // 4mb
        onDrop: onDrop,
    })

    const dropzoneWrapperClasses = classNames({
        "drag-accept": isDragAccept,
        "drag-reject": isDragReject
    })

    return (
        <div {...getRootProps()} id="dropzone-wrapper" className={dropzoneWrapperClasses}>
            <input {...getInputProps()} />

            <div className="indicator">
                {isDragActive
                    ? <Image
                        src={imgDrop}
                        alt="Drop your files here"
                        title="Drop it like it's hawt!"
                        fluid />
                    : <p>All Your Memes Are Belong To Me</p>}
            </div>
        </div>
    )
}

export default UploadMeme
