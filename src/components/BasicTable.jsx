import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import EditIcon from "@mui/icons-material/Edit";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { TableContext } from "../context/TableContext";
import styled from "styled-components";
import EditTableModal from "./EditTableModal";
import Switch from "@mui/material/Switch";

const TableHeadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-self: center;
  margin-top: 1em;
  position: relative;
  background: #dbdffd;
  @media only Screen and (max-width: 40em) {
    flex-direction: row;
    padding-bottom: 0.5em;
  }
`;
const TableName = styled.h2``;
const FetchData = styled.button`
  position: absolute;
  padding: 7px 20px;
  border-radius: 10px;
  outline: none;
  border: none;
  font-size: 1em;
  font-weight: 600;
  top: 20px;
  right: 10px;
  background: #7b85cb;
  &:hover {
    background: #646fd4;
    box-shadow: 0px 0px 10px 1px #ffffff;
  }
  @media only Screen and (max-width: 40em) {
    padding: 3px;
    top: 55px;
    right: 250px;
    font-size: 14px;
  }
`;
const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  justify-content: space-evenly;
  background: #7b85cb;
  padding-top: 5px;
  padding-bottom: 5px;
  @media only Screen and (max-width: 40em) {
    flex-direction: column;
  }
`;
const SearchInputDiv = styled.div``;
const TableInputSearch = styled.input`
font-weight: bold;
font-size: 1em;
border-radius: 20px;
padding: 7px;
outline: none;
border: 1px solid black;
margin-bottom: 5px;

}
`;
const TableInputSelect = styled.select`
border-radius: 20px;
padding: 7px;
outline: none;
border: 1px solid black;
font-weight: bold;
font-size: 1em;
}
`;

const SelectInputDiv = styled.div``;
const ToggleInputDiv = styled.div`
  font-weight: bold;
  font-size: 1em;
`;

export default function BasicTable() {
  const { tableData, dispatch } = useContext(TableContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [rowIdToEdit, setRowIdToEdit] = useState(0);
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const [sortCategory, setSortCategory] = useState("id");
  const [toggleDescending, setToggleDescending] = useState(true);
  const [query, setQuery] = useState("");
  const [sortingOrder, setSortingOrder] = useState("");

  //Function to fetch data from API & store in local storage using reducer
  const fetchApiData = async () => {
    await axios
      .get("https://api.escuelajs.co/api/v1/products")
      .then((res) => {
        dispatch({
          type: "TABLE_DATA_FETCH_SUCCESS",
          payload: res.data.splice(1, 20),
        });
      })
      .catch((err) => console.log(err));
  };

  //Fetching Data only once and sending it to localStorage via reducer

  useEffect(() => {
    const fetchTableData = async () => {
      const result = await axios.get(
        "https://api.escuelajs.co/api/v1/products"
      );
      dispatch({
        type: "TABLE_DATA_FETCH_SUCCESS",
        payload: result.data.splice(1, 20),
      });
    };
    fetchTableData();
    // eslint-disable-next-line
  }, []);

  //Refetching the data on Refetch click
  const refetchData = async (e) => {
    e.preventDefault();
    fetchApiData();
  };

  //Deleting data from Table - delete from storage via reducer
  const handleDelete = async (rowId) => {
    const updatedData = tableData.filter((item) => item.id !== rowId);
    try {
      dispatch({ type: "TABLE_DATA_DELETE_SUCCESS", payload: updatedData }); //deleted from local storage
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  //handling edit modal open
  const handleEdit = (rowId) => {
    setModalOpen(!modalOpen);
    setRowIdToEdit(rowId);
  };

  //Search function

  const search = (data) => {
    return data?.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.name.toLowerCase().includes(query) ||
        item.price.toString().toLowerCase().includes(query)
    );
  };

  //Sorting data collation from dropdown and toggle
  const handleDropDown = (e) => {
    setSortCategory(e.target.value);
  };

  const handleToggle = (e) => {
    setToggleDescending(!toggleDescending);

    toggleDescending ? setSortingOrder("asc") : setSortingOrder("des");
    console.log(sortingOrder);
    sortingTable(); //calls sorting on toggling asc/dec
  };

  //sorting function

  let sortingTable = () => {
    function compare(a, b) {
      // asc
      if (!toggleDescending) {
        if (sortCategory === "category") {
          return a[sortCategory].name > b[sortCategory].name ? 1 : -1;
        }
        return a[sortCategory] > b[sortCategory] ? 1 : -1;
      } else {
        //desc
        if (sortCategory === "category") {
          return a[sortCategory].name < b[sortCategory].name ? 1 : -1;
        }
        return a[sortCategory] < b[sortCategory] ? 1 : -1;
      }
    }
    tableData.sort(compare);
  };

  return (
    <>
      <SearchContainer>
        <SearchInputDiv>
          <TableInputSearch
            type="text"
            placeholder="search"
            onChange={(e) => setQuery(e.target.value.toLowerCase())}
          />
        </SearchInputDiv>
        <SelectInputDiv>
          <TableInputSelect
            id="sortType"
            name="sortType"
            onClickCapture={handleDropDown}
          >
            <option value="id">Id</option>
            <option value="title">Title</option>
            <option value="price">Price</option>
            <option value="description">Description</option>
            <option value="category">Category Name</option>
          </TableInputSelect>
        </SelectInputDiv>
        <ToggleInputDiv>
          Ascending
          <Switch {...label} onClick={handleToggle} />
          Descending
        </ToggleInputDiv>
      </SearchContainer>
      <TableContainer component={Paper} style={{ background: "white" }}>
        <TableHeadingContainer>
          <TableName>Product List From Platzi</TableName>
          <FetchData onClick={refetchData}>Refetch Data From API</FetchData>
        </TableHeadingContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="center">Title</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Category Name</TableCell>
              <TableCell align="center">Edit</TableCell>
              <TableCell align="center">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {search(tableData)?.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="left">{row.title}</TableCell>
                <TableCell align="left">{row.price}</TableCell>
                <TableCell align="left">{row.description}</TableCell>
                <TableCell align="center">{row.category.name}</TableCell>
                <TableCell>
                  <EditIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => handleEdit(row.id)}
                  />
                  {modalOpen && (
                    <EditTableModal
                      setOpen={setModalOpen}
                      productId={rowIdToEdit}
                    />
                  )}
                </TableCell>

                <TableCell>
                  <HighlightOffIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDelete(row.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
