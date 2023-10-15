import { Add, Remove } from "@mui/icons-material";
import styled from "styled-components";
// import Announcement from "../components/Announcement";
import Footer from "../ui/Footer";
import NavBar from "../ui/NavBar";
import Newsletter from "../ui/Newsletter";
import { mobile } from "../responsive";
import WrapperLayout from "../ui/WrapperLayout";
import { formatCurrency } from "../utils/helpers";

const Container = styled.div``;

const Wrapper = styled.div`
  margin-top: 70px;
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: contain;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding-left: 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 500;
`;

const SubTitle = styled.p``;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  display: block;
  margin-top: 16px;
  font-weight: 600;
  font-size: 4rem;
`;

const FilterContainer = styled.div`
  width: 70%;
  margin: 26px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const ContentTitle = styled.span`
  font-size: 2rem;
  font-weight: 500;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }
`;

const DescContent = styled.p``;

const Product = () => {
  return (
    <Container>
      <NavBar />
      {/* <Announcement /> */}
      <WrapperLayout>
        <Wrapper>
          <ImgContainer>
            <Image src="https://canifa.com/img/1000/1500/resize/8/t/8te23w005-sw319-xl-1-u.webp" />
          </ImgContainer>
          <InfoContainer>
            <Title>Áo polo nam kẻ ngang dáng suông</Title>
            <SubTitle>Mã sản phẩm: 123012032</SubTitle>
            <Price>{formatCurrency(200000)}</Price>
            <FilterContainer>
              <Filter>
                <ContentTitle>Màu sắc: </ContentTitle>
                <FilterColor color="black" />
                <FilterColor color="darkblue" />
                <FilterColor color="gray" />
              </Filter>
              <Filter>
                <ContentTitle>Kích cỡ: </ContentTitle>
                <FilterSize>
                  <FilterSizeOption>XS</FilterSizeOption>
                  <FilterSizeOption>S</FilterSizeOption>
                  <FilterSizeOption>M</FilterSizeOption>
                  <FilterSizeOption>L</FilterSizeOption>
                  <FilterSizeOption>XL</FilterSizeOption>
                </FilterSize>
              </Filter>
            </FilterContainer>
            <AddContainer>
              <ContentTitle>Số lượng: </ContentTitle>
              <AmountContainer>
                <Remove />
                <Amount>1</Amount>
                <Add />
              </AmountContainer>
              <Button>Thêm vào giỏ</Button>
            </AddContainer>
            <Desc>
              <ContentTitle>Mô tả</ContentTitle>
              <DescContent>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                venenatis, dolor in finibus malesuada, lectus ipsum porta nunc,
                at iaculis arcu nisi sed mauris. Nulla fermentum vestibulum ex,
                eget tristique tortor pretium ut. Curabitur elit justo,
                consequat id condimentum ac, volutpat ornare.
              </DescContent>
            </Desc>
          </InfoContainer>
        </Wrapper>
      </WrapperLayout>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
