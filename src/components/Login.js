import React from 'react'

const Login = ({username, password, handleLogin, handleNameChange, handlePasswordChange}) => (
    <form onSubmit={ handleLogin }>
        <div>
            username:
            <input
              type='text'
              value={ username }
              name='Username'
              onChange={ ({target}) => handleNameChange(target.value)}>
            </input>
        </div>
        <div>
            password:
            <input
              type='password'
              value={ password }
              name='Password'
              onChange={ ({target}) => handlePasswordChange(target.value)}>
            </input>
        </div>
        <button type='submit'>login</button>
    </form>
)

export default Login