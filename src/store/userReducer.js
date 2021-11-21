import { ADD_SINGLE_USER, REMOVE_SINGLE_USER, ADD_MANY_USERS } from './types';

const defaultState = {
    users: [],
};

export const userReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ADD_MANY_USERS:
            return {
                ...state,
                users: [...state.users, ...action.payload],
            };

        case ADD_SINGLE_USER:
            return {
                ...state,
                users: [...state.users, action.payload],
            };

        case REMOVE_SINGLE_USER:
            return {
                ...state,
                users: state.users.filter((user) => user.id !== action.payload),
            };

        default:
            return state;
    }
};

export const addManyUsersAction = (payload) => ({
    type: ADD_MANY_USERS,
    payload,
});

export const addUserAction = (payload) => ({
    type: ADD_SINGLE_USER,
    payload,
});

export const removeUserAction = (payload) => ({
    type: REMOVE_SINGLE_USER,
    payload,
});
