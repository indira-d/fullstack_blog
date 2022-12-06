import User from "../models/User";
import Post from '../models/Post'
import Comment from '../models/Comment'
import path, {dirname} from 'path'
import {fileURLToPath} from 'url'


//Create post

export const createPost = async (req, res) => {
    try {
        const {title, text} = req.body
        const user = await User.findById(req.userId)

        if(req.files) {
            let fileName = Date.now().toString() + req.files.image.name
            //получили доступ к папке в которой находимся
            const __dirname = dirname(fileURLToPath(import.meta.url))
            //перемещаем картинку в папку uploads
            req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName))


            const newPostWithImage = new Post({
                username: user.username,
                title,
                text,
                imgUrl: fileName,
                author: req.userId,
            })

            await newPostWithImage.save()
            await User.findByIdAndUpdate(req.userId, {
                $push: {posts: newPostWithImage}
            })

            return res.json(newPostWithImage)
        } else {
            const newPostWithoutImage = new Post ({
                username: user.username,
                title,
                text,
                imgUrl: '',
                author: req.userId
            })

            await newPostWithoutImage.save()
            await User.findByIdAndUpdate(req.userId, {
                $push: {posts: newPostWithoutImage}
            })

            return res.json(newPostWithoutImage)
        }

    }catch(error){
        res.json({message: 'Something went wrong'})
    }
}

export const getAll = async (req, res) => {
    try{
        const posts = await Post.find().sort('-createdAt')
        const popularPosts = await Post.find().limit(5).sort('-views')

        if(!posts){
            res.json({message: 'There is no posts'})
        }

        res.json({posts, popularPosts})

    }catch (e) {
        res.json({message: 'Что-то пошло не так'})
    }
}

//GetById
export const getById = async (req, res) => {
    try{
      const post = await Post.findByIdAndUpdate(req.params.id, {
          $inc: {views: 1}
      })
        res.json(post)
    }catch (e) {
        res.json({message: 'Что-то пошло не так'})
    }
}

export const getMyPosts = async (req, res) => {
    try{
       const user = await User.findById(req.userId)
        const list = await Promise.all(
            user.posts.map(post => {
                return Post.findById(post._id)
            })
        )
        res.json(list)

    }catch (e) {
        res.json({message: 'Что-то пошло не так'})
    }
}

//Delete Post
export const deletePost = async (req, res) => {
    try{
        const post = await Post.findByIdAndDelete(req.params.id)
        if(!post) return res.json({message: 'There is no such post'})

        await User.findByIdAndUpdate(req.userId, {
            $pull: {posts: req.params.id}
        })

        res.json({message: 'The post was deleted'})
    }catch (e) {
        res.json({message: 'Что-то пошло не так'})
    }
}

//Update Post
export const updatePost = async (req, res) => {
    try{
        const {title, text, id} = req.body
        const post = await Post.findById(id)

        if(req.files) {
            let fileName = Date.now().toString() + req.files.image.name
            //получили доступ к папке в которой находимся
            const __dirname = dirname(fileURLToPath(import.meta.url))
            //перемещаем картинку в папку uploads
            req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName))
            post.imgUrl = filename || ''
        }

        post.title = title
        post.text = text

        await post.save()
        res.json(post)
    }catch (e) {
        res.json({message: 'Что-то пошло не так'})
    }
}

//Get Post Comments

export const getPostComments = async (req, res) => {
        try {
            const post = await Post.findById(req.params.id)
            const list = await Promise.all(
                post.comments.map(comment => Comment.findById(comment)
                )
            )
            res.json(list)
        }catch (e) {
            res.json({message: 'Что-то пошло не так'})
        }
}


