import React from 'react';
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
    const addUser = (name) => {
        const user = {
            name,
            id: Date.now(),
        };
        dispatch(addUserAction(user));
    };

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
                            <h2 id='transition-modal-title'>
                                Transition modal
                            </h2>
                            <p id='transition-modal-description'>
                                react-transition-group animates me.
                            </p>
                        </div>
                    </Fade>
                </Modal>
            </div>
        </>
    );
}
