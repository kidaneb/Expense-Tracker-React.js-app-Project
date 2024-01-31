import { createSlice } from "@reduxjs/toolkit";

const expenseItemsArraySlice = createSlice({
  name: "expenseArray",
  initialState: {
    value: (() => {
      const storedArray = JSON.parse(localStorage.getItem("ExpenseItemsArray"));
      return storedArray || [];
    })(),
  },
  reducers: {
    addToExpenseArray: (state, action) => {
      state.value = [action.payload, ...state.value];
    },
    filterExpenseArray: (state, action) => {
      state.value = state.value.filter((item) => item.id !== action.payload);
    },
    setToExpenseArray: (state, action) => {
      state.value = action.payload;
    },
    resetExpenseArray: (state) => {
      state.value = [];
    },
  },
});

export const {
  addToExpenseArray,
  filterExpenseArray,
  setToExpenseArray,
  resetExpenseArray,
} = expenseItemsArraySlice.actions;
const expenseArrayReducer = expenseItemsArraySlice.reducer;
export default expenseArrayReducer;
