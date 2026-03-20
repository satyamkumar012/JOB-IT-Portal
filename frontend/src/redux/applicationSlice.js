import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
    name: "application",
    initialState: {
        allAppliedJobs: [],
        applicants:null,
    },
    reducers: {
        setAllAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload;
        },
        setAllApplicants:(state,action) => {
            state.applicants = action.payload;
        },
        setApplicantsStatus: (state, action) => {
            const { id, status } = action.payload;
            if (state.applicants && state.applicants.applications) {
                state.applicants.applications = state.applicants.applications.map(app => 
                    app._id === id ? { ...app, status } : app
                );
            }
        }
    }
});
export const { setAllAppliedJobs, setAllApplicants, setApplicantsStatus } = applicationSlice.actions;
export default applicationSlice.reducer;