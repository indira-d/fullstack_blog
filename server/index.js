import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoute from './routes/auth'

const app = express()
dotenv.config()


//Middleware

app.use(cors())
app.use(express.json())

//Routes
app.use('/api/auth', authRoute)

async function start() {
	try {
		await mongoose.connect(process.env.MONGO_URI)
		app.listen(process.env.PORT, () => console.log(`server started on port ${process.env.PORT}`))
	} catch (error) {
		console.log(error)
	}
}
start()