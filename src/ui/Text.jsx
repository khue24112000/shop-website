import styled from "styled-components";
import PropTypes from "prop-types";

const TextContainer = styled.p`
  margin-top: 36px;
  font-size: 1.8rem;
  font-weight: 600;
  display: block;
  text-transform: uppercase;
  text-align: center;
`;

function Text({ children }) {
  return <TextContainer>{children}</TextContainer>;
}

Text.propTypes = {
  children: PropTypes.string,
};

export default Text;
