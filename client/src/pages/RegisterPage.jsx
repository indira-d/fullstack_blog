import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { registerUser, checkIsAuth } from '../redux/features/auth/authSlice'



export const RegisterPage = () => {

  const dispatch = useDispatch()

  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = () => {
    try {
      dispatch(registerUser({username, password}))
      setPassword('')
      setUserName('')
    } catch (error) {
      
    }
  }

  return (
	<div>	<form onSubmit={(e) => e.preventDefault()} className='w-1/4 h-60 mx-auto mt-40'>
    <h1 className="text-lg text-white text-center">Регистрация hgh</h1>
    <label htmlFor="" className="text-xs text-gray-400">
      Username: 
      <input
        type='text'
        placeholder='Username'
        value={username}
        onChange ={ e => setUserName(e.target.value)}
        className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-2 px-2 text-xs outline-none placeholder:text-gray-700'
      ></input>
    </label>

    <label htmlFor="" className="text-xs text-gray-400">
      Username: 
      <input
        type='text'
        placeholder='Password'
        value={password}
        onChange={e => setPassword(e.target.value)}
        className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-2 px-2 text-xs outline-none placeholder:text-gray-700'
      ></input>
    </label>

    <div className="flex gap-8 justify-center mt-4">
      <button 
          type='submit'
          onClick={handleSubmit}
          className='flex justify-center items-center text-xs  text-white rounded-sm py-2 px-2'>
        Подтвердить</button>
           <Link to='/login' className='flex justify-center items-center text-xs text-white'>Войти</Link>
    </div>
  </form></div>
  )
}
