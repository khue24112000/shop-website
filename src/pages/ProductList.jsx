import styled from "styled-components";
import NavBar from "../ui/NavBar";
// import Announcement from "../ui/Announcement";
import Products from "../ui/Products";
import Newsletter from "../ui/Newsletter";
import Footer from "../ui/Footer";
import { mobile } from "../responsive";
import WrapperLayout from "../ui/WrapperLayout";

const Container = styled.div`
  margin-top: 70px;
`;

const Title = styled.h1`
  display: inline-block;
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 2rem;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const ProductList = () => {
  return (
    <>
      <NavBar />
      <Container>
        {/* <Announcement /> */}
        <WrapperLayout>
          <Title>Quần dài</Title>
          <FilterContainer>
            <Filter>
              <FilterText>Lọc sản phẩm theo:</FilterText>
              <Select>
                <Option disabled selected>
                  Màu sắc
                </Option>
                <Option>Trắng</Option>
                <Option>Đen</Option>
                <Option>Đỏ</Option>
                <Option>Xanh</Option>
                <Option>Vàng</Option>
                <Option>Xanh</Option>
              </Select>
              <Select>
                <Option disabled selected>
                  Kích cỡ
                </Option>
                <Option>XS</Option>
                <Option>S</Option>
                <Option>M</Option>
                <Option>L</Option>
                <Option>XL</Option>
              </Select>
            </Filter>
            <Filter>
              <FilterText>Sắp xếp theo:</FilterText>
              <Select>
                <Option selected>Mới nhất</Option>
                <Option>Giá từ thấp đến cao</Option>
                <Option>Giá từ cao đến thấp</Option>
              </Select>
            </Filter>
          </FilterContainer>
        </WrapperLayout>
        <Products />
        <Newsletter />
      </Container>
      <Footer />
    </>
  );
};

export default ProductList;
