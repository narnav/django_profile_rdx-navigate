import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import ICred from '../../models/Cred';
import { login,register,refresh } from './loginAPI';
import jwt_decode from "jwt-decode";

export interface loginState {
  logged:boolean
  access:string
  userName:string
  email:string
  registerd:boolean
}

const initialState: loginState = {
    logged: false,
    access: '',
    userName: '',
    email: '',
    registerd: false
};

export const refreshAsync = createAsyncThunk(
    'login/refresh',
    async (token:string ) => {
      const response = await refresh(token);
      return response.data;
    }
  );

export const loginAsync = createAsyncThunk(
  'login/login',
  async (cred:ICred ) => {
    const response = await login(cred);
    return response.data;
  }
);

export const regAsync = createAsyncThunk(
    'login/register',
    async (cred:ICred ) => {
      const response = await register(cred);
      return response.data;
    }
  );
export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logout: (state) => {
        state.logged =false
        localStorage.setItem("access","")
        localStorage.setItem("refresh","")
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state, action) => {
        console.log(action.payload.access)
        state.access=action.payload.access

        console.log( jwt_decode(action.payload.refresh))
        console.log( jwt_decode(state.access))
        localStorage.setItem("access",state.access)
        localStorage.setItem("refresh",action.payload.refresh)
        state.userName=jwt_decode<any>(state.access).username
        state.email=jwt_decode<any>(state.access).email
        state.logged =true
      }) .addCase(regAsync.fulfilled, (state, action) => {
        console.log(action.payload)
        state.registerd =true
        // state.access=action.payload.access
        // console.log( jwt_decode(state.access))
        // state.userName=jwt_decode<any>(state.access).username
        // state.email=jwt_decode<any>(state.access).email
        // state.logged =true
      }) .addCase(refreshAsync.fulfilled, (state, action) => {
        console.log(action.payload.access)
        state.access=action.payload.access

        console.log( jwt_decode(action.payload.refresh))
        console.log( jwt_decode(state.access))
        localStorage.setItem("access",state.access)
        localStorage.setItem("refresh",action.payload.refresh)
        state.userName=jwt_decode<any>(state.access).username
        state.email=jwt_decode<any>(state.access).email
        state.logged =true
      })
  },
});

export const {logout } = loginSlice.actions;
export const selectlogged = (state: RootState) => state.login.logged;
export const selectemail = (state: RootState) => state.login.email;
export const selectuserName = (state: RootState) => state.login.userName;
export const selectuserRegisterd = (state: RootState) => state.login.registerd;
export default loginSlice.reducer;
