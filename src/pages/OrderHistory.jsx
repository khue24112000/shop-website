import styled, { css } from "styled-components";
import WrapperLayout from "../components/WrapperLayout";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { publicRequest, userRequest } from "../utils/requestMethod";
import { useSelector } from "react-redux";
import { formatCurrency, formatDate } from "../utils/helpers";

const Container = styled.div`
  margin-top: 70px;
  padding-bottom: 36px;
  background-image: linear-gradient(white, #f3f4f65e);
  height: 100vh;
  max-height: 100vh;
  overflow-y: auto;
`;

const Title = styled.h1`
  display: inline-block;
  margin: 20px;
`;

const Row = styled.div`
  width: ${(props) => props.$width};
  margin: 5px 0;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const OrderList = styled.div`
  margin: 0 20px;
  background-color: white;
  box-shadow: var(--shadow-sm);
`;

const OrderItem = styled.div`
  position: relative;
  border: 1px solid var(--color-grey-300);
  margin-bottom: 20px;
  border-radius: 10px;
`;

const OrderText = styled.span`
  flex: 1;
  font-weight: 500;
`;
const OrderTitle = styled.span`
  font-weight: 600;
`;

const Detail = styled(Link)`
  display: block;
  position: absolute;
  bottom: 0;
  right: 0;
  color: var(--primary-color);
  font-weight: 500;
  padding: 10px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const Status = styled.span`
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px;
  font-weight: 500;
  cursor: default;
  ${(props) =>
    props.$cancel
      ? css`
          color: #da291c;
          background-color: rgba(218, 41, 28, 0.2);
        `
      : css`
          color: #1cda55;
          background: rgba(28, 218, 85, 0.2);
        `}
`;

const OrderDetail = styled.div`
  margin: 0 20px;
  padding: 10px;
  border: 1px solid var(--color-grey-200);
  border-radius: 10px;
`;

const Button = styled.button`
  border: none;
  background-color: transparent;
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 8px;
  color: var(--color-grey-500);
  &:hover {
    color: inherit;
  }
`;

const DetailTitle = styled.h3``;

const OrderInfo = styled.div`
  padding-bottom: 10px;
  border-bottom: 1px solid var(--color-grey-300);
`;

const ProductTitle = styled.h4`
  margin-top: 20px;
`;
const ProductList = styled.div`
  max-height: 32vh;
  overflow-y: auto;
`;
const ProductItem = styled.div`
  display: flex;
  justify-content: space-between;
  /* align-items: center; */
  margin: 10px 0;
`;
const ProductImg = styled.img`
  height: 100px;
  width: 74px;
`;

const ColorImg = styled.span`
  width: 24px;
  height: 24px;
  min-width: 24px;
  display: inline-block;
  border-radius: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border: 1px solid var(--color-grey-300);
  padding: 2px;
  background-clip: content-box !important;
  cursor: pointer;
  background-image: url(${(props) => props.$link});
`;
const ProductInfo = styled.div`
  display: flex;
  flex: 1;
`;
const Info = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 14px 0;
  margin-left: 10px;
`;

const InfoContent = styled.p`
  display: flex;
  gap: 4px;
`;

const ContentSpan = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Quantity = styled.div`
  flex: 1;
  text-align: center;
`;

const Price = styled.span`
  font-weight: 600;
  /* flex: 1; */
`;

const Pricing = styled.div`
  margin-top: 20px;
  display: flex;
  width: 400px;
  margin-left: auto;
  flex-direction: column;
  gap: 10px;
  padding-right: 10px;
`;
const PricingProduct = styled.span`
  display: flex;
  justify-content: space-between;
`;
const PricingTotal = styled.span`
  font-weight: 600;
  display: flex;
  justify-content: space-between;
