import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { MainPage } from './pages/MainPage';
import { PostsPage } from './pages/PostsPage';
import {AddPostPage} from './pages/AddPostPage';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { EditPostPage } from './pages/EditPostPage';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import { getMe } from './redux/features/auth/authSlice.js'




function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])
  return (
    <Layout >
      <Routes>
        <Route path='/' element={<MainPage />}></Route>
        <Route path='posts' element={<PostsPage />}></Route>
        <Route path=':id' element={<PostsPage />}></Route>
        <Route path=':id/edit' element={<EditPostPage />}></Route>
        <Route path='new' element={<AddPostPage />}></Route>
        <Route path='register' element={<RegisterPage />}></Route>
        <Route path='login' element={<LoginPage />}></Route>
      </Routes>
        <ToastContainer position={"bottom-right"}/>
    </Layout>
  );
}

export default App;
