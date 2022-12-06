import React, {useCallback, useEffect, useState} from 'react'
import Moment from "react-moment";
import {AiFillDelete, AiFillEye, AiOutlineMessage, AiTwotoneEdit} from "react-icons/ai";
import axios from "../utils/axios";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {deletePost} from "../redux/features/post/postSlice";
import {toast} from "react-toastify";
import {createComment, getPostComments} from "../redux/features/comment/CommentSlice";
import CommentItem from "../components/CommentItem";

export const PostPage = () => {
    const params = useParams()
    const [post, setPost] = useState(null)
    const [comment,setComment] = useState('')
    const {user} = useSelector(state => state.auth)
    const {comments} = useSelector(state => state.comment)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const fetchPost = useCallback(async () => {
        const { data } = await axios.get(`/posts/${params.id}`)
        setPost(data)
    }, [params.id])

    const deletePostHandler = () => {
        try {
            dispatch(deletePost(params.id))
            toast('The post was deleted')
            navigate('/posts')
        }catch (e) {
            console.log(e)
        }
    }

    const handleSubmit = () => {
        try {
            const postId = params.id
            dispatch(createComment({postId, comment}))
            setComment('')
        }catch (e) {
            
        }
    }

    const fetchComments = useCallback( async () => {
        try {
            dispatch(getPostComments(params.id))
        }catch (e) {
            console.log(e)
        }
    }, [params.id, dispatch])

    useEffect(() => {
        fetchPost()
    }, [fetchPost])

    useEffect(() => {
        fetchComments()
    }, [fetchComments])

  return (
	<div>
        <button className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4">
            <Link to={'/'} className="flex">
             Back
        </Link>
        </button>

        <div className="flex gap-10 py-8">
            <div className="w-2/3">
                <div className="flex flex-col basis-1/4 flex-grow">
                    <div className={post?.imgUrl ? 'flex rounded-sm h-80' : 'flex rounded-sm'}>
                        {post?.imgUrl && (
                            <img src={`http://localhost:3002/${post.imgUrl}`} className={'object-cover w-full'}/>
                        )}
                    </div>
                    <div className="flex justify-between items-center pt-2">
                        <div className="text-xs text-white opacity-50">{post?.username}</div>
                        <div className="text-xs text-white opacity-50">
                            <Moment date={post?.createdAt} format='D MMM YYYY'/>
                        </div>
                    </div>
                    <div className="text-white text-xl">{post?.title}</div>
                    <p className="text-gray opacity-60 text-xs pt-4">{post?.text}</p>
                    <div className="flex gap-3 items-center mt-2 justify-between">
                        <div className="flex gap-3 mt-4">
                            <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
                                <AiFillEye/><span>{post?.views}</span>
                            </button>
                            <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
                                <AiOutlineMessage/><span>{post?.comments?.length || 0}</span>
                            </button>
                        </div>
                        {
                            user?._id === post?.author && (
                                <div className="flex gap-3 mt-4">
                                    <button className="flex items-center justify-center gap-2 text-gray opacity-50">
                                       <Link to={`/${params.id}/edit`}>
                                           <AiTwotoneEdit/>
                                       </Link>
                                    </button>
                                    <button
                                        onClick={deletePostHandler}
                                        className="flex items-center justify-center gap-2  text-gray opacity-50">
                                        <AiFillDelete/>
                                    </button>
                                </div>
                            )
                        }

                    </div>

                </div>
            </div>
            <div className="w-1/3 p-8 bg-white flex flex-col gap-2 rounded-sm">
                <form  className="flex gap-2" onSubmit={e => e.preventDefault()}>
                    <input type="text"
                           placeholder={'Comment'}
                           value={comment}
                           onChange={e => setComment(e.target.value)}
                           className="text-black w-full w-2/3 rounded-sm bg-gray-200 border p-2 text-xs outline-none placeholder:text-gray-700"/>
                           <button
                               onClick={handleSubmit}
                               className="text-black w-1/3 rounded-sm bg-gray-400 border p-2 text-xs outline-none">
                               Send
                           </button>
                </form>

                {
                    comments?.map(comment => <CommentItem comment={comment} key={comment._id}/>)
                }
            </div>
        </div>
    </div>
  )
}
