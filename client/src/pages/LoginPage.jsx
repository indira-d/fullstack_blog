import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {checkIsAuth, loginUser, registerUser} from "../redux/features/auth/authSlice";
import {useNavigate} from "react-router";
import {toast} from "react-toastify";

export const LoginPage = () => {
    const dispatch = useDispatch()
    const {status} = useSelector((state) => state.auth)
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const navigate  = useNavigate()
    const isAuth = useSelector(checkIsAuth)

    useEffect(() => {
        if(status){
            toast(status)
        }
        if(isAuth){
            navigate('/')
        }
    }, [status, isAuth, navigate])


    const handleSubmit = () => {
        try {
            dispatch(loginUser({username, password}))
        } catch (error) {}
    }


    return (
	<form onSubmit={(e) => e.preventDefault()} className='w-1/4 h-60 mx-auto mt-40'>
    <h1 className="text-lg text-white text-center">Авторизация</h1>
    <label htmlFor="" className="text-xs text-gray-400">
      Username: 
      <input
        type='text'
        placeholder='Username'
        value={username}
        onChange={e => setUserName(e.target.value)}
        className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-2 px-2 text-xs outline-none placeholder:text-gray-700'
      ></input>
    </label>

    <label htmlFor="" className="text-xs text-gray-400">
      Password:
      <input
        type='password'
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
        Войти</button>
           <Link to='/register' className='flex justify-center items-center text-xs text-white'>Зарегистрироваться</Link>
    </div>
  </form>
  )
}
