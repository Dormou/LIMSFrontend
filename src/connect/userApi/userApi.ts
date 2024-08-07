
import { baseQuery } from "../baseQuery";
import { createApi } from '@reduxjs/toolkit/query/react';
import { FetchInternalUsersRequest, FetchExternalUsersRequest } from "./Requests";
import { FetchInternalUsersResponse, InternalUserResponse, ExternalUserResponse, FetchExternalUsersResponse } from "./Responses";


export const usersApi = createApi({
    reducerPath: "InternalUsers",
    baseQuery: baseQuery,
    endpoints: builder => {
        return ({
            getInternalUser: builder.query<InternalUserResponse, string>({
                query: (id: string) => `api/user/internal?id=${id}`
            }),
            fetchInternalUsers: builder.query<FetchInternalUsersResponse, FetchInternalUsersRequest>({
                query: (request: FetchInternalUsersRequest) => `api/user/internal?limit=${request.limit}&numberSkip=${request.numberSkip}`
            }),
            getExternalUser: builder.query<ExternalUserResponse, string>({
                query: (id: string) => `api/user/external?id=${id}`
            }),
            fetchExternalUsers: builder.query<FetchExternalUsersResponse, FetchExternalUsersRequest>({
                query: (request: FetchExternalUsersRequest) => `api/user/external?limit=${request.limit}&numberSkip=${request.numberSkip}`
            }),
        })
    }
})

export const {
    useGetInternalUserQuery,
    useLazyGetInternalUserQuery,
    useFetchInternalUsersQuery,
    useLazyFetchInternalUsersQuery,
} = usersApi