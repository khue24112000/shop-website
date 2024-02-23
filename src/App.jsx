import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { Suspense, lazy } from "react";

import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./pages/AppLayout";
import Home from "./pages/Home";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ProductProvider } from "./context/ProductContext";
import Success from "./pages/Success";
import SearchResult from "./pages/SearchResult";
import OrderHistory from "./pages/OrderHistory";
import { useSelector } from "react-redux";
// import SpinnerFullPage from "./components/SpinnerFullPage";

// const Home = lazy(() => import("./pages/Home"));
// const AppLayout = lazy(() => import("./pages/AppLayout"));
// const Product = lazy(() => import("./pages/Product"));
// const ProductList = lazy(() => import("./pages/ProductList"));
// const Cart = lazy(() => import("./pages/Cart"));
// const Login = lazy(() => import("./pages/Login"));
// const Register = lazy(() => import("./pages/Register"));
// const PageNotFound = lazy(() => import("./pages/PageNotFound"));

function App() {
  const currentUser = useSelector((state) => state.user.currentUser);
  return (
    <>
      <GlobalStyles />
      <ProductProvider>
        <BrowserRouter>
          {/* <Suspense fallback={<SpinnerFullPage />}></Suspense> */}
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Home />} />
              <Route path="cart" element={<Cart />} />
              <Route path="category/:category" element={<ProductList />} />
              <Route
                path="login"
                element={currentUser ? <Navigate to="/" /> : <Login />}
              />
              <Route
                path="register"
                element={currentUser ? <Navigate to="/" /> : <Register />}
              />
              <Route path="product/:id" element={<Product />} />
              <Route path="search" element={<SearchResult />} />
              <Route
                path="order"
                element={currentUser ? <OrderHistory /> : <Navigate to="/" />}
              />
              <Route path="*" element={<Navigate to="/" replace={true} />} />
            </Route>
            <Route path="success" element={<Success />} />
          </Routes>
        </BrowserRouter>
      </ProductProvider>
    </>
  );
}

export default App;
