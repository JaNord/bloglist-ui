import React, { useState } from 'react'
const Blog = ({ blog, username, handleLike, handleDelete }) => {

  const [showAllInfo, setShowAllInfo] = useState(false)
  const isDeleteVisible = username === blog.user.username

  const toggleShowAll = () => {
    setShowAllInfo(!showAllInfo)
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
    <div style={ blogStyle }>
      <div className='basicInfo'>{ blog.title } { blog.author }</div>
      { showAllInfo
        ?<>
          <div className='url'>{ blog.url }</div>
          <div className='likes'>
            {blog.likes}
            <button className='likeButton' onClick={ () => handleLike(blog) }>like</button>
          </div>
          <div>
            <button onClick={ toggleShowAll }>hide</button>
            <button
              style={ showDeleteButton }
              onClick={() => handleDelete(blog) }>delete</button>
          </div>
        </>

        : <button className='showAll' onClick={ toggleShowAll }>view details</button> }
    </div>
  )}

export default Blog