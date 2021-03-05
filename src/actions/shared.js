import { getInitialData } from '../utils/api';
import { loadingUsers } from '../actions/users';
import { loadingQuestions } from '../actions/questions';
import { showLoading, hideLoading } from 'react-redux-loading';

export function handleInitialData () {
  return (dispatch) => {
    dispatch(showLoading())
    return getInitialData()
      .then(({ users, questions })=>{
        dispatch(loadingUsers(users))
        dispatch(loadingQuestions(questions))
        dispatch(hideLoading())
      })
  }
}