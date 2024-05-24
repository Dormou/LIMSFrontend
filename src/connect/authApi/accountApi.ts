
import { baseQuery } from "../baseQuery";
import { createApi } from '@reduxjs/toolkit/query/react';

import { 
    ActivateNewPasswordRequest, 
    ActivationRequest, 
    ChangePasswordRequest, 
    ChangeUserInfoRequest, 
    ChangeUserPhotoRequest, 
    ForgotPasswordRequest, 
    SignInEmailRequest,
     SignUpEmailRequest 
} from "./Requests";

import {
    ActivateNewPasswordResponse, 
    ActivationResponse, 
    ChangeUserInfoResponse, 
    ChangeUserPhotoResponse, 
    SignInResponse, 
    SignUpResponse, 
    UserInfoResponse, 
    UserPhotoResponse 
} from "./Responses";

export const accountApi = createApi({
    reducerPath: "passport",
    baseQuery: baseQuery,
    endpoints: builder => {
        return ({
            changePassword: builder.mutation<void, ChangePasswordRequest>({
                query: data => ({
                    url: 'passport/account/password/change',
                    method: 'POST',
                    body: data
                })
            }),
            changeUserInfo: builder.mutation<ChangeUserInfoResponse, ChangeUserInfoRequest>({
                query: data => ({
                    url: 'passport/account/user/change',
                    method: 'POST',
                    body: data
                })
            }),
            changeUserPhoto: builder.mutation<ChangeUserPhotoResponse, ChangeUserPhotoRequest>({
                query: data => ({
                    url: 'passport/account/photo/change',
                    method: 'POST',
                    body: data
                })
            }),
            getUserPhoto: builder.query<UserPhotoResponse, string>({
                query: (id: string) => `passport/account/photo?id=${id}`
            }),
            getUserInfo: builder.query<UserInfoResponse, string>({
                query: (id: string) => `passport/account/userinfo?id=${id}`
            }),
            signIn: builder.mutation<SignInResponse, SignInEmailRequest>({
                query: data => ({
                    url: 'passport/account/signin',
                    method: 'POST',
                    body: data
                })
            }),
            signUp: builder.mutation<SignUpResponse, SignUpEmailRequest>({
                query: data => ({
                    url: 'passport/account/signup',
                    method: 'POST',
                    body: data 
                })
            }),
            activation: builder.mutation<ActivationResponse, ActivationRequest>({
                query: data => ({
                    url: 'passport/account/activation',
                    method: 'POST',
                    body: data 
                })
            }),
            activateNewPassword: builder.mutation<ActivateNewPasswordResponse, ActivateNewPasswordRequest>({
                query: data => ({
                    url: 'passport/account/activate',
                    method: 'POST',
                    body: data 
                })
            }),
            forgotPassword: builder.mutation<ForgotPasswordRequest, ForgotPasswordRequest>({
                query: data => ({
                    url: 'passport/account/forgot',
                    method: 'POST',
                    body: data 
                })
            })
        })
    }
})

export const {
    useActivateNewPasswordMutation,
    useForgotPasswordMutation,
    useSignInMutation,
    useSignUpMutation,
    useActivationMutation,
    useLazyGetUserInfoQuery,
    useGetUserInfoQuery,
    useLazyGetUserPhotoQuery,
    useGetUserPhotoQuery,
    useChangeUserPhotoMutation,
    useChangeUserInfoMutation,
    useChangePasswordMutation,
} = accountApi