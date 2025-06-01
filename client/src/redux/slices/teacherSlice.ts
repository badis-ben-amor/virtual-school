import { refresh } from "@/service/authService";
import {
  createTeacher,
  deleteTeacher,
  getAllTeachers,
  getOneTeacher,
  updateTeacher,
} from "@/service/teacherService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createTeacherThunk = createAsyncThunk(
  "teacher/create",
  async (
    {
      accessToken,
      teacherData,
    }: {
      accessToken: string;
      teacherData: FormData;
    },
    thunkAPI
  ) => {
    try {
      const res = await createTeacher(accessToken, teacherData);
      return { data: res.data, accessToken };
    } catch (error: any) {
      if (error.response?.status === 401) {
        try {
          const res = await refresh();
          const { newAccessToken } = res.data;
          if (newAccessToken) {
            try {
              const res = await createTeacher(newAccessToken, teacherData);
              return { data: res.data, accessToken: newAccessToken };
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

export const getAllTeachersThunk = createAsyncThunk(
  "teacher/getAll",
  async (
    {
      accessToken,
      school_id,
    }: {
      accessToken: string;
      school_id: string;
    },
    thunkAPI
  ) => {
    try {
      const res = await getAllTeachers(accessToken, school_id);
      return { data: res.data, accessToken };
    } catch (error: any) {
      if (error.response?.status === 401) {
        try {
          const res = await refresh();
          const { newAccessToken } = res.data;
          if (newAccessToken) {
            try {
              const res = await getAllTeachers(newAccessToken, school_id);
              return { data: res.data, accessToken: newAccessToken };
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

export const getOneTeacherThunk = createAsyncThunk(
  "teacher/getOne",
  async (
    {
      accessToken,
      teacher_id,
      school_id,
    }: {
      accessToken: string;
      teacher_id: string;
      school_id: string;
    },
    thunkAPI
  ) => {
    try {
      const res = await getOneTeacher(accessToken, teacher_id, school_id);
      return { data: res.data, accessToken };
    } catch (error: any) {
      if (error.response?.status === 401) {
        try {
          const res = await refresh();
          const { newAccessToken } = res.data;
          if (newAccessToken) {
            try {
              const res = await getOneTeacher(
                accessToken,
                teacher_id,
                school_id
              );
              return { data: res.data, accessToken: newAccessToken };
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

export const updateTeacherThunk = createAsyncThunk(
  "teacher/update",
  async (
    {
      accessToken,
      teacher_id,
      school_id,
      teacherData,
    }: {
      accessToken: string;
      teacher_id: string;
      school_id: string;
      teacherData: FormData;
    },
    thunkAPI
  ) => {
    try {
      const res = await updateTeacher(
        accessToken,
        teacher_id,
        school_id,
        teacherData
      );
      return { data: res.data, accessToken };
    } catch (error: any) {
      if (error.response?.status === 401) {
        try {
          const res = await refresh();
          const { newAccessToken } = res.data;
          if (newAccessToken) {
            try {
              const res = await updateTeacher(
                accessToken,
                teacher_id,
                school_id,
                teacherData
              );
              return { data: res.data, accessToken: newAccessToken };
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

export const deleteTeacherThunk = createAsyncThunk(
  "teacher/delete",
  async (
    {
      accessToken,
      teacher_id,
      school_id,
    }: {
      accessToken: string;
      teacher_id: string;
      school_id: string;
    },
    thunkAPI
  ) => {
    try {
      const res = await deleteTeacher(accessToken, teacher_id, school_id);
      return { data: res.data, accessToken };
    } catch (error: any) {
      if (error.response?.status === 401) {
        try {
          const res = await refresh();
          const { newAccessToken } = res.data;
          if (newAccessToken) {
            try {
              const res = await deleteTeacher(
                accessToken,
                teacher_id,
                school_id
              );
              return { data: res.data, accessToken: newAccessToken };
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

const teacherSlice = createSlice({
  name: "teacher",
  initialState: {
    isLoading: false,
    teachers: [],
    teacher: {},
    error: "",
    accessToken: "",
    showEditeButtons: false,
  },
  reducers: {
    toggleShowEditeButtons: (state) => {
      state.showEditeButtons = !state.showEditeButtons;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTeacherThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTeacherThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(createTeacherThunk.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.pending;
      })
      .addCase(getAllTeachersThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllTeachersThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.teachers = action.payload.data.data;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(getAllTeachersThunk.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.pending;
      })
      .addCase(getOneTeacherThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOneTeacherThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.teacher = action.payload.data;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(getOneTeacherThunk.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.pending;
      })
      .addCase(updateTeacherThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTeacherThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(updateTeacherThunk.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.pending;
      })
      .addCase(deleteTeacherThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTeacherThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(deleteTeacherThunk.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.pending;
      });
  },
});

export default teacherSlice.reducer;
export const { toggleShowEditeButtons } = teacherSlice.actions;
