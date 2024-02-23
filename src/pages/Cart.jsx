import styled from "styled-components";

import { mobile } from "../responsive";
import WrapperLayout from "../components/WrapperLayout";

import CartComponent from "../components/Cart";
import InfoCart from "../components/InfoCart";

const Container = styled.div`
  margin-top: 70px;
  padding-bottom: 36px;
  background-image: linear-gradient(white, #f3f4f65e);
`;

const Wrapper = styled.div`
  display: flex;
  padding: 20px;
  font-size: 1.4rem;
  font-weight: 500;
  ${mobile({ padding: "10px" })}
`;

const Cart = () => {
  return (
    <>
      <Container>
        <WrapperLayout>
          <Wrapper>
            <InfoCart />
            <CartComponent />
          </Wrapper>
        </WrapperLayout>
      </Container>
    </>
  );
};

export default Cart;
