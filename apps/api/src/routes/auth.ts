import { Router } from 'express'
import { auth } from '../lib/auth'
import { toNodeHandler } from 'better-auth/node'

const router = Router()

// Better Auth handles all auth routes
router.all('/*', toNodeHandler(auth))

export { router as authRoutes }
