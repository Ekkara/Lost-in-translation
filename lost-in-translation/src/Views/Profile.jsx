import { useEffect } from "react"
import { userById } from "../api/user"
import { useUser } from "../context/UserContext"
import ProfileActions from "../components/Profile/ProfileActions"
import ProfileHeaders from "../components/Profile/ProfileHeader"
import ProfileTranslateHistory from "../components/Profile/ProfileTranslateHistory"
import withAuth from "../hoc/withAuth"
import { storageSave } from "../utils/storage"
import { STORAGE_KEYS_USER } from "../const/storageKeys"

const Profile = () =>{
    const {user, setUser} = useUser()

    useEffect(()=>{
        const findUser = async ()=>{
            const [error, latestUser] = await userById(user.id)

            if(error === null){
                storageSave(STORAGE_KEYS_USER, latestUser)
                setUser(latestUser)
            }
        }

        findUser()
    },[setUser, user.id])

    return(
        <>
            <h1>Profile</h1>
            {
            }
            <ProfileHeaders username={user.username }/>
            <ProfileActions/>
            {<ProfileTranslateHistory translations = {user.translations}/>}
        </>
    )
}

export default withAuth(Profile)