import styled from "styled-components";
import PropTypes from "prop-types";

const Wrapper = styled.div`
  width: 100%;
  padding-left: 5vw;
  padding-right: 5vw;
`;
function WrapperLayout({ children }) {
  return <Wrapper>{children}</Wrapper>;
}

WrapperLayout.propTypes = {
  children: PropTypes.element,
};
export default WrapperLayout;
