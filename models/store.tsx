import { create } from 'zustand';
import { ProductProps } from "./products";

type ProductStore = {
  products: ProductProps;
  setProduct: (p: ProductProps) => void;
}

export const useStore = create<ProductStore>((set) => ({
    products: {} as ProductProps,
    setProduct: (p: ProductProps) => set({ products: p }),
}))
