import Switch from "@mui/material/Switch";
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
  background-color: #eeeeee;
`;
const HeadingContainer = styled.div``;
const Heading = styled.h1``;

const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  justify-content: space-evenly;
`;
const SearchInputDiv = styled.div``;

const SelectInputDiv = styled.div``;
const ToggleInputDiv = styled.div``;
const TableContainer = styled.div``;
const FetchData = styled.div``;
const LogoutButton = styled.button``;
const LogoutButtonDiv = styled.div``;

const Home = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = (e) => {
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
