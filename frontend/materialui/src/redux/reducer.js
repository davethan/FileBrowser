import { combineReducers } from "redux";

const getPostsDataReducer = function getPostsData(
  postsData = null,
  action
) {
  switch (action.type) {
    case "GET_POSTS_DATA":
      return (postsData = action.state);
    default:
      return postsData;
  }
};

const rootReducer = combineReducers({
  getPostsDataReducer
});
export default rootReducer;
