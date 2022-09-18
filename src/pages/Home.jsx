import { useContext } from "react";
import styled from "styled-components";
import BasicTable from "../components/BasicTable";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MainContainer = styled.div`
  display: flex;
  flex-direction column;
  justify-content: center;
  align-items: center;
  max-width: 1024px;
  margin: auto;
  background-color: #25316D;
  position: relative;
`;
const HeadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media only Screen and (max-width: 40em) {
    justify-content: space-around;
  }
`;
const Heading = styled.h1`
  color: white;
`;

const TableContainer = styled.div``;
const LogoutButton = styled.button`
  padding: 7px 20px;
  border-radius: 10px;
  outline: none;
  border: none;
  font-size: 1em;
  font-weight: 600;
  &:hover {
    background: #646fd4;
    box-shadow: 0px 0px 10px 1px #ffffff;
  }
  @media only Screen and (max-width: 40em) {
    padding: 6px;
    font-size: small;
  }
`;
const LogoutButtonDiv = styled.div`
  position: absolute;
  right: 50px;
  @media only Screen and (max-width: 40em) {
    right: 5px;
  }
`;

const Home = () => {
  const { user, dispatch } = useContext(AuthContext); //grabbing user context to display logout & dispatch logout reducer
  const navigate = useNavigate();

  const handleLogout = (e) => {
    //logout functionality - dispatch logout & navigate to login screen
    e.preventDefault();
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <MainContainer>
      <HeadingContainer>
        <Heading>Platzi Table</Heading>
        {user && (
          <LogoutButtonDiv>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          </LogoutButtonDiv>
        )}
      </HeadingContainer>
      <TableContainer>
        <BasicTable />
      </TableContainer>
    </MainContainer>
  );
};
export default Home;
