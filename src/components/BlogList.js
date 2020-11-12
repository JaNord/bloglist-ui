import React from 'react'
import { Link } from 'react-router-dom'

import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Typography
} from '@material-ui/core'

const BlogList = ({ blogs }) => {

  const sortedBlogs =
    blogs.sort((blog1, blog2) => blog2.likes - blog1.likes )

  return (
    <div>
      <Typography variant="h2" >
        Blogs
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {sortedBlogs.map(blog => (
              <TableRow key={blog.id}>
                <TableCell>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </TableCell>
                <TableCell>
                  {blog.author}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
export default BlogList