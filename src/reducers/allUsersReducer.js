import userService from '../services/users'

// action types
const INIT_ALL_USERS = 'INIT_ALL_USERS'
const EMPTY_ALL_USERS = 'EMPTY_ALL_USERS'

const reducer= (state=[], action) => {
  switch(action.type) {

  case INIT_ALL_USERS:
    return action.data

  case EMPTY_ALL_USERS:
    return []

  default:
    return state
  }
}

export const emptyAllUsers = () => ({
  type: EMPTY_ALL_USERS
})

export const initAllUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()

    dispatch({
      type: INIT_ALL_USERS,
      data: users
    })
  }
}
export default reducer