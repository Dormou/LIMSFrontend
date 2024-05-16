import { configureStore, createSlice } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query'
import { authApi } from './authApi/authApi';
import { useDispatch, useSelector } from 'react-redux';
import { Footer } from '../pages/components/Footer/Footer';

export const viewAppStorage = createSlice({
    name: 'viewApp',
    initialState: {
        scrollX: true,
        scrollY: true
    },
    reducers: {
        setScrollX: (state, action) => void(state.scrollX = action.payload),
        setScrollY: (state, action) => void(state.scrollY = action.payload)
    }
})

export const footerStorage = createSlice({
    name: 'footer',
    initialState: {
        show: true, 
        value: Footer({})
    },

    reducers: {
        setFooter: (state, action) => state = action.payload
    },
})

export const store = configureStore({
    reducer: {
        viewApp: viewAppStorage.reducer,
        footer: footerStorage.reducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
        .concat([
            authApi.middleware,
    ])
});

setupListeners(store.dispatch)

type AppStore = typeof store
type AppDispatch = AppStore['dispatch']

export const { setFooter, } = footerStorage.actions 
export const { setScrollY, setScrollX } = viewAppStorage.actions

export type RootState = ReturnType<AppStore['getState']>
export const useAppDispatch: () => AppDispatch = useDispatch