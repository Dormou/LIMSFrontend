import { createApi } from "@reduxjs/toolkit/dist/query";
import config from "./config";
import { baseQuery } from "./baseQuery";

// export const authApi = createApi({
//     reducerPath: 'passport/account',
//     baseQuery: baseQuery,
//     endpoints: builder => {
//         return ({

//         })
//     }
// })

export const getAccessToken = () => {
    const storageContent = localStorage.getItem(`library.token`)

    if (storageContent) return storageContent
    
    return null
};