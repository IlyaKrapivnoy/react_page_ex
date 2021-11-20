import { ADD_SINGLE_USER } from './types';

const defaultState = {
    users: [],
};

export const userReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ADD_SINGLE_USER:
            return {
                ...state,
                users: [...state.users, action.payload],
            };
        default:
            return state;
    }
};

export const addUserAction = (payload) => ({
    type: ADD_SINGLE_USER,
    payload,
});
