import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currencyPair: "BTCUSDT",
  interval: "1d",
  data: [],
  error: null,
};

const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    setCurrencyPair: (state, action) => {
      state.currencyPair = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setCurrencyPair, setData } = cryptoSlice.actions;
export default cryptoSlice.reducer;
