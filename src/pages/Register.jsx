import styled from "styled-components";
import { mobile } from "../responsive";
import NavBar from "../ui/NavBar";
import Footer from "../ui/Footer";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #fcf5f5;

  /* background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center; */
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  box-shadow: var(--shadow-md) ${mobile({ width: "75%" })};
`;

const Title = styled.h1`
  font-size: 2.4rem;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 5px 0px 5px;
  padding: 10px;
`;

const Select = styled.select`
  flex: 1;
  min-width: 40%;
  margin: 20px 5px 0px 5px;
  padding: 10px;
`;

const Button = styled.button`
  width: 100%;
  margin: 20px 5px 20px 5px;
  border: none;
  padding: 15px 20px;
  background-color: var(--primary-color);
  color: white;
  cursor: pointer;
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 1.6rem;
  text-decoration: underline;
  cursor: pointer;
`;

const Login = styled.div`
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: 5px;
`;

const Register = () => {
  return (
    <>
      <NavBar />
      <Container>
        <Wrapper>
          <Title>Tạo tài khoản</Title>
          <Form>
            <Input placeholder="Họ và tên" />
            <Input placeholder="Tên đăng nhập" />
            <Input placeholder="Mật khẩu" />
            <Input placeholder="Xác nhận mật khẩu" />
            <Input placeholder="Email" />
            <Input placeholder="Số điện thoại" />
            <Select>
              <option selected>Tỉnh thành</option>
            </Select>
            <Select>
              <option selected>Quận huyện</option>
            </Select>
            <Select>
              <option selected>Phường xã</option>
            </Select>
            <Input placeholder="Địa chỉ" />
            <Button>Đăng ký</Button>
          </Form>
          <Login>
            Bạn đã có tài khoản?
            <Link>Đăng nhập</Link>
          </Login>
        </Wrapper>
      </Container>
      <Footer />
    </>
  );
};

export default Register;
