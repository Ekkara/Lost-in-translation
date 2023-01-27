import { createHeaders } from "./index"

const apiURL = process.env.REACT_APP_API_URL

export const translationAdd = async (user, translation) => {
    //When an 11th translation enters the array, shift the 1st one out to cap the history at 10
    let tenLatestTranslations = [...user.translations, translation]
    if (user.translations.length >= 10) {
        tenLatestTranslations = [...user.translations, translation]
        tenLatestTranslations.shift()
    }
    return updateTranslation(user, tenLatestTranslations)
}

export const translateClearHistory = async (user) => {
    //To clear history we send in an empty array
    return updateTranslation(user, [])
}

const updateTranslation = async (user, translationHistory) => {
    //Try to update the JSON file with the new history  
    try {
        const response = await fetch(`${apiURL}/${user.id}`, {
            method: 'PATCH',
            headers: createHeaders(),
            body: JSON.stringify({
                username: user.username,
                translations: translationHistory
            })
        })

        //Fail safe
        if (!response.ok) {
            throw new Error("could not clear history")
        }

        //Return the result
        const result = await response.json()
        return [null, result]
    }
    catch (error) {
        return [error.message, null]
    }
}