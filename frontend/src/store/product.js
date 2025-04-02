import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: () => set({ products }),
}));
