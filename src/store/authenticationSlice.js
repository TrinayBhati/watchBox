import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const authenticationSlice = createSlice({
  name: "auth",
  initialState: {
    status: "",
    password: "",
    error: "",
  },
  reducers: {
    getLogIn: (state, action) => {
      state.status = action.payload;
    },

    getSignUp: (state, action) => {
      state.status = action.payload;
    },
    getUpdatePassword: (state, action) => {
      state.password = action.payload;
    },
    getError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const signUp = (name, email, password) => async (dispatch) => {
  try {
    const response = await axios.post(
      "https://academics.newtonschool.co/api/v1/user/signup",
      {
        name,
        email,
        password,
        appType: "ott",
      },
      {
        headers: {
          projectId: "f104bi07c490",
        },
      }
    );

    dispatch(getSignUp(response.data));
  } catch (error) {
    // dispatch(getError(error.message));
    dispatch(getError(error.message));
    // alert(error.message);
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post(
      "https://academics.newtonschool.co/api/v1/user/login",
      {
        email,
        password,
        appType: "ott",
      },
      {
        headers: {
          projectId: "f104bi07c490",
        },
      }
    );
    // console.log("res", response.data);
    // console.log("response", response)
    dispatch(getLogIn(response.data));
  } catch (error) {
    // console.log("error", error);
    // console.log("error", error.message);

    dispatch(getError(error.message));

    // alert(error.message);
  }
};

export const updatePassword =
  (name, email, passwordCurrent, newPassword, token) => async (dispatch) => {
    try {
      const response = await axios.patch(
        "https://academics.newtonschool.co/api/v1/user/updateMyPassword",
        {
          name,
          email,
          passwordCurrent,
          password: newPassword,
          appType: "ott",
        },
        {
          headers: {
            projectId: "f104bi07c490",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response);
      dispatch(getUpdatePassword(response.data));
    } catch (error) {
      dispatch(getError(error.message));
      // alert(error.message);
    }
  };

// Action creators are generated for each case reducer function
export const { getLogIn, getSignUp, getUpdatePassword, getError } =
  authenticationSlice.actions;

export default authenticationSlice.reducer;
