import { NavLink } from "react-router-dom"
import { useUser } from "../../context/UserContext"
//import "../../css/nav.css"

const Navbar = () =>{
  const { user } = useUser()
  
  return(
    <>
    <div id="navPusher"></div>
    <nav>
      {user !== null && (
        <ul>
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