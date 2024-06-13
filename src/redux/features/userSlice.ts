// src/features/user/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { TUserSchema } from '../../transport';

const URL = 'http://localhost:3010';

export const sendUser = createAsyncThunk('user/sendUser', async (data: TUserSchema) => {
  const response = await axios.post(`${URL}/api/updateUser`, data, {
    headers: { 'content-type': 'application/json' },
  });
  return response.data;
});

export const sendNewUser = createAsyncThunk('user/sendNewUser', async (data: TUserSchema): Promise<boolean> => {
  const response = await axios.post(`${URL}/api/createUser`, data, {
    headers: { 'content-type': 'application/json' },
  });
  return response.data;
});

export const readUser = createAsyncThunk('user/readUser', async (email: string): Promise<TUserSchema> => {
  const response = await axios.post(`${URL}/api/user`, { email }, {
    headers: { 'content-type': 'application/json' },
  });
  return response.data;
});

export const deleteUser = createAsyncThunk('user/deleteUser', async (email: string) => {
  const response = await axios.post(`${URL}/api/deleteUser`, { email }, {
    headers: { 'content-type': 'application/json' },
  });
  return response.data;
});

export const readAllUsers = createAsyncThunk('user/readAllUsers', async () => {
  const response = await axios.post(`${URL}/api/userAll`);
  return response.data;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null as TUserSchema | null,
    users: [] as TUserSchema[],
    status: 'idle',
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sendUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(sendUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error != action.error.message;
      })
      .addCase(sendNewUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sendNewUser.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(sendNewUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error != action.error.message;
      })
      .addCase(readUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(readUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(readUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error != action.error.message;
      })
      .addCase(deleteUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error != action.error.message;
      })
      .addCase(readAllUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(readAllUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(readAllUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error != action.error.message;
      });
  },
});

export default userSlice.reducer;
