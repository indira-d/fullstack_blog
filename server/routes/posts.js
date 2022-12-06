
import { Router } from 'express';
import { checkAuth } from '../utils/checkAuth';
import {createPost, getAll, getById, getMyPosts, deletePost, updatePost, getPostComments} from "../controllers/posts";

const router = new Router()

//Create post
//http:localhost:3000/api/posts

router.post('/', checkAuth, createPost)

//Get all posts
//http:localhost:3000/api/posts

router.get('/', getAll)

//Get Post by Id
//http:localhost:3000/api/posts/:id

router.get('/:id', getById)

//Get My Posts
//http:localhost:3000/api/posts/user/me

router.get('/user/me', checkAuth, getMyPosts)


//Delete Post
//http:localhost:3000/api/posts/:id

router.delete('/:id', checkAuth, deletePost)

//Update Post
//http:localhost:3000/api/posts/:id

router.put('/:id', checkAuth, updatePost)

//Get post comments
//http:localhost:3000/api/posts/comments/:id

router.get('/comments/:id', getPostComments)




export default router
