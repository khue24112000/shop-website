import styled from "styled-components";
import { Person, ShoppingCart, AccountCircle } from "@mui/icons-material";
import { Badge } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";
import { useEffect } from "react";
import { userRequest } from "../utils/requestMethod";

const Container = styled.div`
  display: flex;
  gap: 3rem;
  justify-content: flex-end;
`;

const UserOption = styled.div`
  display: none;
  position: absolute;
  width: 160px;
  left: -10px;
  top: calc(100% + 5px);
  background-color: white;
  border-radius: 10px;
  box-shadow: var(--shadow-md);
  cursor: default;
  border: 1px solid var(--color-grey-300);
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 18px;
    top: -14px;
    left: 0;
    display: block;

    background-color: transparent;
  }
`;

const ActionsItem = styled.div`
  min-width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  cursor: pointer;
  position: relative;

  &:hover > ${UserOption} {
    display: block;
  }
`;

const Text = styled.span`
  font-size: 1.4rem;
`;

// const UserIcon = styled.div``;

const OptionList = styled.ul`
  &:first-child {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
`;

const OptionItem = styled.li`
  cursor: pointer;
  /* margin: 10px 0; */
  padding: 10px 10px;

  &:hover {
    background-color: var(--color-grey-300);
  }
`;

function NavbarActions() {
  const { products, quantity } = useSelector((state) => state.cart);
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  // console.log(`/cart/find/${currentUser._id}`);
  // console.log(products);
  const navigate = useNavigate();

  function handleClick() {
    navigate("/order");
  }
  function handleLogout() {
    dispatch(logout());
  }

  useEffect(() => {
    async function getCart() {
      const request = userRequest();
      try {
        const resCart = await request.get(`/cart/find/${currentUser._id}`);
        console.log(products);
        if (resCart.data?.length === 0) {
          // Tao cart moi
          await request.post("/cart/", {
            userId: currentUser._id,
            products: products.map((p) => {
              return {
                productId: p?._id,
                size: p?.size,
                color: p?.color,
                quantity: p?.quantity,
              };
            }),
          });
        } else if (resCart.data?.length !== products?.length) {
          // Update db khi cart thay doi
          await request.put(`/cart/${resCart.data[0]._id}`, {
            products: products?.map((p) => {
              return {
                productId: p?._id,
                size: p?.size,
                color: p?.color,
                quantity: p?.quantity,
              };
            }),
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
    if (currentUser) {
      getCart();
    }
  }, [products, currentUser]);

  return (
    <Container>
      {currentUser ? (
        <ActionsItem>
          <AccountCircle sx={{ fontSize: 24, color: "var(--primary-color)" }} />
          <Text>Người dùng</Text>

          <UserOption>
            <OptionList>
              <OptionItem onClick={handleClick}>Lịch sử đơn hàng</OptionItem>

              <OptionItem onClick={handleLogout}>Đăng xuất</OptionItem>
            </OptionList>
          </UserOption>
        </ActionsItem>
      ) : (
        <Link to="/login">
          <ActionsItem>
            <Person sx={{ fontSize: 24 }} />
            <Text>Đăng nhập</Text>
          </ActionsItem>
        </Link>
      )}
      <Link to="cart">
        <ActionsItem>
          <Badge badgeContent={quantity} color="primary">
            <ShoppingCart sx={{ fontSize: 24 }} />
          </Badge>
          <Text>Giỏ hàng</Text>
        </ActionsItem>
      </Link>
    </Container>
  );
}

NavbarActions.propTypes = {
  isSearch: PropTypes.bool,
  setIsSearch: PropTypes.func,
};

export default NavbarActions;
