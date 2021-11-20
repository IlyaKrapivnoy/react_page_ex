import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import { addUserAction } from '../store/userReducer';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles({
    root: {
        width: 500,
    },
});

export default function ButtonsNav() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

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
                        onClick={() => addUser(prompt())}
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
            </div>
        </>
    );
}
