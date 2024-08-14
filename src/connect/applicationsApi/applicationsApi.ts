
import { baseQuery } from "../baseQuery";
import { createApi } from '@reduxjs/toolkit/query/react';
import { AddApplicationRequest, ApplicationStatusChangeRequest, FetchApplicationsRequest, UpdateApplicationRequest } from "./Requests";
import { FetchApplicationsResponse, ApplicationResponse, ApplicationStatusResponse } from "./Responses";
import { Application } from "./Types";


export const applicationsApi = createApi({
    reducerPath: "applications",
    baseQuery: baseQuery,
    endpoints: builder => {
        return ({
            addApplication: builder.mutation<Application, AddApplicationRequest>({
                query: data => ({
                    url: 'api/application',
                    method: 'POST',
                    body: data
                })
            }),
            updateApplication: builder.mutation<Application, UpdateApplicationRequest>({
                query: data => ({
                    url: 'api/Application',
                    method: 'PUT',
                    body: data
                })
            }),
            getApplication: builder.query<ApplicationResponse, string>({
                query: (id: string) => `api/application?id=${id}`
            }),
            fetchApplications: builder.query<FetchApplicationsResponse, FetchApplicationsRequest>({
                query: (request: FetchApplicationsRequest) => `api/application?limit=${request.limit}&numberSkip=${request.numberSkip}`
            }),
            getCurrentStatus: builder.query<ApplicationStatusResponse, string>({
                query: (applicationId: string) => `api/application/status/${applicationId}`
            }),
            changeCurrentStatus: builder.mutation<void, ApplicationStatusChangeRequest>({
                query: data => ({
                    url: 'api/application/status',
                    method: 'POST',
                    body: data
                })
            })
        })
    }
})

export const {
    useGetApplicationQuery,
    useLazyGetApplicationQuery,
    useFetchApplicationsQuery,
    useLazyFetchApplicationsQuery,
    useAddApplicationMutation,
    useGetCurrentStatusQuery,
    useLazyGetCurrentStatusQuery,
    useChangeCurrentStatusMutation,
    useUpdateApplicationMutation,
} = applicationsApi