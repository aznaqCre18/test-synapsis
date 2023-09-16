import { configureStore } from '@reduxjs/toolkit';
import postsSlice from './slices/postsSlice';
import postsDetailSlice from './slices/postDetailSlice';
import postsDetailCommentSlice from './slices/commentSlice';
import usersSlice from './slices/usersSlice';

export const store = configureStore({
  reducer: {
    posts: postsSlice,
    postsDetail: postsDetailSlice,
    postsDetailComments: postsDetailCommentSlice,
    users: usersSlice,
  },
})