`;

function OrderHistory() {
  const [orderList, setOrderList] = useState([]);
  const [isDetail, setIsDetail] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [currentOrder, setCurrentOrder] = useState({});
  const [products, setProducts] = useState([]);

  // console.log(orderList);

  async function handleDetail(id) {
    setIsDetail(true);
    const request = userRequest();
    try {
      const res = await request.get(`/order/find?id=${id}`);
      setCurrentOrder(res.data[0]);
    } catch (err) {
      console.log(err);
    }
  }

  function handleBack() {
    setIsDetail(false);
  }

  useEffect(() => {
    async function getOrder() {
      const request = userRequest();
      try {
        const res = await request.get(`/order/find/${currentUser._id}`);
        const resProducts = await publicRequest.get("/product");
        setProducts(resProducts.data);
        // console.log(res);
        setOrderList(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getOrder();
  }, []);
  return (
    <>
      <Container>
        <WrapperLayout>
          <Title>Lịch sử đơn hàng</Title>
          {isDetail ? (
            <OrderDetail>
              <Button onClick={handleBack}>
                <KeyboardArrowLeftIcon fontSize="large" />
                Quay lại
              </Button>
              <DetailTitle>Chi tiết đơn hàng</DetailTitle>
              <OrderInfo>
                <Row $width="100%">
                  <OrderText>Mã đơn: {currentOrder?._id}</OrderText>
                  <OrderText>
                    Ngày mua hàng:{" "}
                    {currentOrder?.createdAt &&
                      formatDate(currentOrder?.createdAt)}
                  </OrderText>
                  <OrderText>Người nhận: {currentOrder?.fullName}</OrderText>
                </Row>
                <Row $width="100%">
                  <OrderText>
                    Số điện thoại: {currentOrder?.phoneNumber}
                  </OrderText>
                  <OrderText>
                    Thanh toán:{" "}
                    {currentOrder?.paymentMethod === "COD" &&
                      "Thanh toán khi nhận hàng (COD)"}
                  </OrderText>
                  <OrderText>
                    Tình trạng đơn hàng: {currentOrder.status}
                  </OrderText>
                </Row>
                <Row>
                  <OrderText>
                    Địa chỉ nhận hàng: {currentOrder.address}
                  </OrderText>
                </Row>
              </OrderInfo>
              <OrderInfo>
                <ProductTitle>
                  Sản phẩm (
                  {currentOrder?.products?.reduce(
                    (total, product) => total + product.quantity,
                    0
                  )}
                  )
                </ProductTitle>
                <ProductList>
                  {currentOrder?.products?.map((product) => (
                    <ProductItem key={product._id}>
                      <ProductInfo>
                        <ProductImg src={product.color.productImg} />
                        <Info>
                          <InfoContent>
                            {
                              products.find((p) => p._id === product.productId)
                                .name
                            }
                          </InfoContent>
                          <InfoContent>
                            <ContentSpan>
                              <ColorImg
                                $link={product.color.colorImg}
                              ></ColorImg>
                              {product.color.colorName}
                            </ContentSpan>
                            {" / "}
                            <ContentSpan>{product.size}</ContentSpan>
                          </InfoContent>
                        </Info>
                      </ProductInfo>
                      <Quantity>{product.quantity}</Quantity>
                      <Price>
                        {formatCurrency(
                          products.find((p) => p._id === product.productId)
                            .price * product.quantity
                        )}
                      </Price>
                    </ProductItem>
                  ))}
                </ProductList>
              </OrderInfo>
              <Pricing>
                <PricingProduct>
                  <span>Giá trị đơn hàng:</span>
                  <span>{formatCurrency(currentOrder.totalPrice)}</span>
                </PricingProduct>
                <PricingTotal>
                  <span>Tổng tiền thanh toán:</span>
                  <span>
                    {formatCurrency(
                      currentOrder.totalPrice + currentOrder.shippingCost
                    )}
                  </span>
                </PricingTotal>
              </Pricing>
            </OrderDetail>
          ) : (
            <OrderList>
              {orderList.length > 0
                ? orderList
                    .sort(
                      (a, b) =>
                        new Date(b.createdAt).getTime() -
                        new Date(a.createdAt).getTime()
                    )
                    .map((order) => (
                      <OrderItem key={order?._id}>
                        <Row $width="70%">
                          <OrderText>
                            <OrderTitle>Mã đơn: </OrderTitle>
                            {order?._id}
                          </OrderText>
                          <OrderText>
                            <OrderTitle>Ngày đặt: </OrderTitle>
                            {formatDate(order?.createdAt)}
                          </OrderText>
                        </Row>
                        <Row $width="70%">
                          <OrderText>
                            <OrderTitle>Số lượng: </OrderTitle>
                            {order?.products?.reduce(
                              (total, p) => total + p.quantity,
                              0
                            )}
                          </OrderText>
                          <OrderText>
                            <OrderTitle>Tổng tiền: </OrderTitle>
                            {formatCurrency(order?.totalPrice)}
                          </OrderText>
                        </Row>
                        <Status $cancel={order?.status === "Đã huỷ"}>
                          {order?.status}
                        </Status>
                        <Detail onClick={() => handleDetail(order._id)}>
                          Xem chi tiết
                        </Detail>
                      </OrderItem>
                    ))
                : "Không có đơn hàng"}
            </OrderList>
          )}
        </WrapperLayout>
      </Container>
    </>
  );
}

export default OrderHistory;
