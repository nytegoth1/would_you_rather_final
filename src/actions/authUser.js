import { _saveSelectedUser, _getSelectUser } from '../utils/_DATA'

export const SET_AUTHED_USER = 'SET_AUTHED_USER'
export const GET_CURRENT_USER = 'GET_CURRENT_USER'

function setAuthedUser (user) {
  return {
    type: SET_AUTHED_USER,
    user
  }
}

function getCurrentUser (user) {
  return {
    type: GET_CURRENT_USER,
    user
  }
}

export const saveAuthedUser = user => {
  return dispatch => {
    return _saveSelectedUser(user).then(response => dispatch(setAuthedUser(response)));
  }
}

export const getAuthedUser = () => {
  return dispatch => {
    return _getSelectUser().then(response => dispatch(getCurrentUser(response)))
  }
}