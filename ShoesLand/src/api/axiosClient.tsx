import axios from 'axios';
import { useQuery, useMutation, useQueryClient, QueryKey } from '@tanstack/react-query';
import { useSelector, useDispatch } from 'react-redux';
import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie'

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


Cookies.set('refreshToken', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTczNTc1NjI1NTg5MiwidXNlcm5hbWUiOiJ5b3Vzb2Zhc2FkaSIsImlhdCI6MTczNTc3NDc5MCwiZXhwIjoxNzM1Nzc2NTkwfQ.GL7XtPr0f9Y-EqFBZcUddbXXtsqXGnR5tApit4XVBJc", { path: '/' })

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
  setToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTczNTc1NjI1NTg5MiwidXNlcm5hbWUiOiJ5b3Vzb2Zhc2FkaSIsImlhdCI6MTczNTc3NTg3NSwiZXhwIjoyMjM1Nzc2MTc1fQ.k32ef9V2u4SN6ZmsoejlOXzoVyDn59KroBazQFCYUeQ')
  const state = store.getState() as { auth: AuthState };
  console.log(state)
  //const token = state.auth?.token;
  const token = ''

  if (token) {
    console.log(token)
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



