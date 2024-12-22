import { configureStore, createSlice } from "@reduxjs/toolkit";
import { status, urls } from "./Urls";
const reducer1 = createSlice({
  name: "login&signup_Status",
  initialState: {
    loginStatus: { ApiStatus: status.init },
    signupStatus: { ApiStatus: status.init },
  },
  reducers: {
    loginChangeStatus: (state, action) => {
      state.loginStatus.ApiStatus = action.payload;
    },
    signupChangeStatus: (state, action) => {
      state.signupStatus.ApiStatus = action.payload;
    },
  },
});
const reducer2 = createSlice({
  name: "loggedUserData",
  initialState: { ApiStatus: status.init, data: null, bool: false },
  reducers: {
    userData: (state, action) => {
      state.ApiStatus = action.payload.status;
      state.data = action.payload.data;
      state.bool = action.payload.bool;
    },
    incrementPosts: (state, action) => {
      state.data.posts++;
    },
  },
});
const reducer3 = createSlice({
  name: "postsData",
  initialState: { ApiStatus: status.init, data: null },
  reducers: {
    postsData: (state, action) => {
      state.ApiStatus = action.payload.status;
      state.data = action.payload.data;
    },
    addNewPost: (state, action) => {
      state.data.push(action.payload);
    },
  },
});
const reducer4 = createSlice({
  name: "commentsData",
  initialState: { data: {} },
  reducers: {
    commentsData: (state, action) => {
      state.data[action.payload.postId] = {
        postId: action.payload.postId,
        ApiStatus: action.payload.ApiStatus,
        data: action.payload.data,
      };
    },
  },
});
const reducer5 = createSlice({
  name: "connectionsData",
  initialState: {
    suggestions: { ApiStatus: status.init, data: null },
    followers: { ApiStatus: status.init, data: null },
    following: { ApiStatus: status.init, data: null },
    requestData:{},
  },
  reducers: {
    suggestionsData: (state, action) => {
      state.suggestions = action.payload;
    },
    followersData: (state, action) => {
      state.followers = action.payload;
    },
    followingData: (state, action) => {
      state.following = action.payload;
    },
    addRequest:(state,action)=>{
      state.requestData[action.payload.id]=1;
      const wantedData = action.payload.modify;
      const target = state[wantedData].data.find(item=>item._id===action.payload.id);
      target.following=!target.following
    },
    removeRequest:(state,action)=>{
      delete state.requestData[action.payload];
    }
  },
});
export const { loginChangeStatus, signupChangeStatus } = reducer1.actions;
export const { userData, incrementPosts } = reducer2.actions;
export const { postsData, addNewPost } = reducer3.actions;
export const { commentsData } = reducer4.actions;
export const { followersData, followingData, suggestionsData,addRequest,removeRequest } =reducer5.actions;
const store = configureStore({
  reducer: {
    a: reducer1.reducer,
    b: reducer2.reducer,
    c: reducer3.reducer,
    d: reducer4.reducer,
    e: reducer5.reducer,
  },
});
export default store;
