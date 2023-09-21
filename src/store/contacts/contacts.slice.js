import { createSlice } from "@reduxjs/toolkit";

// create slice

const name = "contact";
const initialState = createInitialState();
const reducers = createReducers();
const slice = createSlice({ name, initialState, reducers });

// exports

export const contactActions = { ...slice.actions };
export const contactReducer = slice.reducer;


function createInitialState() {
    return {
        contacts: {}
    };
}

function createReducers() {
    const getContacts = (state, action) => {
        console.log('state,action', state, action)
    };

    return {
        getContacts        
    };
}

export const { getContacts } = slice.actions;
