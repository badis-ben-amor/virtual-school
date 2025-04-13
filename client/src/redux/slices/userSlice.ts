import { refresh } from "@/service/authService";
import { getUser } from "@/service/userService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getUserThunk = createAsyncThunk(
  "user/get",
  async (accessToken: string, thunkAPI) => {
    try {
      const res = await getUser(accessToken);
      return res.data;
    } catch (error: any) {
      if (error.response.status === 401) {
        try {
          const res = await refresh();
          const { newAccessToken } = res.data;
          if (newAccessToken) {
            try {
              const res = await getUser(newAccessToken);
              return { data: res.data, accessToken: newAccessToken };
            } catch (error: any) {
              return thunkAPI.rejectWithValue(error.message);
            }
          }
        } catch (error: any) {
          return thunkAPI.rejectWithValue(error.message);
        }
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    user: {},
    accessToken: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserThunk.pending, (state) => {
        state.isLoading;
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(getUserThunk.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
