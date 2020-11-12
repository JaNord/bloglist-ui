import { Box, Button, List, ListItem, ListItemText,  TextField,  Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { updateBlog, addComment, deleteBlog } from '../reducers/blogReducer'


const BlogInfo = ({ blog }) => {
  if (!blog) {
    return null
  }

  const [comment, setComment] = useState('')
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

  const handleAddComment = () => {
    if(comment.length > 0) {
      try {
        dispatch(addComment(blog.id, comment))
        setComment('')
      }
      catch(exception) {
        // show notification
      }
    }
  }

  const canUserDeleteBlog = () => {
    return user && blog.user.username === user.username
  }

  return (
    <div>
      <Typography variant="h2" >
        { blog.title }
      </Typography>
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
        : null }

      <Box component='span' display='block'>Added by { blog.user.name }</Box>

      <br/>
      <Typography variant="h3" >
            comments
      </Typography>
      <List>
        {blog.comments.map((comment, index) =>
          // should not use index as key, but will do for now
          <ListItem key={ index }>
            <ListItemText
              primary={ comment }
            />
          </ListItem>)}
      </List>
      { user
        ? <div>
          <TextField
            value={ comment }
            onChange={({ target }) => setComment(target.value) }
            label='add a comment'>
          </TextField>
          <Button
            display='inline'
            variant="contained"
            onClick={ handleAddComment }>
          Add
          </Button>
        </div>
        : null
      }
    </div>
  )
}

export default BlogInfo