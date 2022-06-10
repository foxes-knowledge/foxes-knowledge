import { User } from 'types/User'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from 'redux/store'
import { Session, Token } from 'types/Session'

export const sessionSlice = createSlice({
    name: 'session',
    initialState: {
        user: {} as User,
        token: {} as Token,
    },
    reducers: {
        setSession: (state: Session, action: PayloadAction<Session>) => {
            state.user = action.payload.user
            state.token = action.payload.token
        },
    },
})

export const { setSession } = sessionSlice.actions
export const selectSession = (state: RootState) => state.session
export default sessionSlice.reducer
