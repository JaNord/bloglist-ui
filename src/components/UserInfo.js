import React from 'react'

const UserInfo = ({ username, handleLogout }) => {

  return (
    <>
      <p>{ username } logged in.</p>
      <button onClick={ handleLogout }>Logout</button>
    </>
  )
}
export default UserInfo