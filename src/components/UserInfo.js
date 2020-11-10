import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { removeUser } from '../reducers/userReducer'

const UserInfo = () => {
  const username = useSelector(state => state.user.username)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(removeUser())
    window.localStorage.clear()
  }

  return (
    <>
      <p>{ username } logged in.</p>
      <button onClick={ handleLogout }>Logout</button>
    </>
  )
}
export default UserInfo