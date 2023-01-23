import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { storageDelete, storageSave } from "../../utils/storage";
import { STORAGE_KEYS_USER } from "../../const/storageKeys";
import { orderClearHistory } from "../../api/order";


const ProfileActions = () =>{
    
    const {user, setUser} = useUser();
    const handleLogoutClick = () =>{
        if(window.confirm('are you sure?')){
            //send event to the parent to log out
           storageDelete(STORAGE_KEYS_USER);
            setUser(null)
        }
    }

    const handleClearHistoryClick = async() =>{
        if(window.confirm('are you sure you wish to delete all data? \n this can not be undone!')){
            return
        }
        const [clearError, clearResult] = await orderClearHistory();

        if(clearError !== null){
            return;
        }
        const updateUser = {
            ...user,
            orders:[]
        }
        
        storageSave(STORAGE_KEYS_USER, updateUser);
        setUser(updateUser);
    }
    return(
        <ul>
            <li>
            <Link to="/orders">Orders</Link>
                
            </li>
            <li>
                <button  onClick={handleClearHistoryClick}>Clear history</button>
            </li>
            <li>
                <button onClick={handleLogoutClick}>Log out</button>
            </li>
        </ul>
    )   
};
export default ProfileActions;