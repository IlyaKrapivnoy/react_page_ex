import { ADD_SINGLE_USER, REMOVE_SINGLE_USER, ADD_MANY_USERS } from './types';

const initialState = {
    users: [],
};

export const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ADD_MANY_USERS:
            return {
                ...state,
                users: [...state.users, ...payload],
            };

        case ADD_SINGLE_USER:
            return {
                ...state,
                users: [...state.users, payload],
            };

        case REMOVE_SINGLE_USER:
            return {
                ...state,
                users: state.users.filter((user) => user.id !== payload),
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
