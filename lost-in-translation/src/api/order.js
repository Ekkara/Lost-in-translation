import {createHeaders} from "./index"

const  apiURL = process.env.REACT_APP_API_URL

export const orderAdd = async (user, translation) =>{
    try{
        if(user.translations.length >= 10){    
            let tenLatestTranslations = [...user.translations, translation]
            tenLatestTranslations.shift()

            const response = await fetch(`${apiURL}/${user.id}`,{
                method: 'PATCH',
                headers: createHeaders(),
                body: JSON.stringify({
                    username: user.username,
                    translations: tenLatestTranslations
                })
            })

            if(!response.ok){
                throw new Error('Could not update the translation')
            }

            const result = await response.json()
            return [null, result]
        }      
        else{
            const response = await fetch(`${apiURL}/${user.id}`,{
                method: 'PATCH',
                headers: createHeaders(),
                body: JSON.stringify({
                    username: user.username,
                    translations: [...user.translations, translation]
                })
            })

            if(!response.ok){
                throw new Error('Could not update the translation')
            }

            const result = await response.json()
            return [null, result]
        }
    }
    catch(error){
        return [error.message, null]
    }
}

export const orderClearHistory = async (user) =>{
    try{
        const response = await fetch(`${apiURL}/${user.id}`,{
            method: 'PATCH',
            headers: createHeaders(),
            body: JSON.stringify({
                username: user.username,
                translations: []
            })
        })

        if(!response.ok){
            throw new Error("could not clear history")
        }

        const result = await response.json()
        return [null, result]
    }  
    catch(error){
        return [error.message, null]
    }
}