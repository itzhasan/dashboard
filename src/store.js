import { create } from "zustand";

export const useAppStore = create((set) => ({
  searchKey: "",
  id:null,
  
  setSearchKey: (searchKey) => set({ searchKey }),
  setID: (id) => set({ id }),
  setTitle: (title) => set({ title }),
  setdescription: (description) => set({ description }),
  setPrice: (price) => set({ price }),
  

}));
