import { create } from 'zustand'

// custom hook to create state store
export const useAuthStore= create((set)=>({
    auth:{
        username: '',
    },
    setUsername: (name)=>set((state)=>({ auth: { ...state.auth, username: name}}))
}))