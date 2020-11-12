import React from 'react'

import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Typography
} from '@material-ui/core'

const UserInfo = ({ user, userBlogs }) => {

  if(!user) {
    return null
  }

  return (
    <div>
      <Typography variant="h2" >
        { user.name }
      </Typography>
      { userBlogs.length > 0
        ? <>
          <Typography variant="h4" >
            Posted blogs
          </Typography>
          <TableContainer component={ Paper }>
            <Table>
              <TableBody>
                { userBlogs.map(blog => (
                  <TableRow key={ blog.id }>
                    <TableCell>
                      { blog.title }
                    </TableCell>
                    <TableCell>
                      { blog.author }
                    </TableCell>
                  </TableRow>
                )) }
              </TableBody>
            </Table>
          </TableContainer>
        </>
        : <Typography variant="h4" >
            No blogs posted
        </Typography>
      }
    </div>
  )
}
export default UserInfo