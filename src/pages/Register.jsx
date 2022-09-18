import { Link } from "react-router-dom";
import styled from "styled-components";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const MainContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: row;
  max-width: 1024px;
  align-items: center;
  justify-content: center;
  margin: auto;
  background-color: #97d2ec;
`;
const LoginTextContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5em;
  @media only Screen and (max-width: 40em) {
    display: none;
  }
`;
const LoginTextHeading = styled.h2`
  font-size: 2em;
  text-align: center;
`;

const FormWrapper = styled.div`
  width: 30vw;
  @media only Screen and (max-width: 40em) {
    width: 80vw;
  }
`;

const HeadingContainer = styled.div`
  display: flex;
  justify-content: center;
`;
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
  background-color: #25316d;
  color: white;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;

  &:disabled {
    background-color: #16213e8c;
    cursor: not-allowed;
  }

  &:hover {
    background-color: #646fd4;
    font: #fef5ac;
  }
`;
const FormSpan = styled.span``;

const Register = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });
  const { loading, dispatch } = useContext(AuthContext);
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      dispatch({ type: "REGISTER_SUCCESS", payload: credentials });
      navigate("/");
    } catch (err) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: err,
      });
    }
  };
  return (
    <MainContainer>
      <LoginTextContainer>
        <LoginTextHeading>Welcome To Platzi Search!</LoginTextHeading>
      </LoginTextContainer>
      <FormWrapper>
        <HeadingContainer>
          <FormHeading>REGISTER</FormHeading>
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
            Register
          </FormButton>

          <Link to="/login" style={{ textDecoration: "none", margin: "auto" }}>
            <FormSpan>Already a member? Login Here</FormSpan>
          </Link>
        </FormContainer>
      </FormWrapper>
    </MainContainer>
  );
};
export default Register;
