import styled from "styled-components";
import { Link } from "react-router-dom";

const TextContainer = styled.div`
  margin-top: 48px;
  width: 100%;
  padding: 0 calc(5vw + 20px);
  display: flex;
  justify-content: ${(props) => (props.$more ? "space-between" : "center")};
`;

const Title = styled.h3`
  text-transform: uppercase;
  font-weight: 600;
`;

const More = styled(Link)`
  text-decoration: underline;
`;

// eslint-disable-next-line react/prop-types
function Text({ title, moreButton = false, link = "/" }) {
  return (
    <TextContainer $more={moreButton}>
      <Title>{title}</Title>
      {moreButton ? <More to={link}>Xem thêm</More> : ""}
    </TextContainer>
  );
}

export default Text;
