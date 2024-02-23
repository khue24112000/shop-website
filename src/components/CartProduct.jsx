import styled from "styled-components";
import PropTypes from "prop-types";
import { Add, Remove } from "@mui/icons-material";
import { formatCurrency } from "../utils/helpers";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteProduct, updateProduct } from "../redux/cartSlice";
import useDebounce from "../hooks/useDebounce";
import { successToast } from "../redux/toastSlice";

const ItemImageContainer = styled.div`
  position: relative;
`;
const ItemImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 10px;
`;

const ItemAmount = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
  min-width: 20px;
  border-radius: 10px;
  padding: 2px 4px;
  background-color: var(--primary-color);
  color: white;
  transform: translate(50%, -50%);
`;

const ItemInfo = styled.div`
  padding-left: 10px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 50px;
  position: relative;
`;

const ItemTitle = styled.div``;
const ItemName = styled.h3`
  display: inline-block;
  max-width: 90%;
`;
const ItemType = styled.p``;
const ItemPricing = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;
const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 2px 4px;
  border-radius: 10px;
  border: 1px solid var(--color-grey-700);
`;
const Amount = styled.input`
  border: none;
  max-width: 24px;

  text-align: center;
`;

const Price = styled.span`
  flex: 1;
  text-align: right;
`;

const Icon = styled.span`
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const DeleleProduct = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  line-height: calc(1 / 2.6);
  font-size: 2.6rem;
  cursor: pointer;
`;

// eslint-disable-next-line react/prop-types
function CartProduct({ product }) {
  const [quantity, setQuantity] = useState(product?.quantity);
  const debounceQuantity = useDebounce(quantity, 1000);

  // console.log(product);
  const dispatch = useDispatch();

  function handleChangeQuantity(value) {
    setQuantity(value);
  }

  function handleDelete() {
    dispatch(deleteProduct(product._id));
  }

  useEffect(() => {
    if (debounceQuantity !== product?.quantity) {
      dispatch(updateProduct({ ...product, quantity: +debounceQuantity }));
      dispatch(successToast("Update giỏ hàng thành công"));
    }
  }, [debounceQuantity, dispatch]);

  return (
    <>
      <ItemImageContainer>
        <ItemImage src={product.color.productImg} />
        <ItemAmount>{product.quantity}</ItemAmount>
      </ItemImageContainer>
      <ItemInfo>
        <ItemTitle>
          <ItemName>{product.name}</ItemName>
          <ItemType>
            {product.color?.colorName} / {product.size}
          </ItemType>
        </ItemTitle>
        <ItemPricing>
          <AmountContainer>
            <Icon>
              <Remove
                onClick={() =>
                  handleChangeQuantity(
                    quantity - 1 === 0 ? quantity : quantity - 1
                  )
                }
              />
            </Icon>
            <Amount
              type="text"
              value={quantity}
              onChange={(e) =>
                isNaN(e.target.value) || e.target.value > product.amount
                  ? handleChangeQuantity(quantity)
                  : handleChangeQuantity(e.target.value)
              }
            />
            <Icon>
              <Add
                onClick={() =>
                  handleChangeQuantity(
                    quantity + 1 > product.amount ? quantity : quantity + 1
                  )
                }
              />
            </Icon>
          </AmountContainer>
          <Price>{formatCurrency(product.price * product.quantity)}</Price>
        </ItemPricing>
        <DeleleProduct onClick={handleDelete}>&times;</DeleleProduct>
      </ItemInfo>
    </>
  );
}

CartProduct.propTypes = {
  product: PropTypes.object,
};
export default CartProduct;
