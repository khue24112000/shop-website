import { Add, Remove } from "@mui/icons-material";
import styled from "styled-components";
import Footer from "../ui/Footer";
import NavBar from "../ui/NavBar";
import { mobile } from "../responsive";
import WrapperLayout from "../ui/WrapperLayout";
import { formatCurrency } from "../utils/helpers";

const Container = styled.div`
  margin-top: 70px;
  border-bottom: 1px solid var(--color-grey-200);
`;

const Wrapper = styled.div`
  padding: 20px;
  padding-bottom: 56px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "var(--primary-color)" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  /* display: flex; */
  /* justify-content: space-between; */
  /* ${mobile({ flexDirection: "column" })} */
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.span`
  display: flex;
  align-items: center;
`;

const Color = styled.span`
  display: inline-block;
  margin-left: 4px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 2rem;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 2.4rem;
  font-weight: 600;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: var(--color-grey-200);
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  width: 500px;
  margin-left: auto;
  margin-top: 56px;
`;

const SummaryInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SummaryTotal = styled.span`
  font-size: 3rem;
  font-weight: 600;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: var(--primary-color);
  color: white;
  font-weight: 600;
  border: none;
`;
const Cart = () => {
  return (
    <>
      <NavBar />
      <Container>
        <WrapperLayout>
          <Wrapper>
            <Title>Giỏ hàng</Title>
            <Top>
              <TopButton>Tiếp tục mua sắm</TopButton>
              <TopTexts>
                <TopText>Giỏ hàng của bạn (2)</TopText>
                <TopText>Sản phẩm yêu thích (0)</TopText>
              </TopTexts>
              <TopButton type="filled">Thanh toán ngay</TopButton>
            </Top>
            <Bottom>
              <Info>
                <Product>
                  <ProductDetail>
                    <Image src="https://canifa.com/img/1000/1500/resize/8/t/8te23w005-sw319-xl-1-u.webp" />
                    <Details>
                      <ProductName>
                        <b>Tên sản phẩm:</b> Áo polo nam kẻ ngang dáng suông
                      </ProductName>
                      <ProductId>
                        <b>Mã sản phẩm: </b>8TE23W005
                      </ProductId>
                      <ProductColor>
                        <b>Màu sắc:</b>
                        <Color color="black" />
                      </ProductColor>
                      <ProductSize>
                        <b>Kích cỡ:</b> 37.5
                      </ProductSize>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      <Add />
                      <ProductAmount>2</ProductAmount>
                      <Remove />
                    </ProductAmountContainer>
                    <ProductPrice>{formatCurrency(200000)}</ProductPrice>
                  </PriceDetail>
                </Product>
                <Hr />
                <Product>
                  <ProductDetail>
                    <Image src="https://canifa.com/img/1000/1500/resize/5/t/5ts23w002-sb422-xl-1-u.webp" />
                    <Details>
                      <ProductName>
                        <b>Tên sản phẩm:</b> Áo phông unisex người lớn cotton
                        dáng rộng
                      </ProductName>
                      <ProductId>
                        <b>Mã sản phẩm:</b> 93813718293
                      </ProductId>
                      <ProductColor>
                        <b>Màu sắc:</b>
                        <Color color="gray" />
                      </ProductColor>
                      <ProductSize>
                        <b>Kích cỡ:</b> M
                      </ProductSize>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      <Add />
                      <ProductAmount>1</ProductAmount>
                      <Remove />
                    </ProductAmountContainer>
                    <ProductPrice>{formatCurrency(200000)}</ProductPrice>
                  </PriceDetail>
                </Product>
              </Info>
              <Hr />
              <Summary>
                <SummaryInfo>
                  <SummaryTotal>Tổng tiền: </SummaryTotal>
                  <ProductPrice>{formatCurrency(2000000)}</ProductPrice>
                </SummaryInfo>
                <Button>Thanh toán ngay</Button>
              </Summary>
            </Bottom>
          </Wrapper>
        </WrapperLayout>
      </Container>
      <Footer border={true} />
    </>
  );
};

export default Cart;
