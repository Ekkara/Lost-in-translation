import { Navigate } from "react-router-dom"
import { useUser } from "../context/UserContext"

//If there is a user, continue use the weppage, otherwise go back to login
const withAuth = Component => props => {
   const { user } = useUser()

   if (user !== null) {
      return <Component {...props} />
   }

   return <Navigate to="/" />
}
export default withAuth