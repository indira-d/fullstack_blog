import  jwt  from 'jsonwebtoken';

export const checkAuth = (req, res, next) => {
	const token = (req.headers.Authorization || '').replace(/Bearer\s?/, '')

	console.log('token', token)

	if(token){
		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET)
			req.userId = decoded.id
			next()
		} catch (error) {
			return res.json({
				message: 'Asses is denyied'
			})
			
		}
	} else {
		return res.json({
				message: 'Asses is denyied'
			})
	}

}