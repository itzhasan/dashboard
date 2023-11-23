import { create } from "zustand";

export const useAppStore = create((set) => ({
  setSearchKey: (searchKey) => set({ searchKey }),
  setID: (id) => set({ id }),
  setTitle: (title) => set({ title }),
  setdescription: (description) => set({ description }),
  setPrice: (price) => set({ price }),
  updateTitle: (utitle) => set({ utitle }),
  updatedescription: (udescription) => set({ udescription }),
  updatePrice: (uprice) => set({ uprice }),

}));
