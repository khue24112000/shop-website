import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import ScrollToTop from "../features/ScrollToTop";
import Footer from "../components/Footer";
import Toast from "../components/Toast";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyLogin } from "../redux/apiCalls";

function AppLayout() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  useEffect(() => {
    if (currentUser) verifyLogin(dispatch);
  }, [dispatch, currentUser]);
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
      <Toast />
      <ScrollToTop />
    </div>
  );
}

export default AppLayout;
