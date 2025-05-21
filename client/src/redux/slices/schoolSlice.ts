import { refresh } from "@/service/authService";
import {
  createSchool,
  getAllSchools,
  getOneSchool,
  updateSchool,
  deleteSchool,
  getActiveSchool,
} from "@/service/schoolService";
import { SchoolType } from "@/types/schoolType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createSchoolThunk = createAsyncThunk(
  "school/create",
  async (
    { accessToken, schoolData }: { accessToken: string; schoolData: FormData },
    thunkAPI
  ) => {
    try {
      const res = await createSchool(accessToken, schoolData);
      return { res: res.data, accessToken };
    } catch (error: any) {
      if (error.response.status === 401) {
        try {
          const res = await refresh();
          const { newAccessToken } = res.data;
          if (newAccessToken) {
            try {
              const res = await createSchool(newAccessToken, schoolData);
              return { res: res.data, accessToken: newAccessToken };
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

export const getAllSchoolsThunk = createAsyncThunk(
  "schools/getAll",
  async (accessToken: string, thunkAPI) => {
    try {
      const res = await getAllSchools(accessToken);
      return { res: res.data, accessToken };
    } catch (error: any) {
      if (error.response?.status === 403) {
        try {
          const res = await refresh();
          const newAccessToken = res.data.newAccessToken;
          if (newAccessToken) {
            try {
              const res = await getAllSchools(newAccessToken);
              return { res: res.data, accessToken: newAccessToken };
            } catch (error: any) {
              return thunkAPI.rejectWithValue(error.response?.data?.message);
            }
          }
        } catch (error: any) {
          return error.response?.data?.message;
        }
      }
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

export const getOneSchoolThunk = createAsyncThunk(
  "school/get",
  async (
    { accessToken, school_id }: { accessToken: string; school_id: string },
    thunkAPI
  ) => {
    try {
      const res = await getOneSchool(accessToken, school_id);
      return { res: res.data, accessToken };
    } catch (error: any) {
      if (error.response.status === 401) {
        try {
          const res = await refresh();
          const { newAccessToken } = res.data;
          if (newAccessToken) {
            try {
              const res = await getOneSchool(newAccessToken, school_id);
              return { res: res.data, accessToken: newAccessToken };
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

export const getActiveSchoolThunk = createAsyncThunk(
  "school/getActive",
  async (accessToken: string, thunkAPI) => {
    try {
      const res = await getActiveSchool(accessToken);
      return { res: res.data, accessToken };
    } catch (error: any) {
      if (error.response.status === 401) {
        try {
          const res = await refresh();
          const { newAccessToken } = res.data;
          if (newAccessToken) {
            try {
              const res = await getActiveSchool(newAccessToken);
              return { res: res.data, accessToken: newAccessToken };
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
    {
      accessToken,
      schoolData,
      school_id,
    }: { accessToken: string; schoolData: FormData; school_id: string },
    thunkAPI
  ) => {
    try {
      const res = await updateSchool(accessToken, schoolData, school_id);
      return { res: res.data, accessToken };
    } catch (error: any) {
      if (error.response.status === 401) {
        try {
          const res = await refresh();
          const { newAccessToken } = res.data;
          if (newAccessToken) {
            try {
              const res = await updateSchool(
                newAccessToken,
                schoolData,
                school_id
              );
              return { res: res.data, accessToken: newAccessToken };
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
  async (
    { accessToken, school_id }: { accessToken: string; school_id: string },
    thunkAPI
  ) => {
    try {
      const res = await deleteSchool(accessToken, school_id);
      return { res: res.data, accessToken };
    } catch (error: any) {
      if (error.response.status === 401) {
        try {
          const res = await refresh();
          const { newAccessToken } = res.data;
          if (newAccessToken) {
            try {
              const res = await deleteSchool(newAccessToken, school_id);
              return { res: res.data, accessToken: newAccessToken };
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
  initialState: {
    isLoading: false,
    schools: [],
    school: {},
    activeSchool: {},
    error: null,
    accessToken: "",
    showEditeIcons: false,
  },
  reducers: {
    toggleShowEditeIcons: (state) => {
      state.showEditeIcons = !state.showEditeIcons;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSchoolThunk.pending, (state) => {
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
      .addCase(getAllSchoolsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllSchoolsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.schools = action.payload.res;
      })
      .addCase(getAllSchoolsThunk.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getOneSchoolThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOneSchoolThunk.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.school = action.payload.res;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(getOneSchoolThunk.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getActiveSchoolThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getActiveSchoolThunk.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.activeSchool = action.payload.res.activeSchool;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(getActiveSchoolThunk.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateSchoolThunk.pending, (state) => {
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
      .addCase(deleteSchoolThunk.pending, (state) => {
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

export const { toggleShowEditeIcons } = schoolSlice.actions;
export default schoolSlice.reducer;
