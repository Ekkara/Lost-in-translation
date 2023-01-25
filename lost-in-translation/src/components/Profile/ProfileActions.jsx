import { Link } from "react-router-dom"
import { orderClearHistory } from "../../api/order"
import { useUser } from "../../context/UserContext"
import { storageDelete, storageSave } from "../../utils/storage"
import { STORAGE_KEYS_USER } from "../../const/storageKeys"

const ProfileActions = () =>{    
    const { user, setUser } = useUser()

    const clearHistory = async() =>{
        const [clearError] = await orderClearHistory(user)

        if(clearError !== null){
            return
        }

        const updateUser ={
            ...user,
            translations:[]
        }
        
        storageSave(STORAGE_KEYS_USER, updateUser)
        setUser(updateUser)
    }

    const handleLogoutClick = async() =>{
        if(window.confirm('Are you sure you wish to log out?')){
            //send event to the parent to log out
            await clearHistory()
            storageDelete(STORAGE_KEYS_USER)
            setUser(null)
        }
    }

    const handleClearHistoryClick = async() =>{
        if(!window.confirm('Are you sure you wish to delete all data? \n This can not be undone!')){
            return
        }
        await clearHistory()
    }

    return(
        <ul>
            <li>
                <Link to="/translate">Translate</Link>           
            </li>
            <li>
                <button  onClick={handleClearHistoryClick}>Clear History</button>
            </li>
            <li>
                <button onClick={handleLogoutClick}>Log Out</button>
            </li>
        </ul>
    )   
}

export default ProfileActions