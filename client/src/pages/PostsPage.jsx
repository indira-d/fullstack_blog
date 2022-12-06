import React, {useEffect, useState} from 'react'
import axios from '../utils/axios'
import PostItem from "../components/PostItem";
import {useSelector} from "react-redux";

export const PostsPage = () => {
    const [posts, setPosts] = useState([])
    const {user} = useSelector(state => state.auth)

    const fetchMyPosts = async () => {
        try {
            const {data} = await axios.get('/posts/user/me')
            setPosts(data)
        }catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchMyPosts()
    }, [fetchMyPosts])


  return (
	<div className={'flex w-1/2 mx-auto py-10 flex-col gap-10'}>
        {posts?.map((post, idx) => <PostItem post={post} key={idx}/>)}
    </div>
  )
}
