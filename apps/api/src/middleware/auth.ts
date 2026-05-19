import { Request, Response, NextFunction } from 'express'
import { auth } from '../lib/auth'
import { createError } from './error-handler'

export interface AuthenticatedRequest extends Request {
    user?: {
        id: string
        email: string
        name?: string
    }
    session?: {
        id: string
        userId: string
    }
}

export const authMiddleware = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const session = await auth.api.getSession({
            headers: req.headers as HeadersInit,
        })

        if (!session) {
            throw createError('Unauthorized', 401, 'UNAUTHORIZED')
        }

        req.user = session.user as AuthenticatedRequest['user']
        req.session = session.session as AuthenticatedRequest['session']

        next()
    } catch (error) {
        next(createError('Unauthorized', 401, 'UNAUTHORIZED'))
    }
}
