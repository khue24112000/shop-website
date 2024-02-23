import { useContext } from "react";
import { ProductContext } from "./ProductContext";

export function useProduct() {
  const context = useContext(ProductContext);
  return context;
}
