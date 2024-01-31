import { createSlice } from "@reduxjs/toolkit";

const budgetItemsArraySlice = createSlice({
  name: "budgetArray",
  initialState: {
    value: (()=>{
      const storedArray = JSON.parse(localStorage.getItem("BudgetItemsArray"));
      return storedArray || [];
    })(),
  },
  reducers: {
    addToBudgetArray: (state, action) => {
      state.value = [action.payload, ...state.value];
    },
    filterBudgetArray: (state, action) => {
      state.value = state.value.filter((item) => item.id !== action.payload);
    },
    setToBudgetArray: (state, action) => {
      state.value = action.payload;
    },
    resetBudgetArray: (state) => {
      state.value = [];
    },
  },
});

export const { addToBudgetArray, filterBudgetArray, setToBudgetArray,resetBudgetArray } =
  budgetItemsArraySlice.actions;
const budgetArrayReducer = budgetItemsArraySlice.reducer;
export default budgetArrayReducer;
