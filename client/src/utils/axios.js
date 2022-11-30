
import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://localhost:3002/api',
})

console.log('window.localStorage', window.localStorage.getItem('token'))

instance.interceptors.request.use(config => {
	console.log('config', config)
	
	config.headers.Authorization = window.localStorage.getItem('token')
	console.log('config88', config)
	return config
})

export default instance