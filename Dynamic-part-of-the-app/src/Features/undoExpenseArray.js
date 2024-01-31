
import { createSlice } from "@reduxjs/toolkit";

const undoExpenseArraySlice = createSlice({
    name:"undoExpense",
    initialState:{
        value:[]
    },
    reducers:{
        addToUndoExpenseArray:(state,action)=>{
            state.value = action.payload;
        }
    }
})
export const {addToUndoExpenseArray} = undoExpenseArraySlice.actions;
const undoExpenseArrayReducer = undoExpenseArraySlice.reducer;
export default undoExpenseArrayReducer;