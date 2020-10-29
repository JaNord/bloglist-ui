import React, { useState } from 'react'
const Blog = ({ blog, handleLike }) => {

  const [showAllInfo, setShowAllInfo] = useState(false)

  const toggleShowAll = () => {
    setShowAllInfo(!showAllInfo)
  }
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
            <button onClick={ () => handleLike(blog) }>like</button>
          </div>
          <button onClick={ toggleShowAll }>hide</button>
        </>
        : <button onClick={ toggleShowAll }>view details</button> }
    </div>
  )}

export default Blog