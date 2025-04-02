import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: () => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return {
        success: false,
        message: "please fill all field",
      };
    }
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    const data = await res.json();
    set((state) => ({ products: [...state.products, data.data] }));
    return {
      success: true,
      message: "product created creted succesfuly",
    };
  },
}));
