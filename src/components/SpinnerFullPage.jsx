import styled from "styled-components";
import Spinner from "./Spinner";

const Container = styled.div`
  margin: 2.5rem;
  height: calc(100vh - 5rem);
  background-color: #2d3439;
`;

function SpinnerFullPage() {
  return (
    <Container>
      <Spinner />
    </Container>
  );
}

export default SpinnerFullPage;
