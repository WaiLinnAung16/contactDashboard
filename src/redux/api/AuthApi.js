import {  createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const AuthApi = createApi({
    reducerPath:'AuthApi',
    baseQuery:fetchBaseQuery({baseUrl:'https://contact-app.mmsdev.site/api/v1'}),
    tagTypes:'Auth',
    endpoints:(builder)=>({
        Register:builder.mutation({
            query:(user)=>({
                url:'/register',
                method:'POST',
                body:user
            }),
            invalidatesTags:'Auth'
        }),
        login:builder.mutation({
            query:(user) => ({
                url:`/login`,
                method:'POST',
                body:user
            }),
            invalidatesTags:'Auth'
        }),
     
        
    })
})

export const {useRegisterMutation,useLoginMutation} = AuthApi