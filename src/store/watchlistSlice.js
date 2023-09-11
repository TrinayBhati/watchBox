import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: { list: null },
  reducers: {
    getAddToWatchlist: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const addToWatchlist = (songId, token) => async (dispatch) => {
  try {
    const response = await axios.patch(
      // `https://academics.newtonschool.co/api/v1/social_media/watchlist/${showId}`,
      ` https://academics.newtonschool.co/api/v1/music/favorites/like`,
      { songId }, // Pass the showId in the request body
      {
        headers: {
          Authorization: `Bearer ${token}`,
          projectId: "f104bi07c490",
        },
      }
    );
    // console.log("line ", response.data);
    if (response) {
      console.log("res", response.data);
      dispatch(getAddToWatchlist(response.data));
    }
  } catch (error) {
    dispatch(getAddToWatchList(error.message));
  }
};
// Action creators are generated for each case reducer function
export const { getAddToWatchlist } = watchlistSlice.actions;

export default watchlistSlice.reducer;

//==========================================================
