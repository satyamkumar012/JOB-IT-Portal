import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        allUsers: [],
        allJobs: [],
        stats: null,
    },
    reducers: {
        setAllUsers: (state, action) => {
            state.allUsers = action.payload;
        },
        setAllJobs: (state, action) => {
            state.allJobs = action.payload;
        },
        setStats: (state, action) => {
            state.stats = action.payload;
        },
        removeUser: (state, action) => {
            state.allUsers = state.allUsers.filter(user => user._id !== action.payload);
        },
        removeJob: (state, action) => {
            state.allJobs = state.allJobs.filter(job => job._id !== action.payload);
        }
    }
});

export const { setAllUsers, setAllJobs, setStats, removeUser, removeJob } = adminSlice.actions;
export default adminSlice.reducer;
