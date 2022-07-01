import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from 'redux/store'
import { Tag } from 'types/Tag'

export const tagApi = createApi({
    reducerPath: 'tagApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL,
        prepareHeaders: async (headers, { getState }) => {
            const { token } = (getState() as RootState).session
            headers.append('Authorization', `${token!.type} ${token!.value}`)
            return headers
        },
    }),
    endpoints: builder => ({
        getTags: builder.query<Tag[], void>({
            query: () => '/tags',
        }),
        getTopTags: builder.query<Tag[], void>({
            query: () => '/tags/top',
        }),
    }),
})

export const { useGetTagsQuery, useGetTopTagsQuery } = tagApi
