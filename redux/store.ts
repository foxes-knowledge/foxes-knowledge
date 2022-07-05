import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { postApi } from './apis/postApi'
import { tagApi } from './apis/tagApi'
import sessionReducer from './slices/sessionSlice'

export const store = configureStore({
    reducer: {
        session: sessionReducer,
        [postApi.reducerPath]: postApi.reducer,
        [tagApi.reducerPath]: tagApi.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(postApi.middleware, tagApi.middleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>
