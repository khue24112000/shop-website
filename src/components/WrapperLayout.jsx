import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  padding-left: 5vw;
  padding-right: 5vw;
`;

// eslint-disable-next-line react/prop-types
function WrapperLayout({ children }) {
  return <Wrapper>{children}</Wrapper>;
}

export default WrapperLayout;
