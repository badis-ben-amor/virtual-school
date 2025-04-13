import { refresh } from "@/service/authService";
import {
  createSchool,
  deleteSchool,
  getSchool,
  updateSchool,
} from "@/service/schoolService";
import { School } from "@/types/school";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getSchoolThunk = createAsyncThunk(
  "school/get",
  async (accessToken: string, thunkAPI) => {
    try {
      const res = await getSchool(accessToken);
      return { data: res.data, accessToken };
    } catch (error: any) {
      if (error.response.status === 401) {
        try {
          const res = await refresh();
          const { newAccessToken } = res.data;
          if (newAccessToken) {
            try {
              const res = await getSchool(newAccessToken);
              return { data: res.data, accessToken: newAccessToken };
            } catch (error: any) {
              return thunkAPI.rejectWithValue(error.message);
            }
          }
        } catch (error: any) {
          return thunkAPI.rejectWithValue(error.message);
        }
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const createSchoolThunk = createAsyncThunk(
  "school/create",
  async (
    { accessToken, schoolData }: { accessToken: string; schoolData: School },
    thunkAPI
  ) => {
    try {
      const res = await createSchool(accessToken, schoolData);
      return res.data;
    } catch (error: any) {
      if (error.response.status === 401) {
        try {
          const res = await refresh();
          const { newAccessToken } = res.data;
          if (newAccessToken) {
            try {
              const res = await createSchool(newAccessToken, schoolData);
              return { data: res.data, accessToken: newAccessToken };
            } catch (error: any) {
              return thunkAPI.rejectWithValue(error.message);
            }
          }
        } catch (error: any) {
          return thunkAPI.rejectWithValue(error.message);
        }
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const updateSchoolThunk = createAsyncThunk(
  "school/update",
  async (
    { accessToken, schoolData }: { accessToken: string; schoolData: School },
    thunkAPI
  ) => {
    try {
      const res = await updateSchool(accessToken, schoolData);
      return res.data;
    } catch (error: any) {
      if (error.response.status === 401) {
        try {
          const res = await refresh();
          const { newAccessToken } = res.data;
          if (newAccessToken) {
            try {
              const res = await updateSchool(newAccessToken, schoolData);
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

export const deleteSchoolThunk = createAsyncThunk(
  "school/delete",
  async (accessToken: string, thunkAPI) => {
    try {
      const res = await deleteSchool(accessToken);
      return { data: res.data, accessToken };
    } catch (error: any) {
      if (error.response.status === 401) {
        try {
          const res = await refresh();
          const { newAccessToken } = res.data;
          if (newAccessToken) {
            try {
              const res = await deleteSchool(newAccessToken);
              return { data: res.data, accessToken: newAccessToken };
            } catch (error: any) {
              return thunkAPI.rejectWithValue(error.message);
            }
          }
        } catch (error: any) {
          thunkAPI.rejectWithValue(error.message);
        }
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

const schoolSlice = createSlice({
  name: "school",
  initialState: { isLoading: false, school: {}, error: null, accessToken: "" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSchoolThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSchoolThunk.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.school = action.payload.data;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(getSchoolThunk.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createSchoolThunk.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createSchoolThunk.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(createSchoolThunk.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateSchoolThunk.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateSchoolThunk.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(updateSchoolThunk.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteSchoolThunk.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteSchoolThunk.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(deleteSchoolThunk.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default schoolSlice.reducer;
