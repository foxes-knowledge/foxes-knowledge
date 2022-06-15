import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { postApi } from './apis/api'
import sessionReducer from './session/sessionSlice'

export const store = configureStore({
    reducer: {
        session: sessionReducer,
        [postApi.reducerPath]: postApi.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(postApi.middleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>
