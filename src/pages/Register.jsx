import styled, { css } from "styled-components";
import { mobile } from "../responsive";
import { Link, useNavigate } from "react-router-dom";
import {
  SelectDistrict,
  SelectProvince,
  SelectWards,
} from "../components/SelectAddress";
import { useEffect, useState } from "react";
import { validateRegister } from "../utils/validate";
import { publicRequest } from "../utils/requestMethod";
import Spinner from "../components/Spinner";
import { useDispatch } from "react-redux";
import { errorToast, successToast } from "../redux/toastSlice";

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
  font-weight: 500;
`;

const bRadius10 = css`
  border-radius: 10px;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${bRadius10};
  box-shadow: var(--shadow-md) ${mobile({ width: "75%" })};
`;

const Title = styled.h1`
  font-size: 2.4rem;
  text-align: center;
  color: var(--primary-color);
  /* font-weight: 300;   */
  text-transform: uppercase;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  width: 100%;

  /* margin: 10px 0; */
  padding: 6px 10px;
  border: 1px solid var(--color-grey-300);
  ${bRadius10};
  &:focus {
    border-color: ${(props) => (props.$error ? "red" : "var(--primary-color)")};
  }
  ${(props) => (props.$error ? "border-color: red" : "")}
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  justify-content: space-between;
  padding: 8px;
  width: 100%;
`;

const Button = styled.button`
  width: 100%;
  /* margin: 20px 5px 20px 5px; */
  border: none;
  padding: 10px;
  background-color: var(--primary-color);
  color: white;
  cursor: pointer;
  /* transition: all linear 1s; */
  ${bRadius10}
`;

const StyledLink = styled(Link)`
  margin: 5px 0px;
  font-size: 1.6rem;

  cursor: pointer;
  color: var(--primary-color);
`;

const Login = styled.div`
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: 5px;
`;

const InputContainer = styled.div`
  flex: 1;
  align-self: flex-start;
`;

const ErrorText = styled.p`
  color: ${(props) => (props.$error ? "red" : "transparent")};
