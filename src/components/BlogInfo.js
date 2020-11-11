import { Box, Button } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { updateBlog, deleteBlog } from '../reducers/blogReducer'


const BlogInfo = ({ blog }) => {
  if (!blog) {
    return null
  }

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const history = useHistory()

  const like = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    dispatch(updateBlog(updatedBlog))
  }

  const handleDelete = () => {
    if(window.confirm(`Delete ${blog.title} ?`)){
      try {
        dispatch(deleteBlog(blog))
        history.push('/')
      }
      catch(exception) {
        console.log(exception)
      }
    }
  }

  const canUserDeleteBlog = () => {
    return blog.user.username === user.username
  }

  return (
    <div>
      <Box component='h2' display='block'>{ blog.title }</Box>
      <Box component='a' href={ blog.url } display='block'>{ blog.url }</Box>
      <Box component='span' display='block'>By { blog.author }</Box>

      <Box component='div' display='block'>likes: { blog.likes }</Box>

      <Button
        variant="contained"
        color="primary"
        display='inline'
        onClick={ like }>
          Like
      </Button>

      { canUserDeleteBlog()
        ? <Button
          variant="contained"
          display='inline'
          onClick={ handleDelete }>
              Delete
        </Button>
        : null}

    </div>
  )
}

export default BlogInfo