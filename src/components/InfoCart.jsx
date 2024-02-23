import styled, { css } from "styled-components";
import { Link, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { validateCart } from "../utils/validate";
import { SelectDistrict, SelectProvince, SelectWards } from "./SelectAddress";
import { publicRequest, userRequest } from "../utils/requestMethod";
import { resetCart } from "../redux/cartSlice";
import { formatCurrency } from "../utils/helpers";
import {
  getDistricts,
  getProvinces,
  getWards,
} from "../utils/vietnameProvinces";

const paymentList = [
  {
    img: "https://www.coolmate.me/images/COD.svg",
    id: "COD",
    name: "COD",
    content: "Thanh toán khi nhận hàng",
  },
  // {
  //   img: "https://www.coolmate.me/images/momo-icon.png",
  //   id: "MoMo",
  //   name: "Thanh toán MoMo",
  //   content: "",
  // },
];

const Info = styled.div`
  flex: 3;
  padding-right: 25px;
`;

const general = css`
  padding: 6px 10px;
  border-radius: 10px;
  border: 1px solid var(--color-grey-300);
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  justify-content: space-between;
  padding: 8px;
`;

const StyledLink = styled(Link)`
  color: var(--primary-color);
`;

const Input = styled.input`
  width: 100%;
  ${general}
  &:focus {
    border-color: ${(props) => (props.$error ? "red" : "var(--primary-color)")};
  }
  ${(props) => (props.$error ? "border-color: red" : "")}
`;

const Transport = styled.div`
  margin-bottom: 30px;
`;
const Payment = styled.div`
  margin-bottom: 30px;
`;

const Title = styled.h1``;

const Label = styled.label`
  display: flex;
  gap: 16px;
  align-items: center;
  min-height: 64px;
  ${general}
  padding: 10px 10px;
  flex: 1;
  position: relative;
  cursor: pointer;

  &:hover {
    border: 1px solid var(--primary-color);
    &::before {
      background-color: transparent;
    }
  }

  ${(props) =>
    props.$active
      ? css`
          border: 1px solid var(--primary-color);
        `
      : css`
          &::before {
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            z-index: 1;
            width: 100%;
            height: 100%;
            border-radius: 10px;
            background-color: rgba(255, 255, 255, 0.4);
          }
        `};
`;

const Radio = styled.input`
  width: 20px;
  height: 20px;
`;

const PaymentImage = styled.img`
  min-width: 24px;
  max-height: 24px;
  max-width: 48px;
`;
const PaymentContent = styled.div``;
const PaymentName = styled.p``;

const Button = styled.button`
  ${general};
  padding: 16px 0;
  flex: 1;
  background-color: var(--primary-color);
  color: white;

  &:hover {
    opacity: ${(props) => (props.$disabled ? "1" : "0.9")};
  }

  &:disabled {
    background-color: var(--color-grey-300);
    color: var(--color-grey-500);
  }
`;

const InputContainer = styled.div`
  flex: 1;
  align-self: flex-start;
`;

const ErrorText = styled.p`
  color: ${(props) => (props.$error ? "red" : "transparent")};
`;

function InfoCart() {
  // console.log(getProvinces());
  // console.log(getDistricts("Thành phố Hà Nội"));
  const currentUser = useSelector((state) => state.user.currentUser);
  const { total, products, shippingCost } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State
  const [province, setProvince] = useState(() => {
    if (
      currentUser &&
      getProvinces().includes(currentUser?.address.split(", ").at(-1))
    )
      return currentUser?.address.split(", ").at(-1);
    else return "Hà Nội";
  });
  const [district, setDistrict] = useState(() => {
    if (
      currentUser &&
      getDistricts(province).includes(currentUser?.address.split(", ").at(-2))
    )
      return currentUser?.address.split(", ").at(-2);
    else return "";
  });
  const [ward, setWard] = useState(() => {
    if (
      currentUser &&
      getWards(province, district).includes(
        currentUser?.address.split(", ").at(-3)
      )
    )
      return currentUser?.address.split(", ").at(-3);
    else return "";
  });
  const [dataInput, setDataInput] = useState({
    name: currentUser ? currentUser?.fullName : "",
    phoneNumber: currentUser ? currentUser?.phoneNumber : "",
    email: currentUser ? currentUser?.email : "",
    address: "",
    note: currentUser ? currentUser?.note : "",
  });
  const [payment, setPayment] = useState("COD");
  const [errors, setErrors] = useState([]);
  const [canCheckout, setCanCheckout] = useState(false);

  // Destructure
  const { name, phoneNumber, email, address, note } = dataInput;
  // console.log(total, shippingCost);
  // console.log(products);
  // console.log(dataInput);
  // console.log(errors);

  // console.log({
  //   fullName: name,
  //   phoneNumber,
  //   email,
  //   userId: currentUser ? currentUser._id : " ",
  //   note,
  //   paymentMethod: payment,
  //   address: `${address}, ${ward}, ${district}, ${province}`,
  //   shippingCost,
  //   products: products?.map((product) => {
  //     return {
  //       productId: product._id,
  //       quantity: product.quantity,
  //       size: product.size,
  //       color: product.color,
  //     };
  //   }),
  //   totalPrice: total,
  // });

  function handleChange(e) {
    setErrors((prev) => prev.filter((err) => err !== e.target.name));
    setDataInput((prev) => {
      if (e.target.value) return { ...prev, [e.target.name]: e.target.value };
      else return { ...prev, [e.target.name]: "" };
    });
  }

  function handleClickPay() {
    if (
      validateCart(
        dataInput.name,
        dataInput.phoneNumber,
        dataInput.address,
        district
      ).length > 0
    ) {
      setCanCheckout(false);
      setErrors(
        validateCart(
          dataInput.name,
          dataInput.phoneNumber,
          dataInput.address,
          district
        )
      );
    } else {
      setCanCheckout(true);
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

  useEffect(() => {
    async function checkout() {
      try {
        await publicRequest.post("/order", {
          fullName: name,
          phoneNumber,
          email,
          userId: currentUser ? currentUser._id : null,
          note,
          paymentMethod: payment,
          address: `${address}, ${ward}, ${district}, ${province}`,
          products: products?.map((product) => {
            return {
              productId: product._id,
              quantity: product.quantity,
              size: product.size,
              color: product.color,
            };
          }),
          shippingCost,
          totalPrice: total,
        });
        const res = await publicRequest.get("/product/customer");
        const resProduct = res.data;
        const newProduct = resProduct.filter((p) => {
          // console.log(products.map((product) => product._id).includes(p._id));
          return products.map((product) => product._id).includes(p._id);
        });
        const soldProducts = newProduct.map((p) => {
          return {
            ...p,
            amount:
              p.amount -
              products.find((product) => product._id === p._id).quantity,
          };
        });
        soldProducts.forEach(async (p) => {
          await publicRequest.put(`/product/${p._id}`, p);
        });
        // products?.forEach(async (product) => {
        //   try{
        //     await publicRequest.put(`/product/${product._id}`, {...product, quantity: })

        //   }
        // })
        dispatch(resetCart());
        navigate("/success");
      } catch (err) {
        console.log(err);
      }
    }
    if (canCheckout) checkout();
  }, [canCheckout]);

  return (
    <Info>
      <Transport>
        <Row>
          <Title>Thông tin vận chuyển</Title>
          {!currentUser && (
            <span className="transporttext">
              Bạn đã có tài khoản?
              <StyledLink to="/login">Đăng nhập ngay</StyledLink>
            </span>
          )}
        </Row>
        <div className="transportInfo">
          <Row>
            <InputContainer>
              <Input
                onChange={handleChange}
                name="name"
                type="text"
                value={dataInput.name}
                placeholder="Họ và tên"
                $error={errors.includes("name")}
              />
              {errors.includes("name") && (
                <ErrorText $error>Vui lòng nhập thông tin này!</ErrorText>
              )}
            </InputContainer>
            <InputContainer>
              <Input
                onChange={handleChange}
                name="phoneNumber"
                type="text"
                value={dataInput.phoneNumber}
                placeholder="Số điện thoại"
                $error={errors.includes("phoneNumber")}
              />
              {errors.includes("phoneNumber") && (
                <ErrorText $error>Vui lòng nhập thông tin này!</ErrorText>
              )}
            </InputContainer>
          </Row>
          <Row>
            <InputContainer>
              <Input
                onChange={handleChange}
                name="email"
                type="text"
                value={dataInput.email}
                placeholder="Email"
                disabled={currentUser}
              />
            </InputContainer>
          </Row>
          <Row>
            <InputContainer>
              <Input
                onChange={handleChange}
                name="address"
                type="text"
                value={dataInput.address}
                placeholder="Địa chỉ (ví dụ: Thôn Lâm Tiên, xã Nguyên Khê)"
                $error={errors.includes("address")}
              />
              {errors.includes("address") && (
                <ErrorText $error>Vui lòng nhập thông tin này!</ErrorText>
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
              {errors.includes("district") && (
                <ErrorText $error>Vui lòng chọn thông tin này!</ErrorText>
              )}
            </InputContainer>
            <InputContainer>
              <SelectWards
                value={ward}
                handleChange={handleChangeWard}
                province={province}
                district={district}
              />
            </InputContainer>
          </Row>
          <Row>
            <Input
              onChange={handleChange}
              name="note"
              type="text"
              value={dataInput.note}
              placeholder="Ghi chú thêm (Ví dụ: Giao hàng giờ hành chính)"
            />
          </Row>
        </div>
      </Transport>
      <Payment>
        <Row>
          <Title>Hình thức thanh toán</Title>
        </Row>
        {paymentList.map((item) => (
          <Row key={item.id}>
            <Label
              onClick={() => setPayment(item.id)}
              htmlFor={item.id}
              $active={item.id === payment}
            >
              <Radio
                checked={item.id === payment}
                type="radio"
                name="payment"
                id={item.id}
                onChange={() => {
                  return;
                }}
              />
              <PaymentImage src={item.img} />
              <PaymentContent>
                <PaymentName>{item.name}</PaymentName>
                <PaymentName>{item.content}</PaymentName>
              </PaymentContent>
            </Label>
          </Row>
        ))}
        {/* <Row>
      <Label
        $checked={}
        onClick={(e) => setPayment(e.target.htmlFor)}
        htmlFor="1"
      >
        <Radio type="radio" name="payment" id="1" />
        <img src="https://www.coolmate.me/images/COD.svg" />
        <div>
          <p>Cod</p>
          <p>Giao hang tai nha</p>
        </div>
      </Label>
    </Row>
    <Row>
      <Label htmlFor="2">
        <Radio checked type="radio" name="payment" id="2" />
        <span>HÌnh to vcl</span>
        <div>
          <p>Bank</p>
          <p>Chuyển khoản</p>
        </div>
      </Label>
    </Row> */}
      </Payment>
      <Row>
        <Button onClick={handleClickPay} disabled={!total}>
          Thanh toán {total ? formatCurrency(total + shippingCost) : ""} (
          {payment})
        </Button>
      </Row>
    </Info>
  );
}

export default InfoCart;
