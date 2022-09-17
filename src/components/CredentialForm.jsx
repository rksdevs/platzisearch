import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const MainContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const HeadingContainer = styled.div``;
const FormHeading = styled.h2``;
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const FormInput = styled.input`
  height: 30px;
  padding: 10px;
`;
const FormButton = styled.button`
  border: none;
  padding: 10px 20px;
  background-color: #16213e;
  color: white;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;

  &:disabled {
    background-color: #16213e8c;
    cursor: not-allowed;
  }
`;
const FormSpan = styled.span``;

const CredentialForm = ({ type }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({});
  const handleChange = () => {};
  const handleClick = () => {};
  return (
    <MainContainer className="login">
      <HeadingContainer>
        <FormHeading>{type.toUpperCase()}</FormHeading>
      </HeadingContainer>
      <FormContainer className="FormContainer">
        <FormInput
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <FormInput
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <FormButton
          disabled={loading}
          onClick={handleClick}
          className="lButton"
        >
          {type.toUpperCase()}
        </FormButton>

        <Link
          to={type === "register" ? "/login" : "/register"}
          style={{ textDecoration: "none" }}
        >
          <FormSpan>
            {type === "register"
              ? "Already a member? Login Here"
              : "Not a member? Register Here"}
          </FormSpan>
        </Link>
        {error && <span>{error.message}</span>}
      </FormContainer>
    </MainContainer>
  );
};
export default CredentialForm;
