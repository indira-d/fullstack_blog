
import { Router } from 'express';
import { getMe, login, register } from '../controllers/auth';
import { checkAuth } from '../utils/checkAuth';

const router = new Router()

//Register
//http:localhost:3000/api/auth/register

router.post('/register', register)

//Login
//http:localhost:3000/api/auth/login
router.post('/login', login)

//getMe
//http:localhost:3000/api/auth/register
router.get('/me', checkAuth, getMe)

export default router
