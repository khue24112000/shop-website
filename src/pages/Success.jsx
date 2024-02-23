import styled from "styled-components";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  font-weight: 500;
`;
const Noti = styled.p``;
const StyledLink = styled(Link)`
  margin-top: 20px;
  color: white;
  background-color: var(--primary-color);
  padding: 10px;
  border-radius: 10px;
`;

function Success() {
  return (
    <Container>
      <CheckCircleIcon sx={{ color: "green", fontSize: "10rem" }} />
      <Noti>Đặt hàng thành công</Noti>
      <Noti>
        Đơn hàng sẽ được vận chuyển đến địa chỉ của bạn trong thời gian sớm nhất
      </Noti>
      <StyledLink to="/category/all">Tiếp tục mua hàng</StyledLink>
    </Container>
  );
}

export default Success;
