import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from 'redux/store'
import type { Post } from 'types/Post'

export const postApi = createApi({
    reducerPath: 'postApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL,
        prepareHeaders: (headers, { getState }) => {
            const { token } = (getState() as RootState).session
            headers.append('Authorization', `${token.type} ${token.value}`)
            return headers
        },
    }),
    endpoints: builder => ({
        getPosts: builder.query<Post[], void>({
            query: () => '/posts',
        }),
    }),
})

export const { useGetPostsQuery } = postApi
