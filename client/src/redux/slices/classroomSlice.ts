import { refresh } from "@/service/authService";
import {
  createClassroom,
  deleteClassroom,
  getAllClassroom,
  getOneClassroom,
  updateClassroom,
} from "@/service/classroomService";
import { ClassroomType } from "@/types/classroomType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createClassroomThunk = createAsyncThunk(
  "classroom/create",
  async (
    {
      accessToken,
      classroomData,
      school_id,
    }: { accessToken: string; classroomData: ClassroomType; school_id: string },
    thunkAPI
  ) => {
    try {
      const res = await createClassroom(accessToken, classroomData, school_id);
      return res.data;
    } catch (error: any) {
      if (error.response.status === 401)
        try {
          const res = await refresh();
          const newAccessToken = res.data?.newAccessToken;
          if (newAccessToken) {
            try {
              const res = await createClassroom(
                newAccessToken,
                classroomData,
                school_id
              );
              return res.data;
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
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const getAllClassroomThunk = createAsyncThunk(
  "classroom/getAll",
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
      const res = await getAllClassroom(accessToken, school_id);
      return res.data;
    } catch (error: any) {
      if (error.response.status === 401)
        try {
          const res = await refresh();
          const newAccessToken = res.data?.newAccessToken;
          if (newAccessToken) {
            try {
              const res = await getAllClassroom(newAccessToken, school_id);
              return res.data;
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
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const getOneClassroomThunk = createAsyncThunk(
  "classroom/getOne",
  async (
    {
      accessToken,
      classroom_id,
      school_id,
    }: {
      accessToken: string;
      classroom_id: string;
      school_id: string;
    },
    thunkAPI
  ) => {
    try {
      const res = await getOneClassroom(accessToken, classroom_id, school_id);
      return res.data;
    } catch (error: any) {
      if (error.response.status === 401)
        try {
          const res = await refresh();
          const newAccessToken = res.data?.newAccessToken;
          if (newAccessToken) {
            try {
              const res = await getOneClassroom(
                accessToken,
                classroom_id,
                school_id
              );
              return res.data;
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
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const updateClassroomThunk = createAsyncThunk(
  "classroom/update",
  async (
    {
      accessToken,
      classroomData,
      classroom_id,
    }: {
      accessToken: string;
      classroomData: ClassroomType;
      classroom_id: string;
    },
    thunkAPI
  ) => {
    try {
      const res = await updateClassroom(
        accessToken,
        classroomData,
        classroom_id
      );
      return res.data;
    } catch (error: any) {
      if (error.response.status === 401)
        try {
          const res = await refresh();
          const newAccessToken = res.data?.newAccessToken;
          if (newAccessToken) {
            try {
              const res = await updateClassroom(
                newAccessToken,
                classroomData,
                classroom_id
              );
              return res.data;
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
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const deleteClassroomThunk = createAsyncThunk(
  "classroom/delete",
  async (
    {
      accessToken,
      classroom_id,
      school_id,
    }: {
      accessToken: string;
      classroom_id: string;
      school_id: string;
    },
    thunkAPI
  ) => {
    try {
      const res = await deleteClassroom(accessToken, classroom_id, school_id);
      return res.data;
    } catch (error: any) {
      if (error.response.status === 401)
        try {
          const res = await refresh();
          const newAccessToken = res.data?.newAccessToken;
          if (newAccessToken) {
            try {
              const res = await deleteClassroom(
                newAccessToken,
                classroom_id,
                school_id
              );
              return res.data;
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
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

const classroomSlice = createSlice({
  name: "classroom",
  initialState: {
    isLoading: false,
    classrooms: [],
    classroom: {},
    error: "",
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
      .addCase(createClassroomThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createClassroomThunk.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createClassroomThunk.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getAllClassroomThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllClassroomThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.classrooms = action.payload;
      })
      .addCase(getAllClassroomThunk.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getOneClassroomThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOneClassroomThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.classroom = action.payload;
      })
      .addCase(getOneClassroomThunk.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateClassroomThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateClassroomThunk.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updateClassroomThunk.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteClassroomThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteClassroomThunk.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteClassroomThunk.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { toggleShowEditeIcons } = classroomSlice.actions;
export default classroomSlice.reducer;
