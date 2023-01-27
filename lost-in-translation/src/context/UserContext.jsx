import { useContext } from "react"
import { useState } from "react"
import { createContext } from "react"
import { storageRead } from "../utils/storage"
import { STORAGE_KEYS_USER } from "../const/storageKeys"

//Context -> exposing state
const UserContext = createContext()

export const useUser = () => {
    return useContext(UserContext)
}

//Provider -> managing state
const UserProvider = ({ children }) => {
    const [user, setUser] = useState(storageRead(STORAGE_KEYS_USER))

    const state = {
        user,
        setUser
    }

    return (
        <UserContext.Provider value={state}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider