import { Add, Remove } from "@mui/icons-material";
import styled from "styled-components";
import { mobile } from "../responsive";
import WrapperLayout from "../components/WrapperLayout";
import { formatCurrency } from "../utils/helpers";
import Text from "../components/Text";
import Products from "../components/Products";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/cartSlice";
import { useProduct } from "../context/useProduct";
import { successToast } from "../redux/toastSlice";
import { publicRequest } from "../utils/requestMethod";

const Container = styled.div`
  padding-bottom: 36px;
  background-image: linear-gradient(white, #f3f4f65e);
`;

const Wrapper = styled.div`
  margin-top: 70px;
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: contain;
  border-radius: 10px;
  ${mobile({ height: "40vh" })}
`;

const Form = styled.form`
  flex: 1;
  padding-left: 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 500;
`;

const SubTitle = styled.p``;

const Desc = styled.div`
  margin: 20px 0px;
`;

const Price = styled.span`
  display: block;
  margin-top: 16px;
  font-weight: 600;
  font-size: 3.6rem;
  text-decoration: ${(props) => (props.soldOut ? "line-through" : "")};
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  max-width: 50%;
  gap: 6px;
  margin: 20px 0;
`;

// const FilterContainer = styled.div`
//   width: 70%;
//   margin: 26px 0px;
//   display: flex;
//   justify-content: space-between;
//   ${mobile({ width: "100%" })}
// `;

// const Filter = styled.div`
//   display: flex;
//   align-items: center;
// `;

const ContentTitle = styled.span`
  font-size: 2rem;
  font-weight: 500;
`;

const FilterColor = styled.div`
  width: 24px;
  height: 24px;
  min-width: 24px;
  display: inline-block;
  border-radius: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border: ${(props) =>
    props.$active
      ? "1px solid var(--color-grey-700)"
      : "1px solid var(--color-grey-300)"};
  padding: 2px;
  background-clip: content-box !important;
  cursor: pointer;
  background-image: url(${(props) => props.$color});
`;

const FilterSize = styled.select`
  /* margin-left: auto; */
  padding: 5px;
  border-radius: 10px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 6px 10px;
  color: white;
  border: 2px solid teal;
  background-color: var(--primary-color);
  cursor: pointer;
  font-weight: 500;
  border-radius: 10px;

  &:hover {
    background-color: #002ce9a6;
  }
`;

const DescContent = styled.div``;

function Product() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);

  const product = products.find((p) => p._id === id);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(0);
  const [color, setColor] = useState(0);
  const dispatch = useDispatch();

  const newArr = products.reduce((arr, product) => {
    if (arr.length === 4) return arr;
    if (product._id === id) return arr;
    return [...arr, product];
  }, []);

  // console.log(product.desc.split("\n").join("<br/>"));

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(
      addProduct({
        ...product,
        size: product.size.at(size),
        color: product.color.at(color),
        quantity,
      })
    );
    dispatch(successToast("Thêm vào giỏ hàng thành công"));
  }

  useEffect(() => {
    async function getAllProduct() {
      try {
        const res = await publicRequest.get("/product/customer");
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getAllProduct();
  }, []);
  // useEffect(() => {
  //   async function getProducts() {
  //     try {
  //       const res = await publicRequest.get(`/product?category=all`);
  //       if (res.status === 200) setProducts(res.data);
  //       else throw new Error("Something wrong!");
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  //   getProducts();
  // }, []);

  // useEffect(() => {
  //   async function getProductById() {
  //     try {
  //       const res = await publicRequest.get(`/product/find/${id}`);
  //       if (res.status === 200) setProduct(res.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  //   getProductById();
  // }, [id]);

  return (
    <Container>
      <WrapperLayout>
        {product && (
          <Wrapper>
            <ImgContainer>
              <Image src={product?.color[color]?.productImg} />
            </ImgContainer>
            <Form onSubmit={handleSubmit}>
              <Title>{product?.name}</Title>
              <SubTitle>Mã sản phẩm: {product?._id}</SubTitle>
              <Price $soldOut = {}>{formatCurrency(product?.price)}</Price>

              <Row>
                <ContentTitle>Màu sắc: </ContentTitle>
                {product?.color?.map((c, i) => (
                  <FilterColor
                    onClick={() => setColor(i)}
                    $active={i === color}
                    key={c.colorName}
                    $color={c.colorImg}
                  />
                ))}
              </Row>
              <Row>
                <ContentTitle>Kích cỡ: </ContentTitle>
                <FilterSize
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                >
                  {product?.size?.map((s) => (
                    <FilterSizeOption key={s}>{s}</FilterSizeOption>
                  ))}
                </FilterSize>
              </Row>

              <AddContainer>
                <ContentTitle>Số lượng: </ContentTitle>
                <AmountContainer>
                  <Remove
                    onClick={() =>
                      setQuantity((prev) => (prev - 1 > 0 ? prev - 1 : prev))
                    }
                  />
                  <Amount>{quantity}</Amount>
                  <Add
                    onClick={() =>
                      setQuantity((prev) =>
                        prev + 1 > product?.amount ? prev : prev + 1
                      )
                    }
                  />
                </AmountContainer>
                <Button>Thêm vào giỏ</Button>
              </AddContainer>
              <Desc>
                <ContentTitle>Mô tả</ContentTitle>
                <DescContent>
                  {product?.desc?.split("\n")?.map((t, i) => (
                    <Fragment key={i}>
                      {t}
                      <br />
                    </Fragment>
                  ))}
                </DescContent>
              </Desc>
            </Form>
          </Wrapper>
        )}
        <Text title="Gợi ý cho bạn" />
      </WrapperLayout>
      <Products renderProducts={newArr} />
    </Container>
  );
}

export default Product;
