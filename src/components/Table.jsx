import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useSelector, useDispatch } from "react-redux";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { removeUserAction } from "../store/userReducer";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  noUsers: {
    textAlign: "center",
  },
});

export default function BasicTable() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  const removeUser = (user) => {
    dispatch(removeUserAction(user.id));
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Phone</TableCell>
            <TableCell align="right">City</TableCell>
            <TableCell align="right">Remove</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.length > 0 ? (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell component="th" scope="row">
                  {user.name}
                </TableCell>
                <TableCell align="right">{user.email}</TableCell>
                <TableCell align="right">{user.phone}</TableCell>
                <TableCell align="right">
                  {user.address?.city} {user.city}
                </TableCell>
                <TableCell align="right">
                  <DeleteOutlineIcon onClick={() => removeUser(user)} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className={classes.noUsers}>
                !! NO USERS FOUND !!
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
