import create from 'zustand'
// import { persist, PersistOptions } from 'zustand/middleware'

interface Store {
    user: User
    setUser: (user: User) => void
}

// const storage: PersistOptions<Store, Store> = {
//     name: 'user-storage',
//     version: 1,
// }

export const useUserStore = create<Store>()(
    // persist(
    set => ({
        user: {} as User,
        setUser: user => set(store => ({ ...store, user: user })),
    })
    //     storage
    // )
)
