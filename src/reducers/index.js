import { combineReducers } from 'redux';
import authedUser from './authUser';
import users from './users';
import questions from './questions';
import { loadingBarReducer } from 'react-redux-loading';

export default combineReducers({
  authedUser,
  users,
  questions,
  loadingBar: loadingBarReducer
}) 