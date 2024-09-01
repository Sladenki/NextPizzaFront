import { create } from 'zustand';

interface State {
    activeId: number; 
    setActiveId: (activeId: number) => void; // обновление активного Id
}


// Выбранная категория в шапке - пиццы \ завтраки \ закуски 
export const useCategoryStore = create<State>((set) => ({
    activeId: 1,
    setActiveId: (activeId) => set({ activeId }),
}));
  