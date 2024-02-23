import styled from "styled-components";
import { Link } from "react-router-dom";

const list = [
  { name: "Nam", cat: "nam" },
  { name: "Nữ", cat: "nu" },
  { name: "Hàng mới", cat: "new" },
];

const MenuList = styled.ul`
  list-style: none;
  display: flex;
  gap: 1.4rem;
`;

const MenuItem = styled.li`
  font-size: 1.6rem;
  font-weight: bold;
  line-height: 4rem;
  position: relative;
  cursor: pointer;
  border-bottom: 3px solid transparent;
  text-transform: uppercase;
  &:hover {
    border-bottom-color: var(--primary-color);
  }
`;
function NavbarMenu() {
  return (
    <MenuList>
      {list.map((item) => (
        <Link to={`/category/${item.cat} `} key={item.name}>
          <MenuItem>{item.name}</MenuItem>
        </Link>
      ))}
    </MenuList>
  );
}

export default NavbarMenu;
