import styled from "styled-components";
import Products from "../components/Products";
import { mobile } from "../responsive";
import WrapperLayout from "../components/WrapperLayout";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { useProduct } from "../context/useProduct";

const Container = styled.div`
  margin-top: 70px;
  padding-bottom: 36px;
  background-image: linear-gradient(white, #f3f4f65e);
`;

const Title = styled.h1`
  display: inline-block;
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 2rem;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  border-radius: 10px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const Button = styled.button`
  background-color: white;
  border: none;
  text-decoration: underline;
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

function ProductList() {
  const {
    products,
    filterProducts,
    sort,
    setSort,
    filters,
    setFilters,
    setCategory,
  } = useProduct();
  const navigate = useNavigate();
  const { category } = useParams();
  // setCategory(category);

  const handleClearFilter = useCallback(
    function handleClearFilter() {
      setFilters({});
    },
    [setFilters]
  );

  // console.log(filters.color);

  const title =
    category === "all"
      ? "Tất cả sản phẩm"
      : category === "new"
      ? "Sản phẩm mới"
      : category === "nam"
      ? "Sản phẩm cho nam"
      : "Sản phẩm cho nữ";

  const [page, setPage] = useState(1);
  const productCategories =
    category === "nam" || category === "nu"
      ? products
          .map((product) => {
            let type;
            product.categories.forEach((cat) => {
              if (cat !== "Nam" || cat !== "Nữ") type = cat;
            });
            return type;
          })
          .reduce(
            (arr, item) => (arr.includes(item) ? arr : [...arr, item]),
            []
          )
      : "";
  const productSize = products
    .flatMap((product) => product.size)
    .reduce((arr, item) => (arr.includes(item) ? arr : [...arr, item]), []);

  const productColor = products
    .flatMap((product) => {
      let color = [];
      product.color.forEach((c) => {
        color.push(c.colorName);
      });
      return color;
    })
    .reduce((arr, item) => (arr.includes(item) ? arr : [...arr, item]), []);

  // console.log(sort);
  // console.log(filterProducts);
  // console.log(productColor);
  // console.log(filters);

  useEffect(() => {
    return () => {
      handleClearFilter();
    };
  }, [handleClearFilter]);

  (function () {
    sort
      ? filterProducts.sort((a, b) =>
          sort === "asc" ? a.price - b.price : b.price - a.price
        )
      : filterProducts.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
  })();

  useEffect(() => {
    setCategory(
      category === "nam"
        ? "Nam"
        : category === "nu"
        ? "Nữ"
        : category === "new"
        ? "new"
        : ""
    );
  }, [category, setCategory]);

  function handleChangeCategory(e) {
    navigate(e.target.value);
  }

  function handleFilter(e) {
    setFilters((prev) => {
      if (e.target.value === "") {
        delete prev[e.target.name];
        return prev;
      } else {
        return { ...prev, [e.target.name]: e.target.value };
      }
    });
  }

  return (
    <>
      <Container>
        {/* <Announcement /> */}
        <WrapperLayout>
          <Title>{title}</Title>
          <FilterContainer>
            <Filter>
              <FilterText>Lọc sản phẩm theo:</FilterText>
              {category === "all" ? (
                <Select key={category} onChange={handleChangeCategory}>
                  <Option value={`/category/${category}`}>Danh mục</Option>
                  <Option value="/category/nam">Cho nam</Option>
                  <Option value="/category/nu">Cho nữ</Option>
                </Select>
              ) : category === "new" ? (
                ""
              ) : (
                <Select
                  name="categories"
                  value={filters.categories ? filters.categories : ""}
                  onChange={handleFilter}
                  key={category}
                >
                  <Option value="">Danh mục</Option>
                  {Object.values(productCategories).map((item) => (
                    <Option key={item}>{item}</Option>
                  ))}
                  {/* <Option>Quần</Option>
                  <Option>Áo</Option> */}
                </Select>
              )}
              <Select
                name="color"
                key={`${category}Color`}
                value={filters.color ? filters.color : ""}
                onChange={handleFilter}
              >
                <Option value="">Màu sắc</Option>
                {productColor.map((color) => (
                  <Option key={color}>{color}</Option>
                ))}
                {/* <Option>Trắng</Option>
                <Option>Đen</Option>
                <Option>Đỏ</Option>
                <Option>Xanh</Option>
                <Option>Vàng</Option>
                <Option>Xanh</Option> */}
              </Select>
              <Select
                name="size"
                key={`${category}Size`}
                onChange={handleFilter}
                value={filters.size ? filters.size : ""}
              >
                <Option value="">Kích cỡ</Option>
                {productSize.map((size) => (
                  <Option key={size}>{size}</Option>
                ))}
                {/* <Option>XS</Option>
                <Option>S</Option>
                <Option>M</Option>
                <Option>L</Option>
                <Option>XL</Option> */}
              </Select>
              <Button onClick={handleClearFilter}>Xoá lọc</Button>
            </Filter>
            <Filter>
              <FilterText>Sắp xếp theo:</FilterText>
              <Select
                value={sort}
                key={`${category}Filter`}
                onChange={(e) => setSort(e.target.value)}
              >
                <Option value="">Sắp xếp theo</Option>
                <Option key="asc" value="asc">
                  Giá từ thấp đến cao
                </Option>
                <Option key="dec" value="dec">
                  Giá từ cao đến thấp
                </Option>
              </Select>
            </Filter>
          </FilterContainer>
        </WrapperLayout>
        <Products page={page} />
        {page * 8 < filterProducts.length && (
          <MoreContainer>
            <MoreButton onClick={() => setPage((prev) => prev + 1)}>
              Xem thêm
            </MoreButton>
            <MoreText>
              Hiển thị 1-{page * 8} trên tổng số {filterProducts.length} sản
              phẩm
            </MoreText>
          </MoreContainer>
        )}
        {/* <Newsletter /> */}
      </Container>
    </>
  );
}

export default ProductList;