`;

const Register = () => {
  const dispatch = useDispatch();
  const [province, setProvince] = useState("Hà Nội");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [errors, setErrors] = useState([]);
  const [dataInput, setDataInput] = useState({
    fullName: "",
    username: "",
    password: "",
    email: "",
    phoneNumber: "",
    address: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [canRegister, setCanRegister] = useState(false);

  const { fullName, username, password, email, phoneNumber, address } =
    dataInput;
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const navigate = useNavigate();

  // console.log(errors);
  // console.log(canRegister);

  function handleChange(e) {
    setErrors((prev) => prev.filter((err) => err.name !== e.target.name));
    setDataInput((prev) => {
      if (e.target.value) {
        if (e.target.name === "fullName" || e.target.name === "address")
          return { ...prev, [e.target.name]: e.target.value };
        else return { ...prev, [e.target.name]: e.target.value.trim() };
      } else return { ...prev, [e.target.name]: "" };
    });
  }

  function handleChangePasswordConfirm(e) {
    if (e.target.value) setPasswordConfirm(e.target.value.trim());
    else setPasswordConfirm("");
    if (e.target.value.trim() !== dataInput.password) {
      setErrors((prev) => {
        if (prev.filter((e) => e.name === "passwordConfirm").length !== 0)
          return prev;
        else
          return [
            ...prev,
            {
              name: "passwordConfirm",
              error: "Mật khẩu không khớp",
            },
          ];
      });
    } else {
      setErrors((prev) => prev.filter((e) => e.name !== "passwordConfirm"));
    }
  }

  function handleChangeProvince(e) {
    setProvince(e.target.value);
    setDistrict("");
    setWard("");
  }
  function handleChangeDistrict(e) {
    setErrors((prev) => prev.filter((err) => err.name !== "district"));
    setDistrict(e.target.value);
  }
  function handleChangeWard(e) {
    setWard(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errorsArr = validateRegister({
      ...dataInput,
      district,
      passwordConfirm,
    });

    if (errorsArr.length > 0) {
      setCanRegister(false);
      setErrors(() => errorsArr);
      setErrors((prev) => {
        dispatch(errorToast(prev.at(prev.length - 1).error));
        return prev;
      });
    } else {
      setCanRegister(true);
    }
  }

  useEffect(() => {
    async function register() {
      // console.log(1);
      setIsLoading(true);
      try {
        await publicRequest.post("/auth/register", {
          fullName,
          username,
          password,
          email,
          phoneNumber,
          address: `${address}, ${ward}, ${district}, ${province}`,
        });
        dispatch(successToast("Đăng kí thành công"));
        navigate("/");
      } catch (err) {
        setCanRegister(false);
        dispatch(errorToast("Tên đặng nhập hoặc email đã tồn tại"));
        console.log(err);
      }
      setIsLoading(false);
    }
    if (canRegister) register();
  }, [canRegister]);
  return (
    <>
      <Container>
        <Wrapper>
          <Title>Tạo tài khoản</Title>
          <Form onSubmit={handleSubmit}>
            <Row>
              <InputContainer>
                <Input
                  name="fullName"
                  onChange={handleChange}
                  value={dataInput?.fullName || ""}
                  $error={
                    errors.findIndex((err) => err.name === "fullName") !== -1
                  }
                  placeholder="Họ và tên"
                />
                {errors.findIndex((err) => err.name === "fullName") !== -1 && (
                  <ErrorText $error>
                    {
                      errors.at(
                        errors.findIndex((err) => err.name === "fullName")
                      ).error
                    }
                  </ErrorText>
                )}
              </InputContainer>
              <InputContainer>
                <Input
                  name="username"
                  onChange={handleChange}
                  value={dataInput?.username || ""}
                  $error={
                    errors.findIndex((err) => err.name === "username") !== -1
                  }
                  placeholder="Tên đăng nhập"
                />
                {errors.findIndex((err) => err.name === "username") !== -1 && (
                  <ErrorText $error>
                    {
                      errors.at(
                        errors.findIndex((err) => err.name === "username")
                      ).error
                    }
                  </ErrorText>
                )}
              </InputContainer>
            </Row>
            <Row>
              <InputContainer>
                <Input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  value={dataInput?.password || ""}
                  $error={
                    errors.findIndex((err) => err.name === "password") !== -1
                  }
                  placeholder="Mật khẩu"
                />
                {errors.findIndex((err) => err.name === "password") !== -1 && (
                  <ErrorText $error>
                    {
                      errors.at(
                        errors.findIndex((err) => err.name === "password")
                      ).error
                    }
                  </ErrorText>
                )}
              </InputContainer>
              <InputContainer>
                <Input
                  type="password"
                  name="passwordConfirm"
                  onChange={handleChangePasswordConfirm}
                  value={passwordConfirm}
                  placeholder="Xác nhận mật khẩu"
                  $error={
                    errors.findIndex(
                      (err) => err.name === "passwordConfirm"
                    ) !== -1
                  }
                />
                {errors.findIndex((err) => err.name === "passwordConfirm") !==
                  -1 && (
                  <ErrorText $error>
                    {
                      errors.at(
                        errors.findIndex(
                          (err) => err.name === "passwordConfirm"
                        )
                      ).error
                    }
                  </ErrorText>
                )}
              </InputContainer>
            </Row>
            <Row>
              <InputContainer>
                <Input
                  name="email"
                  onChange={handleChange}
                  value={dataInput?.email || ""}
                  $error={
                    errors.findIndex((err) => err.name === "email") !== -1
                  }
                  placeholder="Email"
                />
                {errors.findIndex((err) => err.name === "email") !== -1 && (
                  <ErrorText $error>
                    {
                      errors.at(errors.findIndex((err) => err.name === "email"))
                        .error
                    }
                  </ErrorText>
                )}
              </InputContainer>
            </Row>
            <Row>
              <InputContainer>
                <SelectProvince
                  value={province}
                  handleChange={handleChangeProvince}
                />
              </InputContainer>
              <InputContainer>
                <SelectDistrict
                  value={district}
                  handleChange={handleChangeDistrict}
                  errors={errors}
                  province={province}
                />
                {errors.findIndex((err) => err.name === "district") !== -1 && (
                  <ErrorText $error>
                    {
                      errors.at(
                        errors.findIndex((err) => err.name === "district")
                      ).error
                    }
                  </ErrorText>
                )}
              </InputContainer>
            </Row>
            <Row>
              <InputContainer>
                <SelectWards
                  value={ward}
                  handleChange={handleChangeWard}
                  province={province}
                  district={district}
                />
              </InputContainer>
              <InputContainer>
                <Input
                  name="phoneNumber"
                  onChange={handleChange}
                  value={dataInput?.phoneNumber || ""}
                  $error={
                    errors.findIndex((err) => err.name === "phoneNumber") !== -1
                  }
                  placeholder="Số điện thoại"
                />
                {errors.findIndex((err) => err.name === "phoneNumber") !==
                  -1 && (
                  <ErrorText $error>
                    {
                      errors.at(
                        errors.findIndex((err) => err.name === "phoneNumber")
                      ).error
                    }
                  </ErrorText>
                )}
              </InputContainer>
            </Row>
            <Row>
              <InputContainer>
                <Input
                  name="address"
                  onChange={handleChange}
                  value={dataInput?.address || ""}
                  $error={
                    errors.findIndex((err) => err.name === "address") !== -1
                  }
                  placeholder="Địa chỉ"
                />
                {errors.findIndex((err) => err.name === "address") !== -1 && (
                  <ErrorText $error>
                    {
                      errors.at(
                        errors.findIndex((err) => err.name === "address")
                      ).error
                    }
                  </ErrorText>
                )}
              </InputContainer>
            </Row>
            <Row>
              <Button>{isLoading ? <Spinner size="3rem" /> : "Đăng ký"}</Button>
            </Row>
          </Form>
          <Row>
            <Login>
              Bạn đã có tài khoản?
              <StyledLink to="/login">Đăng nhập</StyledLink>
            </Login>
          </Row>
        </Wrapper>
      </Container>
    </>
  );
};

export default Register;
