import ProfileTranslateHistoryItem from "./ProfileTranslateHistoryItem"

const ProfileTranslateHistory = ({translations}) =>{
    const translationList = translations.map((translation, index) => <ProfileTranslateHistoryItem key={index + ':' + translation} translation={ translation }/>)
    
    return(
        <section>
            <h4>Your history of translations:</h4>
            <ul>
                {translationList}
            </ul>
        </section>
    )   
}

export default ProfileTranslateHistory