import { createSlice } from "@reduxjs/toolkit";

const spendingCategoryArraySlice = createSlice({
  name: "spendingArray",
  initialState: {
    value: (()=>{
      const storedArray = JSON.parse(localStorage.getItem("spendingCategoryArray"));
      return storedArray || [];
    })(),
  },
  reducers: {
    addToSpendingArray: (state, action) => {
      state.value = [action.payload, ...state.value];
    },
    resetSpendingArray:(state)=>{
        state.value = []
    }
  },
});

export const {addToSpendingArray,resetSpendingArray} = spendingCategoryArraySlice.actions;

const spendingArrayReducer = spendingCategoryArraySlice.reducer;
export default spendingArrayReducer;