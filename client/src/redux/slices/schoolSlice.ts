import { refresh } from "@/service/authService";
import {
  createSchool,
  getAllSchools,
  getOneSchool,
  updateSchool,
  deleteSchool,
  getActiveSchool,
} from "@/service/schoolService";
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
              return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
              );
            }
          }
        } catch (error: any) {
          return thunkAPI.rejectWithValue(
            error.response?.data?.message || error.message
          );
        }
      }
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const getAllSchoolsThunk = createAsyncThunk(
  "schools/getAll",
  async (
    {
      accessToken,
      page,
      limit,
      search_by_name,
      sort_by_name,
      sort_by_date,
    }: {
      accessToken: string;
      page: number;
      limit: number;
      search_by_name?: string;
      sort_by_name?: string;
      sort_by_date: string;
    },
    thunkAPI
  ) => {
    try {
      const res = await getAllSchools(
        accessToken,
        page,
        limit,
        search_by_name,
        sort_by_name,
        sort_by_date
      );
      return { res: res.data, accessToken };
    } catch (error: any) {
      if (error.response?.status === 403) {
        try {
          const res = await refresh();
          const newAccessToken = res.data.newAccessToken;
          if (newAccessToken) {
            try {
              const res = await getAllSchools(
                newAccessToken,
                page,
                limit,
                search_by_name,
                sort_by_name,
                sort_by_date
              );
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
      }
      return thunkAPI.rejectWithValue(error.message);
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
      }
      return thunkAPI.rejectWithValue(error.message);
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
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const schoolSlice = createSlice({
  name: "school",
  initialState: {
    isLoadingGetAll: false,
    schools: [],
    school: {},
    activeSchool: {},
    error: null,
    accessToken: "",
    showEditeIcons: false,
    page: 1,
    limit: 6,
    pageCount: 0,
    total: 0,
    pageFromApi: 0,
    search_by_name: "",
    search_input_value: "",
    sort_by_name: "",
    sort_by_date: "",
  },
  reducers: {
    toggleShowEditeIcons: (state) => {
      state.showEditeIcons = !state.showEditeIcons;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setSearch_by_name: (state, action) => {
      state.search_by_name = action.payload;
    },
    setSearch_input_value: (state, action) => {
      state.search_input_value = action.payload;
    },
    setSort_by_name: (state, action) => {
      state.sort_by_name = action.payload;
    },
    setSort_by_date: (state, action) => {
      state.sort_by_date = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSchoolThunk.pending, (state) => {})
      .addCase(createSchoolThunk.fulfilled, (state, action: any) => {
        state.accessToken = action.payload.accessToken;
      })
      .addCase(createSchoolThunk.rejected, (state, action: any) => {
        state.error = action.payload;
      })
      .addCase(getAllSchoolsThunk.pending, (state) => {
        state.isLoadingGetAll = true;
      })
      .addCase(getAllSchoolsThunk.fulfilled, (state, action) => {
        state.isLoadingGetAll = false;
        state.schools = action.payload.res.data;
        state.pageCount = action.payload.res.pageCount;
        state.pageFromApi = action.payload.res.page;
      })
      .addCase(getAllSchoolsThunk.rejected, (state, action: any) => {
        state.isLoadingGetAll = false;
        state.error = action.payload;
      })
      .addCase(getOneSchoolThunk.pending, (state) => {})
      .addCase(getOneSchoolThunk.fulfilled, (state, action: any) => {
        state.school = action.payload.res;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(getOneSchoolThunk.rejected, (state, action: any) => {
        state.error = action.payload;
      })
      .addCase(getActiveSchoolThunk.pending, (state) => {})
      .addCase(getActiveSchoolThunk.fulfilled, (state, action: any) => {
        state.activeSchool = action.payload.res.activeSchool;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(getActiveSchoolThunk.rejected, (state, action: any) => {
        state.error = action.payload;
      })
      .addCase(updateSchoolThunk.pending, (state) => {})
      .addCase(updateSchoolThunk.fulfilled, (state, action: any) => {
        state.accessToken = action.payload.accessToken;
      })
      .addCase(updateSchoolThunk.rejected, (state, action: any) => {
        state.error = action.payload;
      })
      .addCase(deleteSchoolThunk.pending, (state) => {})
      .addCase(deleteSchoolThunk.fulfilled, (state, action: any) => {
        state.accessToken = action.payload.accessToken;
      })
      .addCase(deleteSchoolThunk.rejected, (state, action: any) => {
        state.error = action.payload;
      });
  },
});

export default schoolSlice.reducer;
export const {
  toggleShowEditeIcons,
  setPage,
  setSearch_by_name,
  setSearch_input_value,
  setSort_by_name,
  setSort_by_date,
} = schoolSlice.actions;
