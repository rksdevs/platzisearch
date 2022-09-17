import { Link } from "react-router-dom";
import styled from "styled-components";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

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

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });
  const { loading, error, dispatch } = useContext(AuthContext);

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      dispatch({ type: "LOGIN_SUCCESS", payload: credentials });
      navigate("/");
    } catch (err) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: err,
      });
    }
  };
  return (
    <MainContainer className="login">
      <HeadingContainer>
        <FormHeading>LOGIN</FormHeading>
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
          Login
        </FormButton>

        <Link to="/register" style={{ textDecoration: "none" }}>
          <FormSpan>Not a member? Register Here</FormSpan>
        </Link>
        {error && <span>{error.message}</span>}
      </FormContainer>
    </MainContainer>
  );
};
export default Login;
