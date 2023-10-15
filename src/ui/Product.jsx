import { FavoriteBorder, Search, ShoppingCart } from "@mui/icons-material";
import styled from "styled-components";
import PropTypes from "prop-types";
import { formatCurrency } from "../utils/helpers";

const Actions = styled.div`
  opacity: 0;
  width: 100%;
  height: calc(100% - 88px);
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
`;

const Container = styled.div`
  margin: 5px;
  min-width: 280px;
  /* height: 350px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  position: relative;
  cursor: pointer;
  /* box-shadow: var(--shadow-md); */

  &:hover ${Actions} {
    opacity: 1;
  }
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  /* object-fit: cover; */
  /* z-index: 2; */
  /* background-color: transparent; */
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Info = styled.div`
  padding: 20px 0;
  align-self: flex-start;
`;
const InfoTitle = styled.p``;
const Price = styled.p`
  font-weight: 600;
`;

const Product = ({ item }) => {
  return (
    <Container>
      {/* <Circle /> */}
      <Image src={item.img} />
      <Actions>
        <Icon>
          <ShoppingCart />
        </Icon>
        <Icon>
          <Search />
        </Icon>
        <Icon>
          <FavoriteBorder />
        </Icon>
      </Actions>
      <Info>
        <InfoTitle>Quần dài nữ chất liệu gió túi hộp</InfoTitle>
        <Price>{formatCurrency(200000)}</Price>
      </Info>
    </Container>
  );
};

Product.propTypes = {
  item: PropTypes.object,
};

export default Product;
