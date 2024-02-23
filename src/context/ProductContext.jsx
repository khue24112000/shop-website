import { createContext, useEffect, useState } from "react";
import { publicRequest } from "../utils/requestMethod";

export const ProductContext = createContext();

// eslint-disable-next-line react/prop-types
export function ProductProvider({ children }) {
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("");
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState("");
  // const [toast, setToast] = useState(false);
  // const [toastMessage, setToastMessage] = useState("Đã thêm vào giỏ hàng");
  // const [toastType, setToastType] = useState("success");
  useEffect(() => {
    async function getProduct() {
      try {
        setIsLoading(true);
        const res = await publicRequest.get(
          `/product/customer?category=${category ? category : "all"}`
        );
        console.log(category);
        if (res.status === 200) setProducts(res.data);
        else throw new Error("Something wrong!");
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    getProduct();
  }, [category, setProducts]);

  useEffect(() => {
    filters
      ? setFilterProducts(
          products.filter((item) =>
            Object.entries(filters).every(
              ([key, value]) =>
                item[key].includes(value) ||
                item[key].some((c) => c.colorName === value)
            )
          )
        )
      : setFilterProducts(products);
  }, [products, filters, setFilterProducts]);

  return (
    <ProductContext.Provider
      value={{
        products,
        filterProducts,
        sort,
        setSort,
        filters,
        setFilters,
        category,
        setCategory,
        isLoading,
        // toast,
        // setToast,
        // toastMessage,
        // setToastMessage,
        // toastType,
        // setToastType,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
