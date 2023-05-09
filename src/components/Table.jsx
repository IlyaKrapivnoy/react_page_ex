import React from "react";
import {
  makeStyles,
  TableCell,
  TableBody,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { removeUserAction } from "../store/userReducer";
import { Alert } from "@material-ui/lab";

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
              <TableRow key={user.id} class="hover:bg-blue-100">
                <TableCell component="th" scope="row">
                  {user.name}
                </TableCell>
                <TableCell align="right">{user.email}</TableCell>
                <TableCell align="right">{user.phone}</TableCell>
                <TableCell align="right">
                  {user.address?.city} {user.city}
                </TableCell>
                <TableCell align="right">
                  <DeleteOutlineIcon
                    onClick={() => removeUser(user)}
                    className="cursor-pointer"
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className={classes.noUsers}>
                <Alert severity="info">NO USERS FOUND</Alert>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
