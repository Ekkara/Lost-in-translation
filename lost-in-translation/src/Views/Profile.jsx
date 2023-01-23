import { useEffect } from "react";
import { userById } from "../api/user";
import ProfileActions from "../components/Profile/ProfileActions";
import ProfileHeaders from "../components/Profile/ProfileHeader";
import ProfileOrderHistory from "../components/Profile/ProfileOrderHistory";
import { STORAGE_KEYS_USER } from "../const/storageKeys";
import { useUser } from "../context/UserContext";
import withAuth from "../hoc/withAuth";
import { storageSave } from "../utils/storage";

const Profile = () =>{
    const {user, setUser} = useUser();

    useEffect(()=>{
        const findUser = async ()=> {
            const [error, latestUser] = await userById(user.id);
            if(error === null){
                storageSave(STORAGE_KEYS_USER, latestUser);
                setUser(latestUser);
            }
        }
        findUser();
    },[setUser, user.id])

    return (
    <>
    <h1>Profile</h1>
    {
        //to do display history
        //clear history button
    }
    <ProfileHeaders username={user.username }/>
    <ProfileActions/>
    <ProfileOrderHistory orders ={user.orders}/>
    </>)
}
export default withAuth(Profile);