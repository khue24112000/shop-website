import styled from "styled-components";
import { Search, Person, ShoppingCart } from "@mui/icons-material";
import { Badge } from "@mui/material";

import PropTypes from "prop-types";

const Container = styled.div`
  display: flex;
  gap: 3rem;
  justify-content: flex-end;
`;

const ActionsItem = styled.div`
  width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const SearchContainer = styled.div`
  display: flex;
  padding: 10px 16px;
  align-items: center;
  gap: 8px;
  border: 1px solid var(--color-grey-300);
  /* border-radius: 100px; */
`;

const Input = styled.input`
  border: none;
  outline: none;
  flex: 1;
`;

const Text = styled.span`
  font-size: 1.4rem;
`;

function NavbarActions() {
  return (
    <Container>
      <SearchContainer>
        <Search fontSize="large" />
        <Input placeholder="Tìm kiếm sản phẩm" />
      </SearchContainer>
      <ActionsItem>
        <Person sx={{ fontSize: 24 }} />
        <Text>Đăng nhập</Text>
      </ActionsItem>
      <ActionsItem>
        <Badge badgeContent={4} color="primary">
          <ShoppingCart sx={{ fontSize: 24 }} />
        </Badge>
        <Text>Giỏ hàng</Text>
      </ActionsItem>
    </Container>
  );
}

NavbarActions.propTypes = {
  isSearch: PropTypes.bool,
  setIsSearch: PropTypes.func,
};

export default NavbarActions;
