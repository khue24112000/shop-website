// import Announcement from "../ui/Announcement";
import NavBar from "../ui/NavBar";
import Slider from "../ui/Slider";
import Categories from "../ui/Categories";
import Footer from "../ui/Footer";
import Products from "../ui/Products";
import Newsletter from "../ui/Newsletter";
import Text from "../ui/Text";

function Home() {
  return (
    <div>
      {/* <Announcement /> */}
      <NavBar />
      <Slider />
      <Text>Danh mục sản phẩm</Text>
      <Categories />
      <Text>Sản phẩm bán chạy</Text>
      <Products />
      <Newsletter />
      <Footer />
    </div>
  );
}

export default Home;
