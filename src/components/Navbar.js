import React from 'react'
import { Link } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography
} from '@material-ui/core'
import { useSelector } from 'react-redux'

const Navbar = () => {

  const user = useSelector(state => state.user)
  return (
    <AppBar position="static">
      <Toolbar >
        <IconButton edge="start" color="inherit" aria-label="menu">
        </IconButton>
        <Typography type="title" color="inherit" style={{ flex: 1 }}>
          Bloglist
        </Typography>
        <Button color="inherit" component={ Link } to='/'>
          home
        </Button>
        <Button color="inherit" component={ Link } to='/newBlog'>
          add blog
        </Button>
        <Button color="inherit" component={ Link } to='/users'>
          users
        </Button>
        {user
          ? <em>{ user.name } logged in</em>
          :
          <Button color="inherit" component={ Link } to="/login">
              login
          </Button>
        }
      </Toolbar>
    </AppBar>
  )
}

export default Navbar