import { NavLink } from "react-router-dom"

const Navbar = () => {

    return(
        <nav>
            <ul>
                <li>
                    
                </li>
            </ul>
            { user !== null && 
                <ul>
                    <li>
                        <NavLink to="/orders">Translator</NavLink>
                    </li>
                    <li>
                        <NavLink to="/profile">Profile</NavLink>
                    </li>
                </ul>
            }
        </nav>
    )
}
export default Navbar