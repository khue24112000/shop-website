import styled from "styled-components";
import { Facebook, Instagram } from "@mui/icons-material";

const Container = styled.footer`
  margin-top: 36px;
  padding-top: 36px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const Wrapper = styled.div`
  display: flex;
  margin: 0 auto;
  width: max-content;
  gap: 100px;
`;
const InfomationList = styled.ul`
  list-style-type: none;
  display: flex;
  gap: 10px;
  flex-direction: column;
`;
const InfomationItem = styled.li`
  font-weight: ${(props) => (props.$bold ? "600" : "400")};
  cursor: ${(props) => (props.$cursor ? "pointer" : "default")};
  &:hover {
    text-decoration: underline;
  }
`;
const SocialNetwork = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
`;
const Copyright = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  justify-content: center;
  color: white;
  background-color: var(--primary-color);
`;
function Footer() {
  return (
    <Container>
      <Wrapper>
        <InfomationList>
          <InfomationItem $cursor $bold>
            Giới thiệu
          </InfomationItem>
          <InfomationItem $cursor $bold>
            Tin tức
          </InfomationItem>
          <InfomationItem $cursor $bold>
            Tuyển dụng
          </InfomationItem>
        </InfomationList>
        <InfomationList>
          <InfomationItem $bold>Hỗ trợ khách hàng</InfomationItem>
          <InfomationItem $cursor>Chính sách đổi hàng</InfomationItem>
          <InfomationItem $cursor>Chính sách vận chuyển</InfomationItem>
          <InfomationItem $cursor>Chính sách bảo mật</InfomationItem>
          <InfomationItem $cursor>
            Chính sách khách hàng thân thiết
          </InfomationItem>
        </InfomationList>
        <InfomationList>
          <InfomationItem $bold>Liên hệ</InfomationItem>
          <InfomationItem>Chăm sóc khách hàng: 0388888888</InfomationItem>
          <InfomationItem>Mua hàng online: 0388888888</InfomationItem>
          <InfomationItem>Email: kuku@kstore.com</InfomationItem>
          <InfomationItem>Địa chỉ: Đông Anh, Hà Nội</InfomationItem>
        </InfomationList>
      </Wrapper>
      <SocialNetwork>
        <Facebook sx={{ fontSize: 36 }} />
        <Instagram sx={{ fontSize: 36 }} />
      </SocialNetwork>
      <Copyright>© - 2023 Bản quyền KSTORE</Copyright>
    </Container>
  );
}

export default Footer;
