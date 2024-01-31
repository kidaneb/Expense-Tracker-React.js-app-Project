import { createSlice } from "@reduxjs/toolkit";

const budgetSlice = createSlice({
    name:"budget",
    initialState:{
        value:0
    },
    reducers:{
        setBudget:(state,action)=>{
            state.value = action.payload;
        }
    }

})

export const {setBudget} = budgetSlice.actions;
const budgetReducer = budgetSlice.reducer;
export default budgetReducer;