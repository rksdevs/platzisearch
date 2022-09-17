import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

export default function BasicTable() {
  const [tableData, setTableData] = useState([]);
  const handleDelete = (rowId) => {
    const updatedData = tableData.filter((item) => item.id !== rowId);
    setTableData(updatedData);
  };

  const handleEdit = (e) => {
    // e.preventDefault();
    // console.log(e);
  };

  useEffect(() => {
    axios
      .get("https://api.escuelajs.co/api/v1/products")
      .then((res) => {
        console.log(res.data);
        setTableData(res.data.splice(1, 20));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <TableContainer component={Paper}>
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
          {tableData.map((row) => (
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
