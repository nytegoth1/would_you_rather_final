import { _getUsers } from "../utils/_DATA";

export const GET_USERS = 'GET_USERS'

//LOAD USERS
function getUsers (users) {
  return {
    type: GET_USERS,
    users
  }
}

export const loadingUsers = () => {
  return dispatch => {
    return _getUsers().then(response => dispatch(getUsers(response)))
  }
}