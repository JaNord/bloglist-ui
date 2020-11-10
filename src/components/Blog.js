import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotificationWithTimeout } from '../reducers/notificationReducer'

const Blog = ({ blog }) => {

  const [showAllInfo, setShowAllInfo] = useState(false)

  const username = useSelector(state => state.user.username)
  const isDeleteVisible = username === blog.user.username

  const dispatch = useDispatch()

  const toggleShowAll = () => {
    setShowAllInfo(!showAllInfo)
  }

  const like = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    dispatch(updateBlog(updatedBlog))
  }

  const handleDelete = () => {
    if(window.confirm(`Delete ${blog.title} ?`)){
      try {
        dispatch(deleteBlog(blog))
        dispatch(setNotificationWithTimeout(`${blog.title} deleted.`))
      }
      catch(exception) {
        console.log(exception)
      }
    }
  }

  const showDeleteButton = { display: isDeleteVisible? '': 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div className='blogContainer' style={ blogStyle }>
      <div className='basicInfo'>{ blog.title } { blog.author }</div>
      { showAllInfo
        ?<>
          <div className='url'>{ blog.url }</div>

          <div className='likes'>
            {blog.likes}
            <button className='likeButton' onClick={ like }>like</button>
          </div>

          <div>added by: { blog.user.username }</div>

          <div>
            <button onClick={ toggleShowAll }>hide</button>
            <button
              style={ showDeleteButton }
              onClick={ handleDelete }>delete</button>
          </div>
        </>

        : <button className='showAll' onClick={ toggleShowAll }>view details</button> }
    </div>
  )}

export default Blog