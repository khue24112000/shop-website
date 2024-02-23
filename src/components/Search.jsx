import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchContainer = styled.div`
  display: flex;
  padding: 10px 16px;
  align-items: center;
  width: 550px;
  gap: 8px;
  border: 1px solid var(--color-grey-300);
  border-radius: 10px;
  /* border-radius: 100px; */
`;

const Input = styled.input`
  border: none;
  outline: none;
  flex: 1;
`;

function Search() {
  const [input, setInput] = useState("");
  const inputRef = useRef();
  const navigate = useNavigate();
  function handleClick() {
    if (input.trim()) navigate(`/search?q=${input}`);
  }
  function handleKeyDown(e) {
    if (e.key === "Enter") navigate(`/search?q=${input}`);
  }
  return (
    <SearchContainer>
      <SearchIcon
        onClick={handleClick}
        fontSize="large"
        sx={{ cursor: "pointer" }}
      />
      <Input
        ref={inputRef}
        value={input}
        onKeyDown={handleKeyDown}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Tìm kiếm sản phẩm"
      />
      {input.trim().length > 0 && (
        <CancelIcon
          onClick={() => {
            setInput("");
            inputRef.current.focus();
          }}
          fontSize="large"
          sx={{ cursor: "pointer" }}
        />
      )}
    </SearchContainer>
  );
}

export default Search;
