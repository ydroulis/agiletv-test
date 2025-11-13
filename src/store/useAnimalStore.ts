import { Animal } from '@/types/animal'
import { create } from 'zustand'

interface AnimalStore {
    animals: Animal[]
    selectedAnimal: Animal | null
    setAnimals: (animals: Animal[]) => void
    selectAnimal: (animal: Animal | null) => void
    isShowingResults: boolean
    setIsShowingResults: (isShowingResults: boolean) => void
}

export const useAnimalStore = create<AnimalStore>((set) => ({
    animals: [],
    selectedAnimal: null,
    isShowingResults: false,
    setIsShowingResults: (isShowingResults) => set({ isShowingResults }),
    setAnimals: (animals) => set({ animals }),
    selectAnimal: (animal) => set({ selectedAnimal: animal }),
}))