
import { baseQuery } from "../baseQuery"
import { createApi } from '@reduxjs/toolkit/query/react'
import { DeviceTypeResponse, FetchDeviceTypesResponse } from "./Responses"
import { FetchDeviceTypesRequest } from "./Requests"

export const deviceTypeApi = createApi({
    reducerPath: "deviceTypes",
    baseQuery: baseQuery,
    endpoints: builder => {
        return ({
            getDeviceType: builder.query<DeviceTypeResponse, string>({
                query: (id: string) => `api/devicetype?id=${id}`
            }),
            fetchDeviceTypes: builder.query<FetchDeviceTypesResponse, FetchDeviceTypesRequest>({
                query: (request: FetchDeviceTypesRequest) => `api/devicetype?limit=${request.limit}&numberSkip=${request.numberSkip}`
            }),
        })
    }
})

export const {
    useGetDeviceTypeQuery,
    useLazyGetDeviceTypeQuery,
    useFetchDeviceTypesQuery,
    useLazyFetchDeviceTypesQuery,
} = deviceTypeApi