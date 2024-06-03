import { configureStore, createSlice } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query'
import { accountApi } from './authApi/accountApi';
import { useDispatch, useSelector } from 'react-redux';
import { Footer } from '../pages/components/Footer/Footer';
import { Header } from '../pages/components/Header/Header';
import { projectsApi } from './projectsApi/projectsApi';
import { Menu } from '../pages/components/Menu/Menu';

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

export const menuStorage = createSlice({
    name: 'menu',
    initialState: {
        show: true, 
    },

    reducers: {
        //setMenu: (state, action) => state = action.payload,
        setShowMenu: (state, action) => void(state.show = action.payload)
    },
})

export const footerStorage = createSlice({
    name: 'footer',
    initialState: {
        show: true, 
        value: <Footer/>
    },

    reducers: {
        setFooter: (state, action) => state = action.payload,
        setShowFooter: (state, action) => void(state.show = action.payload)
    },
})

export const headerStorage = createSlice({
    name: 'header',
    initialState: {
        show: true, 
        value: <Header/>
    },

    reducers: {
        setHeader: (state, action) => state = action.payload,
        setShowHeader: (state, action) => void(state.show = action.payload)
    },

})


export const store = configureStore({
    reducer: {
        menu: menuStorage.reducer,
        viewApp: viewAppStorage.reducer,
        header: headerStorage.reducer,
        footer: footerStorage.reducer,
        [accountApi.reducerPath]: accountApi.reducer,
        [projectsApi.reducerPath]: projectsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({serializableCheck: false})
        .concat([
            accountApi.middleware,
            projectsApi.middleware,
    ])
});

setupListeners(store.dispatch)

type AppStore = typeof store
type AppDispatch = AppStore['dispatch']

export const { setShowMenu } = menuStorage.actions 
export const { setFooter, setShowFooter } = footerStorage.actions 
export const { setHeader, setShowHeader } = headerStorage.actions
export const { setScrollY, setScrollX } = viewAppStorage.actions

export type RootState = ReturnType<AppStore['getState']>
export const useAppDispatch: () => AppDispatch = useDispatch