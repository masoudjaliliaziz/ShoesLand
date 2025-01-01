import axios from 'axios';
import { useQuery, useMutation, useQueryClient, QueryKey } from '@tanstack/react-query';
import { useSelector, useDispatch } from 'react-redux';
import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit';
import { Navigate } from 'react-router-dom';
import React, { ReactNode } from 'react';

interface AuthState {
  token: string | null;
}

const authSlice = createSlice({
  name: 'auth',
  initialState: { token: null } as AuthState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;
setToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTczNTc1NjI1NTg5MiwidXNlcm5hbWUiOiJ5b3Vzb2Zhc2FkaSIsImlhdCI6MTczNTc3MjE0MywiZXhwIjoyMDM1Nzc1MTQzfQ.dzeNI6dnylC_wMsTyKvRx_5WS1VHhGtvtCa3uHtNLew')
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export const axiosClient = axios.create({
  baseURL: 'http://localhost:8000',
});

export const authAxiosClient = axios.create({
  baseURL: 'http://localhost:8000',
});

authAxiosClient.interceptors.request.use((config) => {
  const state = store.getState() as { auth: AuthState };
  const token = state.auth?.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

authAxiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await authAxiosClient.post('/auth/refresh');
        store.dispatch(setToken(data.accessToken));
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return authAxiosClient(originalRequest);
      } catch (refreshError) {
        store.dispatch(clearToken());
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);



