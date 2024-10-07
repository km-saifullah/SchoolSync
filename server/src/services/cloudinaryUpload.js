import { unlinkSync } from 'fs'
import { v2 as cloudinary } from 'cloudinary'
import apiResponse from 'quick-response'
import { cloudinaryApiKey } from '../config/index.js'

// Configuration for cloudinary
cloudinary.config({
  cloud_name: 'dmysnb0x5',
  api_key: '765869978321679',
  api_secret: cloudinaryApiKey,
})

const cloudinaryUpload = async (filePath, public_id, folder) => {
  let uploadResult

  try {
    // Upload an image
    uploadResult = await cloudinary.uploader.upload(filePath, {
      public_id,
      folder,
    })

    unlinkSync(filePath)
  } catch (error) {
    unlinkSync(filePath)
    return res
      .status(400)
      .json(apiResponse(400, 'upload failed', { uploadResult: null }))
  }

  // Optimize delivery by resizing and applying auto-format and auto-quality
  const optimizeUrl = cloudinary.url(uploadResult.public_id, {
    fetch_format: 'auto',
    quality: 'auto',
  })

  // Transform the image: auto-crop to square aspect_ratio
  const autoCropUrl = cloudinary.url(uploadResult.public_id, {
    crop: 'auto',
    gravity: 'auto',
    width: 500,
    height: 500,
  })

  return { uploadResult, optimizeUrl, autoCropUrl }
}

export default cloudinaryUpload
