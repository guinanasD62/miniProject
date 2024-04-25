import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const balanceSlice = createSlice({
  name: 'balance',
  initialState: {
    value: 0,
  },
  reducers: {
    deposit: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
      console.log(`Deposit: Current balance is ${state.value}`);
    },
    withdraw: (state, action: PayloadAction<number>) => {
      if (state.value >= action.payload) {
        state.value -= action.payload;
        console.log(`Withdraw: Current balance is ${state.value}`);
      } else {
        console.log("Attempt to withdraw failed: Insufficient balance");
      }
    },
  },
});

export const { deposit, withdraw } = balanceSlice.actions;
export default balanceSlice.reducer;
