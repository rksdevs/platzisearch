import Switch from "@mui/material/Switch";
import styled from "styled-components";
import BasicTable from "../components/BasicTable";

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

const Home = () => {
  return (
    <MainContainer>
      <HeadingContainer>
        <Heading>Platzi Table</Heading>
      </HeadingContainer>
      {/* <SearchContainer>
        <SearchInputDiv>
          <input type="text" placeholder="search" />
        </SearchInputDiv>
        <SelectInputDiv>
          <select id="cars" name="cars">
            <option value="id">Id</option>
            <option value="title">Title</option>
            <option value="price">Price Title</option>
            <option value="description">Description</option>
            <option value="category">Category Name</option>
          </select>
        </SelectInputDiv>
        <ToggleInputDiv>
          Ascending
          <Switch {...label} />
          Descending
        </ToggleInputDiv>
      </SearchContainer> */}
      <TableContainer>
        <BasicTable />
      </TableContainer>
    </MainContainer>
  );
};
export default Home;
