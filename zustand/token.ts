import create from 'zustand'

interface Store {
    token: Token
    setToken: (token: Token) => void
}

export const useTokenStore = create<Store>()(set => ({
    token: {} as Token,
    setToken: token => set(store => ({ ...store, token: token })),
}))
