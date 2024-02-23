import styled from "styled-components";
import NavbarMenu from "./NavbarMenu";
import NavbarActions from "./NavbarActions";
import WrapperLayout from "./WrapperLayout";
import { Link } from "react-router-dom";
import Search from "./Search";

const Container = styled.div`
  height: 70px;
  background-color: #fff;
  box-shadow: var(--shadow-md);
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

const Logo = styled.span`
  display: inline-block;
  /* margin-left: 130px; */
  color: white;
  background-color: var(--primary-color);
  font-size: 2rem;
  font-weight: bold;
  border: 2px solid var(--primary-color);
  padding: 5px;
  border-radius: 10px;
  cursor: pointer;
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

function NavBar() {
  return (
    <Container>
      <WrapperLayout>
        <Wrapper>
          <Menu>
            <Link to="/">
              <Logo>K Store</Logo>
            </Link>
            <NavbarMenu />
          </Menu>
          <Search />
          <NavbarActions />
        </Wrapper>
      </WrapperLayout>
    </Container>
  );
}

export default NavBar;
