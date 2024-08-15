
import { baseQuery } from "../baseQuery";
import { createApi } from '@reduxjs/toolkit/query/react';
import { AddTestDescriptionRequest, FetchTestDescriptionsRequest, UpdateTestDescriptionRequest } from "./Requests";
import { AddTestDescriptionResponse, FetchTestDescriptionsResponse, UpdateTestDescriptionResponse } from "./Responses";

export const testDescriptionApi = createApi({
    reducerPath: "testDescriptions",
    baseQuery: baseQuery,
    endpoints: builder => {
        return ({
            updateTestDescription: builder.mutation<UpdateTestDescriptionResponse, UpdateTestDescriptionRequest>({
                query: data => ({
                    url: 'api/testdescription',
                    method: 'PUT',
                    body: data
                })
            }),
            addTestDescription: builder.mutation<AddTestDescriptionResponse, AddTestDescriptionRequest>({
                query: data => ({
                    url: 'api/testdescription',
                    method: 'POST',
                    body: data
                })
            }),
            dropTestDescription: builder.mutation<any, string>({
                query: id => ({
                    url: `api/testdescription?guid=${id}`,
                    method: 'delete',
                })
            }),
            fetchTestDescriptions: builder.query<FetchTestDescriptionsResponse, FetchTestDescriptionsRequest>({
                query: (request: FetchTestDescriptionsRequest) => `api/testdescription?limit=${request.limit}&numberSkip=${request.numberSkip}`
            }),
        })
    }
})

export const {
    useUpdateTestDescriptionMutation,
    useAddTestDescriptionMutation,
    useFetchTestDescriptionsQuery,
    useDropTestDescriptionMutation,
} = testDescriptionApi