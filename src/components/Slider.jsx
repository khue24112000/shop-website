import styled from "styled-components";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { sliderItems } from "../data";
import { useState } from "react";
import { mobile } from "../responsive";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  margin-top: 70px;
  margin-bottom: 20px;
  width: 100%;
  height: 70vh;
  display: flex;
  position: relative;
  /* background-color: red; */
  overflow: hidden;
  ${mobile({ display: "none" })}
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: rgba(255, 247, 247, 0.389);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  /* opacity: 0.5; */
  z-index: 2;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.$slideIndex * -100}vw);
`;

const Slide = styled.div`
  width: 100vw;
  height: 70vh;
  display: flex;
  align-items: center;
  position: relative;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
`;

const InfoContainer = styled.div`
  position: absolute;
  width: 500px;
  padding: 70px;
`;

const Title = styled.h1`
  font-size: 5rem;
  text-transform: uppercase;
`;

const Desc = styled.p`
  margin: 10px 0px 24px;
  font-size: 2rem;
  font-weight: 500;
  letter-spacing: 3px;
`;

const Button = styled.button`
  padding: 16px;
  font-size: 2rem;
  background-color: transparent;
  cursor: pointer;
  border-radius: 100px;
`;

function Slider() {
  const [slideIndex, setSlideIndex] = useState(0);
  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex === 0 ? sliderItems.length - 1 : slideIndex - 1);
    } else {
      setSlideIndex(slideIndex === sliderItems.length - 1 ? 0 : slideIndex + 1);
    }
  };
  const navigate = useNavigate();

  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowBack />
      </Arrow>
      <Wrapper $slideIndex={slideIndex}>
        {sliderItems.map((item) => (
          <Slide key={item.id}>
            <Image src={item.img} />
            {item.id !== 1 && (
              <InfoContainer>
                <Title>{item.title}</Title>
                <Desc>{item.desc}</Desc>
                <Button onClick={() => navigate("/category/nam")}>
                  Mua ngay
                </Button>
              </InfoContainer>
            )}
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowForward />
      </Arrow>
    </Container>
  );
}

export default Slider;
