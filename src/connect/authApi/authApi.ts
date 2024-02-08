
import { baseQuery } from "../baseQuery";
import { createApi } from '@reduxjs/toolkit/query/react';
import { ActivateNewPasswordRequest, ActivationRequest, ForgotPasswordRequest, SignInEmailRequest, SignUpEmailRequest } from "./Requests";
import { ActivateNewPasswordResponse, ActivationResponse, SignInResponse, SignUpResponse } from "./Responses";

export const authApi = createApi({
    reducerPath: "access/control",
    baseQuery: baseQuery,
    endpoints: builder => {
        return ({
            signIn: builder.mutation<SignInResponse, SignInEmailRequest>({
                query: data => ({
                    url: 'access/control/account/signin',
                    method: 'POST',
                    body: data
                })
            }),
            signUp: builder.mutation<SignUpResponse, SignUpEmailRequest>({
                query: data => ({
                    url: 'access/control/account/signup',
                    method: 'POST',
                    body: data 
                })
            }),
            activation: builder.mutation<ActivationResponse, ActivationRequest>({
                query: data => ({
                    url: 'access/control/account/activation',
                    method: 'POST',
                    body: data 
                })
            }),
            activateNewPassword: builder.mutation<ActivateNewPasswordResponse, ActivateNewPasswordRequest>({
                query: data => ({
                    url: 'access/control/account/activate',
                    method: 'POST',
                    body: data 
                })
            }),
            forgotPassword: builder.mutation<ForgotPasswordRequest, ForgotPasswordRequest>({
                query: data => ({
                    url: 'access/control/account/forgot',
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
    useActivationMutation
} = authApi