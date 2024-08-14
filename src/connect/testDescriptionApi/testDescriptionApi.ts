
import { baseQuery } from "../baseQuery"
import { createApi } from '@reduxjs/toolkit/query/react'
import { TestDescriptionResponse, FetchTestDescriptionsResponse, FetchTestGroupResponse } from "./Responses"
import { FetchTestDescriptionsRequest } from "./Requests"
import { TestGroup } from "./Types"

export const testDescriptionApi = createApi({
    reducerPath: "testdescriptions",
    baseQuery: baseQuery,
    endpoints: builder => {
        return ({
            getTestDescription: builder.query<TestDescriptionResponse, string>({
                query: (id: string) => `api/testdescription?id=${id}`
            }),
            fetchTestDescriptions: builder.query<FetchTestDescriptionsResponse, FetchTestDescriptionsRequest>({
                query: (request: FetchTestDescriptionsRequest) => `api/testdescription?limit=${request.limit}&numberSkip=${request.numberSkip}`
            }),
            fetchTestGroupDescriptions: builder.query<FetchTestGroupResponse, FetchTestDescriptionsRequest>({
                query: (request: FetchTestDescriptionsRequest) => `api/testdescription/group?limit=${request.limit}&numberSkip=${request.numberSkip}`
            }),
        })
    }
})

export const {
    useGetTestDescriptionQuery,
    useLazyGetTestDescriptionQuery,
    useFetchTestDescriptionsQuery,
    useLazyFetchTestDescriptionsQuery,
    useFetchTestGroupDescriptionsQuery
} = testDescriptionApi