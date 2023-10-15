import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  height: 60vh;
  margin-top: 56px;
  background-color: #fcf5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Title = styled.h1`
  font-size: 4.2rem;
  margin-bottom: 20px;
`;

const Desc = styled.div`
  font-size: 2.4rem;
  font-weight: 300;
  margin-bottom: 20px;
  ${mobile({ textAlign: "center" })}
`;

const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
  ${mobile({ width: "80%" })}
`;

const Input = styled.input`
  border: none;
  flex: 8;
  padding-left: 20px;
`;

const Button = styled.button`
  flex: 2;
  border: none;
  background-color: #1976d2;
  color: white;
`;

const Newsletter = () => {
  return (
    <Container>
      <Title>Đăng ký nhận bản tin</Title>
      <Desc>
        Cùng KStore cập nhật những thông tin mới nhất về thời trang và phong
        cách sống.
      </Desc>
      <InputContainer>
        <Input placeholder="Nhập email đăng ký của bạn" />
        <Button>Đăng ký</Button>
      </InputContainer>
    </Container>
  );
};

export default Newsletter;
