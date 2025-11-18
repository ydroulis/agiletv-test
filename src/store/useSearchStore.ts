import { create } from 'zustand'

interface SearchStore {
    term: string
    setTerm: (term: string) => void
}

export const useSearchStore = create<SearchStore>((set) => ({
    term: '',
    setTerm: (term: string) => set({ term }),
}))