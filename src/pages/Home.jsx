// import Announcement from "../ui/Announcement";
import Slider from "../components/Slider";
import Categories from "../components/Categories";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Text from "../components/Text";

function Home() {
  return (
    <div>
      {/* <Announcement /> */}
      <Slider />
      <Text title="Danh mục sản phẩm" />
      <Categories />
      <Text title="Gợi ý cho bạn" moreButton={true} link="/category/all" />
      <Products />
      <Newsletter />
    </div>
  );
}

export default Home;
