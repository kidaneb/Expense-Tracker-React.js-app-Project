import { createSlice } from "@reduxjs/toolkit";

const transactionItemIdSlice = createSlice({
  name: "transactionItemId",
  initialState: {
    value: false,
  },
  reducers: {
    setTransactionItemId: (state,action) => {
      state.value = action.payload;
    },
    
  },
});

export const { setTransactionItemId } = transactionItemIdSlice.actions;
const transactionItemIdReducer = transactionItemIdSlice.reducer;
export default transactionItemIdReducer;
