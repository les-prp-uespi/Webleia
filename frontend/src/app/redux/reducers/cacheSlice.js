import { createSlice } from '@reduxjs/toolkit';

const cacheSlice = createSlice({
    name: 'cache',
    initialState: {},
    reducers: {
        setCache: (state, action) => {
            state[action.payload.key] = action.payload.data;
        },
        clearCache: (state, action) => {
            const cacheKey = action.payload
            const keys = Object.keys(state).filter(key => key.includes(`#${cacheKey}#`))
            keys.forEach(key => {
                state[key] = undefined
            })
        },
    },
});

export const { setCache, clearCache } = cacheSlice.actions;
export const selectCache = (state, key) => state.cache[key];
export default cacheSlice.reducer;