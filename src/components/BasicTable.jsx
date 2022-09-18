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
import { keys } from "@mui/system";

const TableHeadingContainer = styled.div``;
const TableName = styled.h2``;
const FetchData = styled.button``;
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

export default function BasicTable() {
  const { tableData, loading, error, dispatch } = useContext(TableContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [rowIdToEdit, setRowIdToEdit] = useState(0);
  const [open, setOpen] = useState(false);
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const [sortCategory, setSortCategory] = useState("id");
  const [toggleDescending, setToggleDescending] = useState(true);
  const [query, setQuery] = useState("");
  const [sortingOrder, setSortingOrder] = useState("");
  const [testTableData, setTestTableData] = useState([]);
  // const [sortField, setSortField] = useState("");
  // const [order, setOrder] = useState("asc");

  //Function to fetch data from API & store in local storage

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

  //Fetching Data only once and sending it to localStorage

  useEffect(() => {
    const fetchTableData = async () => {
      const result = await axios.get(
        "https://api.escuelajs.co/api/v1/products"
      );
      dispatch({
        type: "TABLE_DATA_FETCH_SUCCESS",
        payload: result.data.splice(1, 20),
      });
      setTestTableData(result.data.splice(1, 20));
    };
    fetchTableData();
  }, []);

  //Refetching the data on Refetch click

  const refetchData = async (e) => {
    e.preventDefault();
    fetchApiData();
  };

  //Deleting data from Table
  const handleDelete = async (rowId) => {
    const updatedData = tableData.filter((item) => item.id !== rowId);
    try {
      dispatch({ type: "TABLE_DATA_DELETE_SUCCESS", payload: updatedData }); //deleted from local storage
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleEdit = (rowId) => {
    setModalOpen(!modalOpen);
    setRowIdToEdit(rowId);
  };

  const search = (data) => {
    return data.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.name.toLowerCase().includes(query) ||
        item.price.toString().toLowerCase().includes(query)
    );
  };

  //Sorting data

  const handleDropDown = (e) => {
    setSortCategory(e.target.value);
    console.log(sortCategory);
  };

  const handleToggle = (e) => {
    setToggleDescending(!toggleDescending);

    toggleDescending ? setSortingOrder("asc") : setSortingOrder("des");
    console.log(sortingOrder);
    sortingTable();
  };

  //sorting algorith

  let sortingTable = () => {
    // const reversed = sortingOrder === "asc" ? 1 : -1;
    // setTestTableData(
    //   tableData.sort((a, b) => {
    //     reversed * a.title.localeCompare(b.title);
    //   })
    // );
    // dispatch({ type: "TABLE_DATA_FETCH_SUCCESS", payload: tempData });
  };

  return (
    <>
      <SearchContainer>
        <SearchInputDiv>
          <input
            type="text"
            placeholder="search"
            onChange={(e) => setQuery(e.target.value.toLowerCase())}
          />
        </SearchInputDiv>
        <SelectInputDiv>
          <select id="sortType" name="sortType" onClick={handleDropDown}>
            <option value="id">Id</option>
            <option value="title">Title</option>
            <option value="price">Price</option>
            <option value="description">Description</option>
            <option value="category">Category Name</option>
          </select>
        </SelectInputDiv>
        <ToggleInputDiv>
          Ascending
          <Switch {...label} onClick={handleToggle} />
          Descending
        </ToggleInputDiv>
      </SearchContainer>
      <TableContainer component={Paper}>
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
            {search(testTableData)?.map((row) => (
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
