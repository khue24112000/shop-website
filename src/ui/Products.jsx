import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import WrapperLayout from "./WrapperLayout";
import { mobile } from "../responsive";

const Container = styled.div`
  padding: 20px;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 1fr 1fr;
  ${mobile({ gridTemplateColumns: "repeat(2, 1fr)", gridGap: "10px 50px" })}
`;

const Products = () => {
  return (
    <WrapperLayout>
      <Container>
        {popularProducts.map((item) => (
          <Product item={item} key={item.id} />
        ))}
      </Container>
    </WrapperLayout>
  );
};

export default Products;
