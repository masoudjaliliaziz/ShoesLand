import axios from "axios";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryKey,
} from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie"

import { store } from "../config/store";

import { AuthState, clearToken, selectToken as token, setToken } from "../config/slice";

export const axiosClient = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

export const authAxiosClient = axios.create({
  baseURL: "http://localhost:8000",
});


authAxiosClient.interceptors.request.use((config) => {
  const state = store.getState() as { auth: AuthState };
  //console.log(Cookies.get())
  //console.log(state);
  //console.log("token", token(state));


  if (token) {
    //console.log(token);
    config.headers.Authorization = `Bearer ${token(state)}`;
  }
  return config;
});

authAxiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    //console.log(Cookies.get())
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await axiosClient.post("/auth/refresh");
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
