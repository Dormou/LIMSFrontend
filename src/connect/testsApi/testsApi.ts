
import { baseQuery } from "../baseQuery";
import { createApi } from '@reduxjs/toolkit/query/react';
import { UpdateTestRequest } from "./Requests";
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
            })
        })
    }
})

export const {
    useUpdateTestMutation,
} = testsApi