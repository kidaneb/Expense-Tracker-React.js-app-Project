import { createSlice } from "@reduxjs/toolkit";

const undoBudgetArraySlice = createSlice({
    name:"undoBudget",
    initialState:{
        value:[]
    },
    reducers:{
        addToUndoBudgetArray:(state,action)=>{
            state.value = action.payload;
        }
    }
})
export const {addToUndoBudgetArray} = undoBudgetArraySlice.actions;
const undoBudgetArrayReducer = undoBudgetArraySlice.reducer;
export default undoBudgetArrayReducer;