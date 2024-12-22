import React from 'react'
import LoginUser from '../Components/LoggedUser'
import Posts from '../Components/userPosts'

function LoggedUser() {
  return (
    <div className="userData">
     <LoginUser/>
     <Posts/>
    </div>
  )
}

export default LoggedUser