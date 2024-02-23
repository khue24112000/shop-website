import styled from "styled-components";
import PropTypes from "prop-types";

import Product from "./Product";
import WrapperLayout from "./WrapperLayout";
import Spinner from "./Spinner";
import { mobile } from "../responsive";
import { useProduct } from "../context/useProduct";

const Container = styled.div`
  padding: 20px;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(4, 1fr);
  /* grid-template-rows: 1fr 1fr; */
  ${mobile({ gridTemplateColumns: "repeat(2, 1fr)", gridGap: "10px 50px" })}
`;

function Products({ page = 1, renderProducts = [], search = false }) {
  const { filterProducts, isLoading } = useProduct();
  const products =
    renderProducts.length > 0 || search === true
      ? renderProducts
      : filterProducts;
  return (
    <WrapperLayout>
      {isLoading ? (
        <Spinner />
      ) : (
        <Container>
          {products?.length > 0 ? (
            products
              .slice(0, page * 8)
              .map((item) => <Product key={item?._id} item={item} />)
          ) : (
            <p>Không tìm thấy sản phẩm</p>
          )}
        </Container>
      )}
    </WrapperLayout>
  );
}

Products.propTypes = {
  page: PropTypes.number,
  renderProducts: PropTypes.array,
  search: PropTypes.bool,
};

export default Products;
