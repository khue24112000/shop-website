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
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover; */
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  /* border: 2px solid var(--color-grey-700); */
  width: 30%;
  padding: 30px;
  background-color: white;
  ${mobile({ width: "75%" })}
  box-shadow: var(--shadow-md)
`;

const Title = styled.h1`
  font-size: 2.4rem;
  font-weight: 300;
  text-transform: uppercase;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  border: none;
  padding: 15px 20px;
  background-color: var(--primary-color);
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 1.6rem;
  text-decoration: underline;
  cursor: pointer;
`;

const Register = styled.div`
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Login = () => {
  return (
    <>
      <NavBar />
      <Container>
        <Wrapper>
          <Title>Đăng nhập</Title>
          <Form>
            <Input placeholder="Tên đăng nhập" />
            <Input placeholder="Mật khẩu" />
            <Button>Đăng nhâp</Button>
            <Link>Quên mật khẩu</Link>
            <Register>
              Bạn chưa có tài khoản?
              <Link>Đăng ký ngay</Link>
            </Register>
          </Form>
        </Wrapper>
      </Container>
      <Footer />
    </>
  );
};

export default Login;
