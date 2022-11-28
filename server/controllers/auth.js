import bcrypt from 'bcryptjs'
import User from '../models/User'
import jwt from 'jsonwebtoken'

//Register

export const register = async (req, res) => {
	try {
		const {username, password} = req.body

		console.log('username, password999', username, password)

		const isUsed = await User.findOne({username})
		if(isUsed){
			return res.json({message: 'This username is already exist'})
		}

		const salt = bcrypt.genSaltSync(10)
		const hash = bcrypt.hashSync(password, salt)

		const newUser = new User({
			username,
			password: hash
		})

		const token = jwt.sign(
			{
			id: newUser._id,
		}, process.env.JWT_SECRET,
			{expiresIn: '30d'}
		)
		await newUser.save() 

		res.json({
			newUser,
			token,
			message: 'Registration was successful'
		})
	} catch (error) {
		res.json({message: 'Creation of user was failed'})
	}
}

//login
export const login = async (req, res) => {
	try {
		const {username, password} = req.body
		const user = await User.findOne({username})

		if(!user){
			return res.json({
				message: "user with such username is absent"
			})
		}

		const isPasswordCorrect = await bcrypt.compare(password, user.password)

		if(!isPasswordCorrect){
			return res.json({message: 'Password is not correct'})
		}

		const token = jwt.sign({
			id: user._id,
		}, process.env.JWT_SECRET,
			{expiresIn: '30d'}
		)

		res.json({
			token, user, message: 'You have entered the system'
		})
		
	} catch (error) {
		res.json({message: 'Login was failed'})
	}

}

export const getMe = async (req, res) => {
	try {
		const user = await User.findById(req.userId)

		if(!user){
			return res.json({
				message: "user with such username is absent"
			})
		}

		const token = jwt.sign({
			id: user._id,
		}, process.env.JWT_SECRET,
			{expiresIn: '30d'}
		)

		res.json({
			token, user
		})
	} catch (error) {
		res.json({ message: 'Access is denied'})
	}

}


