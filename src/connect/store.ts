import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query'
import { authApi } from './authApi/authApi';

//Закоментированные строки нужны как пример
export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        //[bookApi.reducerPath]: bookApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
        .concat([
            authApi.middleware,
            //bookApi.middleware
        ])
});

setupListeners(store.dispatch);