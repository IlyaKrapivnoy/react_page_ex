import React, { useState } from "react";
import { PersonAdd, GroupAdd } from "@material-ui/icons";
import { addUserAction } from "../store/userReducer";
import { useDispatch, useSelector } from "react-redux";
import {
  makeStyles,
  Typography,
  Button,
  Backdrop,
  Modal,
  Fade,
  BottomNavigationAction,
  BottomNavigation,
} from "@material-ui/core";
import { fetchUsers } from "../store/acyncActions/fetchUsers";
import InputMask from "react-input-mask";
import { Formik, Form } from "formik";
import TextFieldWrapper from "../FormikUI/TextFieldWrapper";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { Alert, AlertTitle } from "@material-ui/lab";

import * as Yup from "yup";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 3, 3),
    borderRadius: 10,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    minHeight: 300,
    justifyContent: "space-around",
  },
}));

const INITIAL_FORM_STATE = {
  userName: "",
  userEmail: "",
  userCity: "",
  userPhone: "",
};

const FORM_VALIDATION = Yup.object().shape({
  userName: Yup.string().required("Name is required"),
  userEmail: Yup.string().required("Your email is required"),
  userCity: Yup.string().required("Your city is required"),
  userPhone: Yup.number()
    .integer()
    .typeError("Please, enter a valid phone number")
    .required("Your phone number is required"),
});

export default function ButtonsNav() {
  const classes = useStyles();

  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);

  const [isAlert, setIsAlert] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsAlert(false);
  };

  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  console.log(users);

  const [userInfo, setUserInfo] = useState({
    userName: "",
    userEmail: "",
    userPhone: "",
    userCity: "",
  });

  const handleInputChange = (e) => {
    const value = e.target.value;
    setUserInfo({
      ...userInfo,
      [e.target.name]: value,
    });
  };

  const addUser = () => {
    const user = {
      name: userInfo.userName,
      email: userInfo.userEmail,
      phone: userInfo.userPhone,
      city: userInfo.userCity,
      id: Date.now(),
    };

    if (
      !(userInfo.userName,
      userInfo.userEmail,
      userInfo.userCity,
      userInfo.userPhone)
    ) {
      setIsAlert(true);
      return;
    }

    dispatch(addUserAction(user));
    setOpen(false);
    setUserInfo({
      userInfo,
    });
  };

  return (
    <>
      <div className="flex justify-center mt-4">
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          showLabels
          className={classes.root}
        >
          <BottomNavigationAction
            label="Add User"
            icon={<PersonAdd />}
            onClick={handleOpen}
          />
          <BottomNavigationAction
            label="Add Users"
            icon={<GroupAdd />}
            onClick={() => dispatch(fetchUsers())}
          />
        </BottomNavigation>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <div className="flex items-baseline justify-between">
                <Typography variant="h4" gutterBottom>
                  Add User
                </Typography>
                <HighlightOffIcon
                  className="cursor-pointer"
                  onClick={handleClose}
                />
              </div>
              <Formik
                initialValues={{ ...INITIAL_FORM_STATE }}
                validationSchema={FORM_VALIDATION}
                onSubmit={(values) => {
                  console.log(values);
                }}
              >
                <Form className={classes.form}>
                  <TextFieldWrapper
                    variant="filled"
                    label="username"
                    name="userName"
                    value={userInfo.userName}
                    onChange={handleInputChange}
                    required
                  />
                  <TextFieldWrapper
                    variant="filled"
                    label="email"
                    name="userEmail"
                    value={userInfo.userEmail}
                    onChange={handleInputChange}
                    required
                  />
                  <InputMask
                    mask="+38 (099) 999-99-99"
                    value={userInfo.userPhone}
                    onChange={handleInputChange}
                  >
                    {() => (
                      <TextFieldWrapper
                        variant="filled"
                        label="phone"
                        name="userPhone"
                        required
                      />
                    )}
                  </InputMask>

                  <TextFieldWrapper
                    variant="filled"
                    label="city"
                    name="userCity"
                    value={userInfo.userCity}
                    onChange={handleInputChange}
                    required
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => addUser([userInfo])}
                  >
                    Submit
                  </Button>
                </Form>
              </Formik>
              {isAlert && (
                <Alert severity="warning" className="mt-3">
                  <AlertTitle>Warning</AlertTitle>
                  Please, <strong>fill all the data</strong>
                </Alert>
              )}
            </div>
          </Fade>
        </Modal>
      </div>
    </>
  );
}
