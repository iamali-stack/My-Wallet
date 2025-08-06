import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  transactions: [],
  visibleTransactions: []
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      state.transactions.push(action.payload);
      state.visibleTransactions.push(action.payload);
      localStorage.setItem('transactions', JSON.stringify(state.transactions));
      localStorage.setItem('visibleTransactions', JSON.stringify(state.visibleTransactions));
    },
    deleteTransaction: (state, action) => {
      state.visibleTransactions = state.visibleTransactions.filter(
        (t) => t.id !== action.payload
      );
      localStorage.setItem('visibleTransactions', JSON.stringify(state.visibleTransactions));
    },
    loadTransactions: (state, action) => {
      state.transactions = action.payload;
      const storedVisible = localStorage.getItem('visibleTransactions');
      if (storedVisible) {
        state.visibleTransactions = JSON.parse(storedVisible);
      } else {
        state.visibleTransactions = action.payload;
        localStorage.setItem('visibleTransactions', JSON.stringify(action.payload));
      }
    }
  }
});

export const { addTransaction, deleteTransaction, loadTransactions } = transactionSlice.actions;
export default transactionSlice.reducer;
