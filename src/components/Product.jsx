import styled from "styled-components";
import PropTypes from "prop-types";
import { formatCurrency } from "../utils/helpers";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/cartSlice";
import { successToast } from "../redux/toastSlice";

const Container = styled.div`
  /* margin: 5px; */
  min-width: 280px;
  height: 486px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: transparent;
  position: relative;
  /* height: fit-content; */
  /* box-shadow: var(--shadow-md); */
`;

const AddContainer = styled.div`
  opacity: 0;
  width: calc(100% - 40px);
  min-height: 100px;
  position: absolute;
  bottom: 108px;
  left: 20px;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  transition: all 0.5s ease;
  border-radius: 20px;
  padding: 20px;

  &:hover {
    opacity: 1;
  }
`;

const AddTitle = styled.p`
  text-align: center;
  color: white;
  margin-bottom: 20px;
`;

const AddSize = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const AddSizeItem = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  min-width: 32px;
  height: 36px;
  border-radius: 5px;
  background-color: white;
  color: var(--color-grey-700);
  transition: all linear 0.2s;
  font-weight: 500;

  &:hover {
    background-color: var(--color-grey-500);
    color: var(--color-grey-100);
  }
`;

const Image = styled.img`
  height: 388px;
  width: 100%;
  border-radius: 10px;
  /* object-fit: cover; */
  /* z-index: 2; */
  /* background-color: transparent; */
`;

const StyledImage = styled(Link)`
  cursor: pointer;
  height: 100%;
  &:hover ~ ${AddContainer} {
    opacity: 1;
  }
`;

const AddColor = styled.div`
  display: flex;
  gap: 6px;
  padding-left: 6px;
  margin-top: 8px;
  align-self: flex-start;
`;

const ColorItem = styled.span`
  width: 24px;
  height: 24px;
  min-width: 24px;
  display: inline-block;
  border-radius: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border: ${(props) =>
    props.$active
      ? "1px solid var(--color-grey-700)"
      : "1px solid var(--color-grey-300)"};
  padding: 2px;
  background-clip: content-box !important;
  cursor: pointer;
  background-image: url(${(props) => props.$color});
`;

const Info = styled.div`
  padding: 8px 6px;
  align-self: flex-start;
  flex: 1;
`;
const InfoTitle = styled.p`
  /* white-space: nowrap; */
  -webkit-box-orient: vertical;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  overflow: hidden;
`;
const Price = styled.p`
  font-weight: 600;
`;

const Product = ({ item }) => {
  const [activeColor, setActiveColor] = useState(0);
  const dispatch = useDispatch();
  // console.log(activeColor);
  function handleAdd(size) {
    if (item) {
      console.log({
        ...item,
        quantity: 1,
        color: item.color.at(activeColor),
        size,
      });
      dispatch(
        addProduct({
          ...item,
          quantity: 1,
          color: item.color.at(activeColor),
          size,
        })
      );
      dispatch(successToast("Đã thêm vào giỏ hàng"));
    }
  }
  return (
    <Container>
      {/* <Circle /> */}
      <StyledImage to={`/product/${item._id}`}>
        <Image src={item.color[activeColor].productImg} alt="" />
      </StyledImage>
      <AddContainer>
        <AddTitle>Thêm nhanh vào giỏ hàng</AddTitle>
        <AddSize>
          {item.size.map((s) => (
            <AddSizeItem onClick={() => handleAdd(s)} key={s}>
              {s}
            </AddSizeItem>
          ))}
        </AddSize>
      </AddContainer>
      <AddColor>
        {item.color.map((c, i) => (
          <ColorItem
            onClick={() => setActiveColor(i)}
            key={i}
            $color={c.colorImg}
            $active={i === activeColor}
          ></ColorItem>
        ))}
      </AddColor>
      <Info>
        <Link to={`/product/${item._id}`}>
          <InfoTitle>{item.name}</InfoTitle>
        </Link>
        <Price>{formatCurrency(item.price)}</Price>
      </Info>
    </Container>
  );
};

Product.propTypes = {
  item: PropTypes.object,
};

export default Product;
