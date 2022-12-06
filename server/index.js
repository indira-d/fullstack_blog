import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoute from './routes/auth'
import postRoute from './routes/posts'
import commentRoute from './routes/comments'
import fileUpload from 'express-fileupload'

const app = express()
dotenv.config()

//Middleware

app.use(cors())
app.use(fileUpload())
app.use(express.json())
app.use(express.static('uploads'))

//Routes
app.use('/api/auth', authRoute)
app.use('/api/posts', postRoute)
app.use('/api/comments', commentRoute)


async function start() {
	try {
		await mongoose.connect(process.env.MONGO_URI)
		app.listen(process.env.PORT, () => console.log(`server started on port ${process.env.PORT}`))
	} catch (error) {
		console.log(error)
	}
}
start()