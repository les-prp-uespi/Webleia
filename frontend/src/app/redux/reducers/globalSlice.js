import { createSlice } from '@reduxjs/toolkit';

const globalSlice = createSlice({
    name: 'global',
    initialState: {
        user: null,
        drawerState: false,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setDrawerState: (state, action) => {
            state.drawerState = action.payload
        },
    },
});

export const { setUser, setDrawerState } = globalSlice.actions;
export default globalSlice.reducer;