
import { Router } from 'express';
import {checkAuth} from "../utils/checkAuth";
import {createComment} from "../controllers/comments";



const router = new Router()

//Create comment
//http:localhost:3000/api/comments/:id

router.post('/:id', checkAuth, createComment)

export default router
