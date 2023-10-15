import styled from "styled-components";
import NavbarMenu from "./NavbarMenu";
import NavbarActions from "./NavbarActions";
import WrapperLayout from "./WrapperLayout";

const Container = styled.div`
  height: 70px;
  background-color: #fff;
  box-shadow: var(--shadow-md);
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 99999;
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
  margin-left: 130px;
  font-size: 2rem;
  font-weight: bold;
  cursor: pointer;
`;

function NavBar() {
  return (
    <Container>
      <WrapperLayout>
        <Wrapper>
          <NavbarMenu />
          <Logo>K Store</Logo>
          <NavbarActions />
        </Wrapper>
      </WrapperLayout>
    </Container>
  );
}

export default NavBar;
