import { configureStore } from "@reduxjs/toolkit";
import homeSlice from "./homeSlice";
import authenticationSlice from "./authenticationSlice";
import watchlistSlice from "./watchlistSlice";

export const store = configureStore({
  reducer: {
    home: homeSlice,
    auth: authenticationSlice,
    watchlist: watchlistSlice,
  },
});
