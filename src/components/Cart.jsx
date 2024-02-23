import styled from "styled-components";
import CartProduct from "./CartProduct";
import { formatCurrency } from "../utils/helpers";
import { useSelector } from "react-redux";

const CartContainer = styled.div`
  padding-left: 50px;
  flex: 2;
`;

const CartList = styled.div`
  max-height: 50vh;
  overflow-y: auto;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  margin: 24px 0;

  background-color: var(--color-grey-300);
`;

const Title = styled.h1``;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  justify-content: space-between;
  padding: 8px;
`;

const Summary = styled.div``;

const SummaryText = styled.span``;

const TotalPrice = styled.span`
  font-size: 2rem;
  font-weight: 700;
`;
function CartComponent() {
  const { products, total, shippingCost } = useSelector((state) => state.cart);
  // console.log(products);
  return (
    <CartContainer>
      <Row>
        <Title>Giỏ hàng</Title>
      </Row>
      <CartList>
        {products?.length > 0 ? (
          products.map((product) => (
            <Row key={product._id + product.color.colorName + product.size}>
              <CartProduct product={product} />
            </Row>
          ))
        ) : (
          <p>Giỏ hàng không có sản phẩm</p>
        )}
        {/* <Row>
          <CartProduct />
        </Row>
        <Row>
          <CartProduct />
        </Row>
        <Row>
          <CartProduct />
        </Row>
        <Row>
          <CartProduct />
        </Row>
        <Row>
          <CartProduct />
        </Row>
        <Row>
          <CartProduct />
        </Row> */}
      </CartList>
      {products?.length > 0 && (
        <>
          <Divider></Divider>
          <Summary>
            <Row>
              <SummaryText>Tạm tính</SummaryText>
              <SummaryText>{formatCurrency(total)}</SummaryText>
            </Row>
            <Row>
              <SummaryText>Phí giao hàng</SummaryText>
              <SummaryText>
                {shippingCost === 0 ? "Miễn phí" : formatCurrency(shippingCost)}
              </SummaryText>
            </Row>
            <Divider></Divider>
            <Row>
              <SummaryText>Tổng</SummaryText>
              <TotalPrice>{formatCurrency(total + shippingCost)}</TotalPrice>
            </Row>
          </Summary>
        </>
      )}
    </CartContainer>
  );
}

export default CartComponent;
