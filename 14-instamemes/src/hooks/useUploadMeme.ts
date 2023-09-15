import { ref } from 'firebase/storage'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { storage } from '../services/firebase'

const useUploadMeme = () => {
    // error
    // isError
    // isSuccess
    // usUploading
    // progress

	const upload = async (image: File) => {
        // reset internal state
        
		try {
			// generate a uuid for the file
			const uuid = uuidv4()

			// find file extension
			const ext = image.name.substring(image.name.lastIndexOf(".") + 1) // "png"

            // construct filename to save image as 
            const storageFilename = `${uuid}.${ext}` // "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d.png"

            // create reference to storage
            const storageRef = ref(storage, `memes/${storageFilename}`) 
            // "memes/9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d.png"

            // start upload of image 

            // attach upload observer 

            // wait upload to complete

            // get download url to uploaded image 

            // create reference to db-collection "memes"

            // create document in db for the uploaded image 

            // toast


		} catch (err) {
			console.log("Something went wrong with the upload", err)
		}
	}


	return {
		upload,
	}
}

export default useUploadMeme
