import styled from "styled-components";

import WrapperLayout from "../components/WrapperLayout";
import Products from "../components/Products";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useProduct } from "../context/useProduct";
import { publicRequest } from "../utils/requestMethod";

const Container = styled.div`
  margin-top: 70px;
  padding-bottom: 36px;
  background-image: linear-gradient(white, #f3f4f65e);
`;

const Title = styled.h2`
  display: inline-block;
  margin: 20px;
`;

const MoreContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const MoreButton = styled.button`
  color: white;
  background-color: var(--primary-color);
  padding: 10px 20px;
  font-size: 1.6rem;
  text-transform: uppercase;
  font-weight: 500;
  border: none;
  border-radius: 10px;
`;

const MoreText = styled.p`
  color: var(--color-grey-400);
`;

function SearchResult() {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [renderProducts, setRenderProducts] = useState(products);
  const [params, setParams] = useSearchParams();
  const query = params.get("q");
  useEffect(() => {
    setRenderProducts(
      products?.filter(
        (p) =>
          p?.name?.toLowerCase()?.includes(query.toLowerCase()) &&
          p?.status === true
      )
    );
  }, [query, products]);

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

  return (
    <>
      <Container>
        <WrapperLayout>
          <Title>Kết quả tìm kiếm: </Title> {renderProducts.length} sản phẩm
        </WrapperLayout>
        <Products page={page} renderProducts={renderProducts} search={true} />
        {page * 8 < renderProducts.length && (
          <MoreContainer>
            <MoreButton onClick={() => setPage((prev) => prev + 1)}>
              Xem thêm
            </MoreButton>
            <MoreText>
              Hiển thị 1-{page * 8} trên tổng số {renderProducts.length} sản
              phẩm
            </MoreText>
          </MoreContainer>
        )}
      </Container>
    </>
  );
}

export default SearchResult;
