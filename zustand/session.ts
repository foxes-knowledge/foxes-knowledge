import create from 'zustand'

interface Store {
    user: User
    token: Token
    setSession: (session: Session) => void
}

export const useSessionStore = create<Store>(set => ({
    user: {} as User,
    token: {} as Token,
    setSession: session => set(() => ({ user: session.user, token: session.token })),
}))
