'use client'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostsDetail } from '@/store/slices/postDetailSlice';
import { fetchPostsComments } from '@/store/slices/commentSlice';
import { MessageCircle } from 'react-feather';

const BlogPostDetail = ({ params }) => {

    const [isLoadingPage, setIsLoadingPage] = useState(true);
    const dispatch = useDispatch();
    const { detailPost, isError, isLoading } = useSelector(state => state.postsDetail);
    const { detailPostComments } = useSelector(state => state.postsDetailComments);
    const { slug } = params;

    useEffect(() => {
        dispatch(fetchPostsDetail(slug));
        dispatch(fetchPostsComments(slug));

        setTimeout(() => {
            setIsLoadingPage(false);
        }, 500)
    }, [])

    if (isLoadingPage || isLoading) {
        return (
            <p>Loading...</p>
        )
    } else {
        return (
            <div className="max-w-[680px] m-auto p-10">
                <h1 className="text-[42px] font-bold mb-6">{detailPost?.title}</h1>
                <div className="content font-light mb-6">
                    <p>Posted by</p>
                    <p>User - {detailPost?.user_id}</p>
                </div>
                <div className="isi mb-[64px] pb-[64px]" style={{ borderBottom: '1px solid #D9D9D9' }}>
                    <p>{detailPost?.body}</p>
                </div>
                <div className='flex gap-2 items-center '>
                    <p className="text-[18px] font-bold">Comments</p>
                    <MessageCircle />
                </div>
                <div className="comment">
                    {
                        detailPostComments && detailPostComments.length > 0 ? (
                            detailPostComments?.map(data => {
                                return (
                                    <div className="py-8" style={{ borderBottom: '1px solid #E4E4E4' }}>
                                        <div className="top mb-4 font-light">
                                            <p className="font-bold">{data.name}</p>
                                            <p className='font-light'>{data.email}</p>
                                        </div>
                                        <div className="content">
                                            {data.body}
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            <div className='text-center mt-[82px]'>
                                <p>Tidak ada komentar</p>
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
}

export default BlogPostDetail;