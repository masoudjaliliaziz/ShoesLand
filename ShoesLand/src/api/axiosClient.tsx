import axios from "axios";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryKey,
} from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { store } from "../config/store";
import { AuthState, clearToken, selectToken, setToken } from "../config/slice";

export const axiosClient = axios.create({
  baseURL: "http://localhost:8000",
});

export const authAxiosClient = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

authAxiosClient.interceptors.request.use((config) => {
  const state = store.getState() as { auth: AuthState };
  console.log(state);
  let token = selectToken;
  console.log("token", token);
  token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTczNTg2NDA5NzQ1MiwidXNlcm5hbWUiOiJ5b3Vzb2Zhc2FkaSIsImlhdCI6MTczNTg3NTE3OCwiZXhwIjoxNzM1ODc4MTc4fQ.lfuSjkCetUrjyhK0zfadhlUZqA-SBRCzGdVb5Cp9ao4";

  if (token) {
    console.log(token);
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
        const { data } = await authAxiosClient.post("/auth/refresh");
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
