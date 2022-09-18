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

const TableHeadingContainer = styled.div``;
const TableName = styled.h2``;
const FetchData = styled.button``;

export default function BasicTable() {
  const { tableData, loading, error, dispatch } = useContext(TableContext);
  const [tableDataRaw, setTableDataRaw] = useState([]);
  const [tableDataToMap, setTableDataToMap] = useState([]);

  //Function to fetch data from API & store in local storage

  const fetchApiData = () => {
    axios
      .get("https://api.escuelajs.co/api/v1/products")
      .then((res) => {
        console.log(res.data);
        setTableDataRaw(res.data.splice(1, 20));
        localStorage.setItem("tableData", JSON.stringify(tableDataRaw));
      })
      .catch((err) => console.log(err));
  };

  //Fetching Data only once and sending it to localStorage
  useEffect(() => {
    fetchApiData();
  }, []);

  //Refetching the data on Refetch click

  const refetchData = async (e) => {
    e.preventDefault();
    fetchApiData();
    try {
      dispatch({ type: "TABLE_DATA_FETCH_SUCCESS", payload: tableDataRaw });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  //Deleting data from Table
  const handleDelete = async (rowId) => {
    const updatedData = tableData.filter((item) => item.id !== rowId);
    // setTableData(updatedData);
    try {
      dispatch({ type: "TABLE_DATA_DELETE_SUCCESS", payload: updatedData });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleEdit = (e) => {
    // e.preventDefault();
    // console.log(e);
  };

  useEffect(() => {
    setTableDataToMap(tableData);
  }, [tableData]);

  return (
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
          {tableDataToMap?.map((row) => (
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
                <EditIcon style={{ cursor: "pointer" }} onClick={handleEdit} />
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
  );
}
