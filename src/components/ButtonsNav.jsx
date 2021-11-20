import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import { addUserAction } from '../store/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { TextField, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 500,
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: 300,
        justifyContent: 'spaceAround',
    },
}));

export default function ButtonsNav() {
    const classes = useStyles();

    const [value, setValue] = React.useState(0);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const dispatch = useDispatch();
    const users = useSelector((state) => state.users.users);
    console.log(users);
    const addUser = (name, email, phone, city) => {
        const user = {
            name: userName,
            email: userEmail,
            phone: userPhone,
            city: userCity,
            id: Date.now(),
        };
        dispatch(addUserAction(user));
    };

    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [userCity, setUserCity] = useState('');

    return (
        <>
            <div className='flex justify-center mt-4'>
                <BottomNavigation
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    showLabels
                    className={classes.root}
                >
                    <BottomNavigationAction
                        label='Add User'
                        icon={<PersonAddIcon />}
                        // onClick={() => addUser(prompt())}
                        onClick={handleOpen}
                    />
                    <BottomNavigationAction
                        label='Add Users'
                        icon={<GroupAddIcon />}
                    />
                    <BottomNavigationAction
                        label='Remove User'
                        icon={<PersonAddDisabledIcon />}
                    />
                </BottomNavigation>
                <Modal
                    aria-labelledby='transition-modal-title'
                    aria-describedby='transition-modal-description'
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
                            <form
                                className={classes.form}
                                noValidate
                                autoComplete='off'
                            >
                                <TextField
                                    id='standard-basic'
                                    label='username'
                                    onChange={(e) =>
                                        setUserName(e.target.value)
                                    }
                                />
                                <TextField
                                    id='standard-basic'
                                    label='email'
                                    onChange={(e) =>
                                        setUserEmail(e.target.value)
                                    }
                                />
                                <TextField
                                    id='standard-basic'
                                    label='phone'
                                    onChange={(e) =>
                                        setUserPhone(e.target.value)
                                    }
                                />
                                <TextField
                                    id='standard-basic'
                                    label='phone'
                                    onChange={(e) =>
                                        setUserCity(e.target.value)
                                    }
                                />
                                <Button
                                    variant='contained'
                                    color='primary'
                                    onClick={(e) =>
                                        addUser([
                                            userName,
                                            userEmail,
                                            userPhone,
                                            userCity,
                                        ])
                                    }
                                >
                                    Submit
                                </Button>
                            </form>
                        </div>
                    </Fade>
                </Modal>
            </div>
        </>
    );
}
