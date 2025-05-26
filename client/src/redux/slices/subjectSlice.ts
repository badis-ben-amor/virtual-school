import { refresh } from "@/service/authService";
import {
  createSubject,
  deleteSubject,
  getAllSubjects,
  getOneSubject,
  updateSubject,
} from "@/service/subjectService";
import { SubjectType } from "@/types/subjectType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deflate } from "zlib";

export const createSubjectThunk = createAsyncThunk(
  "subject/create",
  async (
    {
      accessToken,
      subjectData,
      school_id,
    }: { accessToken: string; subjectData: SubjectType; school_id: string },
    thunkAPI
  ) => {
    try {
      const res = await createSubject(accessToken, subjectData, school_id);
      return { data: res.data, accessToken };
    } catch (error: any) {
      if (error.response.status === 401) {
        try {
          const res = await refresh();
          const { newAccessToken } = res.data;
          if (newAccessToken) {
            try {
              const res = await createSubject(
                newAccessToken,
                subjectData,
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

export const getAllSubjectsThunk = createAsyncThunk(
  "subject/getAll",
  async (
    { accessToken, school_id }: { accessToken: string; school_id: string },
    thunkAPI
  ) => {
    try {
      const res = await getAllSubjects(accessToken, school_id);
      return { data: res.data, accessToken };
    } catch (error: any) {
      if (error.response.status === 401) {
        try {
          const res = await refresh();
          const { newAccessToken } = res.data;
          if (newAccessToken) {
            try {
              const res = await getAllSubjects(newAccessToken, school_id);
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

export const getOneSubjectThunk = createAsyncThunk(
  "subject/getOne",
  async (
    {
      accessToken,
      subject_id,
      school_id,
    }: { accessToken: string; subject_id: string; school_id: string },
    thunkAPI
  ) => {
    try {
      const res = await getOneSubject(accessToken, subject_id, school_id);
      return { data: res.data, accessToken };
    } catch (error: any) {
      if (error.response.status === 401) {
        try {
          const res = await refresh();
          const { newAccessToken } = res.data;
          if (newAccessToken) {
            try {
              const res = await getAllSubjects(newAccessToken, school_id);
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

export const updateSubjectThunk = createAsyncThunk(
  "subject/update",
  async (
    {
      accessToken,
      subject_id,
      school_id,
      subjectData,
    }: {
      accessToken: string;
      subject_id: string;
      school_id: string;
      subjectData: SubjectType;
    },
    thunkAPI
  ) => {
    try {
      const res = await updateSubject(
        accessToken,
        subject_id,
        school_id,
        subjectData
      );
      return { data: res.data, accessToken };
    } catch (error: any) {
      if (error.response.status === 401) {
        try {
          const res = await refresh();
          const { newAccessToken } = res.data;
          if (newAccessToken) {
            try {
              const res = await updateSubject(
                newAccessToken,
                subject_id,
                school_id,
                subjectData
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

export const deleteSubjectThunk = createAsyncThunk(
  "subject/delete",
  async (
    {
      accessToken,
      subject_id,
      school_id,
    }: {
      accessToken: string;
      subject_id: string;
      school_id: string;
    },
    thunkAPI
  ) => {
    try {
      const res = await deleteSubject(accessToken, subject_id, school_id);
      return { data: res.data, accessToken };
    } catch (error: any) {
      if (error.response.status === 401) {
        try {
          const res = await refresh();
          const { newAccessToken } = res.data;
          if (newAccessToken) {
            try {
              const res = await deleteSubject(
                newAccessToken,
                subject_id,
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

const subjectSlice = createSlice({
  name: "subject",
  initialState: {
    isLoading: false,
    subjects: [],
    subject: {},
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
      .addCase(createSubjectThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createSubjectThunk.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createSubjectThunk.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getAllSubjectsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllSubjectsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.subjects = action.payload.data;
      })
      .addCase(getAllSubjectsThunk.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getOneSubjectThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOneSubjectThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.subject = action.payload.data;
      })
      .addCase(getOneSubjectThunk.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateSubjectThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSubjectThunk.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateSubjectThunk.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteSubjectThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSubjectThunk.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteSubjectThunk.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default subjectSlice.reducer;
export const { toggleShowEditeButtons } = subjectSlice.actions;
