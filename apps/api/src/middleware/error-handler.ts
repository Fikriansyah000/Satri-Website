import { Request, Response, NextFunction } from 'express'

export interface ApiError extends Error {
    statusCode?: number
    code?: string
}

export const errorHandler = (
    err: ApiError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error('Error:', err.message)

    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Server Error'

    res.status(statusCode).json({
        success: false,
        error: {
            message,
            code: err.code || 'INTERNAL_ERROR',
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
        },
    })
}

export const asyncHandler = (
    fn: (req: Request, res: Response, next: NextFunction) => Promise<void> | void
) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next)
    }
}

export const createError = (message: string, statusCode: number, code?: string): ApiError => {
    const error: ApiError = new Error(message)
    error.statusCode = statusCode
    error.code = code
    return error
}
