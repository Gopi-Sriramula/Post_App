import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from "redux";
import { thunk } from "redux-thunk";
import { ApiStatus } from "./urls";
const reducer1 = (
  state = {
    login: { apiStatus: "init", key: null },
    signup: { apiStatus: "init" },
  },
  action
) => {
  switch (action.type) {
    case "login":
      state.login = { ...action.payload };
      return { ...state };
    case "signup":
      state.signup = { ...action.payload };
      return { ...state };
    default:
      return state;
  }
};
const reducer2 = (state = { apiStatus: "init", data: null }, action) => {
  switch (action.type) {
    case "userInfo": {
      return { ...action.payload };
    }
    case "postAdd":
      state.data.posts++;
      return { ...state };
    default:
      return state;
  }
};
const reducer3 = (state = { apiStatus: "inti", data: null }, action) => {
  switch (action.type) {
    case "postslist": {
      return { ...action.payload };
    }
    case "postAdd":
      state.data.push(action.payload);
      return { ...state };
    default:
      return state;
  }
};
const reducer4 = (
  state = { apiStatus: "init", id: undefined, data: null },
  action
) => {
  switch (action.type) {
    case "comments":
      return { ...action.payload };
    default:
      return state;
  }
};
const reducer5 = (
  state = {
    followers: { apiStatus: "init", data: null },
    following: { apiStatus: "init", data: null },
    suggesstions: { apiStatus: "init", data: null },
  },
  action
) => {
  switch (action.type) {
    case "followers": {
      state.followers = action.payload;
      return { ...state };
    }
    case "following": {
      state.following = action.payload;
      return { ...state };
    }
    case "suggesstions": {
      state.suggesstions = action.payload;
      return { ...state };
    }
    case ApiStatus.success:{
        const target = state?.suggesstions?.data.find(u=>u._id===action.payload);
        target.following=!target.following
        return {...state};
    }
    case "updateFollowing":{
        const target = state?.following?.data.find(u=>u._id===action.payload);
        target.following=!target.following
        return {...state};
    }
    case "delete":{
       state.followers={apiStatus:"success",data:state.followers.data.filter(u=>u._id!==action.payload)};
        return {...state};
    }
    default:
      return state;
  }
};
const reducers = combineReducers({
  a: reducer1,
  b: reducer2,
  c: reducer3,
  d: reducer4,
  e: reducer5,
});
const store = createStore(reducers, applyMiddleware(thunk));
export default store;
