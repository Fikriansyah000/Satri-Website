import { Router } from 'express'
import multer from 'multer'
import { uploadToCloudinary, deleteFromCloudinary } from '../../lib/cloudinary'
import { asyncHandler, createError } from '../../middleware/error-handler'

const router = Router()

// Configure multer for memory storage
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true)
        } else {
            cb(new Error('Only image files are allowed'))
        }
    },
})

// POST /api/admin/upload - Upload single image
router.post('/', upload.single('image'), asyncHandler(async (req, res) => {
    if (!req.file) {
        throw createError('No image file provided', 400, 'NO_FILE')
    }

    const result = await uploadToCloudinary(req.file.buffer, 'satri/products')

    res.json({
        success: true,
        data: {
            url: result.url,
            publicId: result.publicId,
        },
    })
}))

// POST /api/admin/upload/multiple - Upload multiple images
router.post('/multiple', upload.array('images', 5), asyncHandler(async (req, res) => {
    const files = req.files as Express.Multer.File[]

    if (!files || files.length === 0) {
        throw createError('No image files provided', 400, 'NO_FILES')
    }

    const uploadPromises = files.map(file =>
        uploadToCloudinary(file.buffer, 'satri/products')
    )

    const results = await Promise.all(uploadPromises)

    res.json({
        success: true,
        data: results.map(r => ({
            url: r.url,
            publicId: r.publicId,
        })),
    })
}))

// DELETE /api/admin/upload/:publicId - Delete image
router.delete('/:publicId(*)', asyncHandler(async (req, res) => {
    const { publicId } = req.params

    await deleteFromCloudinary(publicId as string)

    res.json({
        success: true,
        message: 'Image deleted',
    })
}))

export { router as uploadRoutes }
