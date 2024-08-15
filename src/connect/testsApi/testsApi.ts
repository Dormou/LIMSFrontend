
import { baseQuery } from "../baseQuery";
import { createApi } from '@reduxjs/toolkit/query/react';
import { AddTestRequest, UpdateTestRequest } from "./Requests";
import { TestResponse } from "./Responses";

export const testsApi = createApi({
    reducerPath: "tests",
    baseQuery: baseQuery,
    endpoints: builder => {
        return ({
            updateTest: builder.mutation<void, UpdateTestRequest>({
                query: data => ({
                    url: 'api/test',
                    method: 'PUT',
                    body: data
                })
            }),
            addTest: builder.mutation<string, AddTestRequest>({
                query: data => ({
                    url: 'api/test',
                    method: 'POST',
                    body: data
                })
            }),
        })
    }
})

export const {
    useUpdateTestMutation,
    useAddTestMutation,
} = testsApi