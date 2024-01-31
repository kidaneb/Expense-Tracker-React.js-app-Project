import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
    name:"expense",
    initialState:{
        value:0
    },
    reducers:{
        setExpense:(state,action)=>{
            state.value = action.payload;
        }
    }

})

export const {setExpense} = expenseSlice.actions;
const expenseReducer = expenseSlice.reducer;
export default expenseReducer;