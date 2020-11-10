const SET_NOTIFICATION = 'SET_NOTIFICATION'
const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION'

const reducer = (state = '', action) => {

  switch(action.type) {
  case SET_NOTIFICATION:
    return action.data

  case REMOVE_NOTIFICATION:
    return ''

  default:
    return state
  }
}

const setMessage = (message) => {
  return {
    type: SET_NOTIFICATION,
    data: message,
  }
}

const removeMessage = () => {
  return {
    type: REMOVE_NOTIFICATION
  }
}

let nextNotificationId = 0

// exports
export const setNotificationWithTimeout = (message, seconds = 5) => {

  if(nextNotificationId) {
    clearTimeout(nextNotificationId)
  }

  return dispatch => {
    dispatch(setMessage(message))

    nextNotificationId = setTimeout(() => {
      dispatch(removeMessage())
    }, seconds*1000)
  }
}

export default reducer