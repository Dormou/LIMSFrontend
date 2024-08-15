
import { baseQuery } from "../baseQuery"
import { createApi } from '@reduxjs/toolkit/query/react'
import { DeviceTypeResponse, FetchDeviceTypesResponse } from "./Responses"
import { AddDeviceTypeRequest, FetchDeviceTypesRequest, UpdateDeviceTypeRequest } from "./Requests"

export const deviceTypeApi = createApi({
    reducerPath: "deviceTypes",
    baseQuery: baseQuery,
    endpoints: builder => {
        return ({
            getDeviceType: builder.query<DeviceTypeResponse, string>({
                query: (id: string) => `api/devicetype?id=${id}`
            }),
            updateDeviceType: builder.mutation<DeviceTypeResponse, UpdateDeviceTypeRequest>({
                query: data => ({
                    url: 'api/devicetype',
                    method: 'PUT',
                    body: data
                })
            }),
            fetchDeviceTypes: builder.query<FetchDeviceTypesResponse, FetchDeviceTypesRequest>({
                query: (request: FetchDeviceTypesRequest) => `api/devicetype?limit=${request.limit}&numberSkip=${request.numberSkip}`
            }),
            dropDeviceType: builder.mutation<any, string>({
                query: id => ({
                    url: `api/devicetype?guid=${id}`,
                    method: 'delete',
                })
            }),
            addDeviceType: builder.mutation<DeviceTypeResponse, AddDeviceTypeRequest>({
                query: data => ({
                    url: 'api/devicetype',
                    method: 'POST',
                    body: data
                })
            }),
        })
    }
})

export const {
    useGetDeviceTypeQuery,
    useLazyGetDeviceTypeQuery,
    useFetchDeviceTypesQuery,
    useLazyFetchDeviceTypesQuery,
    useAddDeviceTypeMutation,
    useDropDeviceTypeMutation,
    useUpdateDeviceTypeMutation,
} = deviceTypeApi