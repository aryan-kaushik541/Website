import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query' // for query
import {userAuthApi} from '../services/userAuthApi'
import userReducer from '../features/user/userSlice'
export const store = configureStore({
    reducer: {
        [userAuthApi.reducerPath]: userAuthApi.reducer,
        auth:userReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userAuthApi.middleware),
})

setupListeners(store.dispatch)