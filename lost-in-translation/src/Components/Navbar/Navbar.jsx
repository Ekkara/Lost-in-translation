import { NavLink } from "react-router-dom"
import { useUser } from "../../context/UserContext"
import React from 'react';

const Navbar = () =>{
  const { user } = useUser()

  return(
    <>
    <div id="navPusher"></div>
    <nav>
      {user !== null && (
        <ul id="navList">
            <li>
            <NavLink to="/translate">Translate</NavLink>
          </li>
          <li>
            <NavLink to="/profile">Profile</NavLink>
          </li>
        </ul>
      )}
    </nav>
    </>
  )
}

export default Navbar