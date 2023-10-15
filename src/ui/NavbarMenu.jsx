import styled from "styled-components";

const list = ["Bộ sưu tập", "Sản phẩm", "Sản phẩm mới", "Sale"];

const MenuList = styled.ul`
  list-style: none;
  display: flex;
  gap: 1.4rem;
`;

const MenuItem = styled.li`
  font-size: 1.4rem;
  font-weight: bold;
  line-height: 4rem;
  position: relative;
  cursor: pointer;
  border-bottom: 1px solid transparent;

  &:hover {
    border-bottom-color: var(--color-grey-700);
  }
`;
function NavbarMenu() {
  return (
    <MenuList>
      {list.map((item) => (
        <MenuItem key={item}>{item}</MenuItem>
      ))}
    </MenuList>
  );
}

export default NavbarMenu;
