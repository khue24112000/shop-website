import styled from "styled-components";

const Container = styled.div`
  height: 30px;
  background-color: #1976d2;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  font-weight: 500;
  text-transform: uppercase;
`;

const Announcement = () => {
  return (
    <Container>Đổi hàng miễn phí - tại tất cả cửa hàng trong 30 ngày</Container>
  );
};

export default Announcement;
