import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`;

const Title = styled.h1`
  margin-bottom: 20px;
`;

const Button = styled.button`
  border: none;
  color: white;
  padding: 10px;
  background-color: var(--primary-color);
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  margin-bottom: 10px;
  &:hover {
    opacity: 0.9;
  }
`;

const CategoryItem = ({ item }) => {
  return (
    <Container>
      <Image src={item.img} />
      <Info>
        <Title>{item.title}</Title>
        <Link to={`/category/${item.cat}`}>
          <Button>Mua ngay</Button>
        </Link>
      </Info>
    </Container>
  );
};

CategoryItem.propTypes = {
  item: PropTypes.object,
};

export default CategoryItem;
