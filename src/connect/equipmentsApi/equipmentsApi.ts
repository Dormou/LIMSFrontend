
import { baseQuery } from "../baseQuery";
import { createApi } from '@reduxjs/toolkit/query/react';
import { AddEquipmentRequest, FetchEquipmentsRequest, UpdateEquipmentRequest } from "./Requests";
import { FetchEquipmentsResponse, EquipmentResponse } from "./Responses";

export const equipmentsApi = createApi({
    reducerPath: "equipments",
    baseQuery: baseQuery,
    endpoints: builder => {
        return ({
            updateEquipment: builder.mutation<EquipmentResponse, UpdateEquipmentRequest>({
                query: data => ({
                    url: 'api/equipment',
                    method: 'PUT',
                    body: data
                })
            }),
            addEquipment: builder.mutation<EquipmentResponse, AddEquipmentRequest>({
                query: data => ({
                    url: 'api/equipment',
                    method: 'POST',
                    body: data
                })
            }),
            dropEquipment: builder.mutation<any, string>({
                query: id => ({
                    url: `api/equipment?guid=${id}`,
                    method: 'delete',
                })
            }),
            fetchEquipments: builder.query<FetchEquipmentsResponse, FetchEquipmentsRequest>({
                query: (request: FetchEquipmentsRequest) => `api/equipment?limit=${request.limit}&numberSkip=${request.numberSkip}`
            }),
        })
    }
})

export const {
    useUpdateEquipmentMutation,
    useAddEquipmentMutation,
    useFetchEquipmentsQuery,
    useDropEquipmentMutation,
} = equipmentsApi