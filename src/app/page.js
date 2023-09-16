'use client'

import PostList from "@/components/PostList";
import HeaderPage from "@/components/header";
import { fetchPosts } from "@/store/slices/postsSlice";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "react-feather";
import { useDispatch, useSelector } from "react-redux"

export default function Home() {
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();
  const { postsList, isError, isLoading } = useSelector(state => state.posts);

  useEffect(() => {
    dispatch(fetchPosts(page));
  }, []);

  useEffect(() => {
    dispatch(fetchPosts(page));
  }, [page]);

  console.log(postsList);

  return (
    <div className="max-w-screen-xl w-screen m-auto px-10">
      <HeaderPage />
      <div className="hero-content m-auto max-w-[1200px] flex items-center justify-center flex-col h-[600px]">
        <h3 className="text-[42px] mb-4">Welcome to</h3>
        <h1 className="text-[84px] font-bold">Synapsis Blog.</h1>
      </div>
      <div className="hero-content m-auto max-w-[1200px] mt-4">
        <h3 className="text-[24px] mb-4">For You</h3>
        {
          postsList?.map((data) => {
            return (
              <PostList data={data} />
            )
          })
        }
      </div>
      <div className="pagination flex justify-between mb-10">
        <button className="flex p-2 gap-2" disabled={page === 1} onClick={() => setPage(current => current === 1 ? 1 : current - 1)}>
          <ArrowLeft />
          <span>Previous</span>
        </button>
        <button className="flex p-2 gap-2" onClick={() => setPage(current => current + 1)}>
          <span>Next</span>
          <ArrowRight />
        </button>
      </div>
    </div>
  )
}