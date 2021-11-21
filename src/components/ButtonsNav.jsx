import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import { addUserAction } from '../store/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { TextField, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

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
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 10, 3),
        borderRadius: 10,
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: 300,
        justifyContent: 'space-around',
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
    const addUser = () => {
        const user = {
            name: userName,
            email: userEmail,
            phone: userPhone,
            city: userCity,
            id: Date.now(),
        };
        dispatch(addUserAction(user));
        setOpen(false);
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
                        onClick={handleOpen}
                    />
                    <BottomNavigationAction
                        label='Add Users'
                        icon={<GroupAddIcon />}
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
                            <Typography variant='h4' gutterBottom className=''>
                                Add User
                            </Typography>
                            <form
                                className={classes.form}
                                noValidate
                                autoComplete='off'
                            >
                                <TextField
                                    variant='filled'
                                    label='username'
                                    onChange={(e) =>
                                        setUserName(e.target.value)
                                    }
                                />
                                <TextField
                                    variant='filled'
                                    label='email'
                                    onChange={(e) =>
                                        setUserEmail(e.target.value)
                                    }
                                />
                                <TextField
                                    variant='filled'
                                    label='phone'
                                    onChange={(e) =>
                                        setUserPhone(e.target.value)
                                    }
                                />
                                <TextField
                                    variant='filled'
                                    label='city'
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
