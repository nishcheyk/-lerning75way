
import { createSlice } from "@reduxjs/toolkit";
import { api } from "../services/api"; // your RTK Query api import

interface AuthState {
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthenticated(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.isAuthenticated = true;
      }
    );
    builder.addMatcher(
      api.endpoints.logout.matchFulfilled,
      (state) => {
        
        state.isAuthenticated = false;
      }
    );
  },
});

export const { setAuthenticated } = authSlice.actions;
export default authSlice.reducer;


