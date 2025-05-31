import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createStudent,
  deleteStudent,
  getAllStudents,
  getOneStudent,
  updateStudent,
} from "@/service/studentService";
import { refresh } from "@/service/authService";

export const createStudentThunk = createAsyncThunk(
  "student/create",
  async (
    {
      accessToken,
      studentData,
    }: { accessToken: string; studentData: FormData },
    thunkAPI
  ) => {
    try {
      const res = await createStudent(accessToken, studentData);
      return { res: res.data, accessToken };
    } catch (error: any) {
      if (error.response.status === 403) {
        try {
          const res = await refresh();
          const { newAccessToken } = res.data;
          if (newAccessToken) {
            try {
              const res = await createStudent(newAccessToken, studentData);
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

export const getAllStudentsThunk = createAsyncThunk(
  "student/getAll",
  async (
    {
      accessToken,
      school_id,
      page,
      limit,
      first_name_search,
      last_name_search,
      sortByDate,
      sortByName,
    }: {
      accessToken: string;
      school_id: string;
      page?: number;
      limit?: number;
      first_name_search?: string;
      last_name_search?: string;
      sortByDate?: string;
      sortByName?: string;
    },
    thunkAPI
  ) => {
    try {
      const res = await getAllStudents(
        accessToken,
        school_id,
        page,
        limit,
        first_name_search,
        last_name_search,
        sortByDate,
        sortByName
      );
      return { res: res.data, accessToken };
    } catch (error: any) {
      if (error.response.status === 401) {
        try {
          const res = await refresh();
          const { newAccessToken } = res.data;
          if (newAccessToken) {
            try {
              const res = await getAllStudents(
                newAccessToken,
                school_id,
                page,
                limit,
                first_name_search,
                last_name_search,
                sortByDate
              );
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

export const getOneStudentThunk = createAsyncThunk(
  "student/getOne",
  async (
    {
      accessToken,
      student_id,
      school_id,
    }: { accessToken: string; student_id: string; school_id: string },
    thunkAPI
  ) => {
    try {
      const res = await getOneStudent(accessToken, student_id, school_id);
      return { res: res.data, accessToken };
    } catch (error: any) {
      if (error.response.status === 403) {
        try {
          const res = await refresh();
          const { newAccessToken } = res.data;
          if (newAccessToken) {
            try {
              const res = await getOneStudent(
                newAccessToken,
                student_id,
                school_id
              );
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

export const updateStudentThunk = createAsyncThunk(
  "student/update",
  async (
    {
      accessToken,
      studentData,
      student_id,
      school_id,
    }: {
      accessToken: string;
      studentData: FormData;
      student_id: string;
      school_id: string;
    },
    thunkAPI
  ) => {
    try {
      const res = await updateStudent(
        accessToken,
        studentData,
        student_id,
        school_id
      );
      return { res: res.data, accessToken };
    } catch (error: any) {
      if (error.response.status === 403) {
        try {
          const res = await refresh();
          const { newAccessToken } = res.data;
          if (newAccessToken) {
            try {
              const res = await updateStudent(
                accessToken,
                studentData,
                student_id,
                school_id
              );
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

export const deleteStudentThunk = createAsyncThunk(
  "student/delete",
  async (
    {
      accessToken,
      student_id,
      school_id,
    }: {
      accessToken: string;
      student_id: string;
      school_id: string;
    },
    thunkAPI
  ) => {
    try {
      const res = await deleteStudent(accessToken, student_id, school_id);
      return { res: res.data, accessToken };
    } catch (error: any) {
      if (error.response.status === 403) {
        try {
          const res = await refresh();
          const { newAccessToken } = res.data;
          if (newAccessToken) {
            try {
              const res = await deleteStudent(
                accessToken,
                student_id,
                school_id
              );
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

const studentSlice = createSlice({
  name: "student",
  initialState: {
    isLoading: false,
    students: [],
    error: "",
    accessToken: "",
    student: {},
    page: 0,
    pageCount: 0,
    total: 0,
    showEdietButtons: false,
  },
  reducers: {
    toggleShowEdietButtons: (state) => {
      state.showEdietButtons = !state.showEdietButtons;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createStudentThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createStudentThunk.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(createStudentThunk.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload.data;
      })
      .addCase(getAllStudentsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllStudentsThunk.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.students = action.payload.res.data;
        state.accessToken = action.payload.accessToken;
        state.page = action.payload.res.page;
        state.pageCount = action.payload.res.pageCount;
        state.total = action.payload.res.total;
      })
      .addCase(getAllStudentsThunk.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getOneStudentThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOneStudentThunk.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.student = action.payload.res;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(getOneStudentThunk.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateStudentThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateStudentThunk.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(updateStudentThunk.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteStudentThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteStudentThunk.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(deleteStudentThunk.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { toggleShowEdietButtons } = studentSlice.actions;
export default studentSlice.reducer;
