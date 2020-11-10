// action types
const ADD_USER = 'AUTHENTICATE_USER'
const REMOVE_USER = 'REMOVE_USER'

const reducer = (state=null, action) => {
  switch(action.type) {
  case ADD_USER:
    return action.data
  case REMOVE_USER:
    return null
  default:
    return state
  }
}

// action creators
export const addUser = (user) => {
  return ({
    type: ADD_USER,
    data: user
  })
}

export const removeUser = () => ({
  type: REMOVE_USER
})

export default reducer