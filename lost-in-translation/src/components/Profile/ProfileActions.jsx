import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { storageDelete, storageSave } from "../../utils/storage";
import { STORAGE_KEYS_USER } from "../../const/storageKeys";
import { orderClearHistory } from "../../api/order";


const ProfileActions = () =>{
    
    const {user, setUser} = useUser();
<<<<<<< HEAD
=======
    const handleLogoutClick = () =>{
        if(window.confirm('Are you sure you wish to logout?')){
            //orderClearHistory(user.id);
        }
>>>>>>> 32bdd6c625a6c8c62102d757d4ad8fcb39704b46


    const clearHistory = async() =>{
        const [clearError, clearResult] = await orderClearHistory(user);

        if(clearError !== null){
            return;
        }
        const updateUser = {
            ...user,
            translations:[]
        }
        
        storageSave(STORAGE_KEYS_USER, updateUser);
        setUser(updateUser);
    }

    const handleLogoutClick = async () =>{
        if(window.confirm('Are you sure you wish to logout?')){
            //send event to the parent to log out
            await clearHistory();
           storageDelete(STORAGE_KEYS_USER);
            setUser(null)
        }
    }

    const handleClearHistoryClick = async() =>{
        if(!window.confirm('Are you sure you wish to delete all data? \n this can not be undone!')){
            return
        }
        await clearHistory();     
    }

    
    return(
        <ul>
            <li>
            <Link to="/translate">Translate</Link>
                
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