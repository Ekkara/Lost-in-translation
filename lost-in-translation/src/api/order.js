import {createHeaders} from "./index"

const  apiURL = process.env.REACT_APP_API_URL;
export const orderAdd = async (user, translation) =>{
try{
    if(user.translations.length >= 10){    
        let tempLet = [...user.translations, translation]
        tempLet.reverse();
        tempLet.pop();
        tempLet.reverse();
        const response = await fetch(`${apiURL}/${user.id}`, {
            method: 'PATCH',
            headers: createHeaders(),
            body: JSON.stringify({
                username: user.username,
                translations: tempLet
            })
        });
        if(!response.ok){
            throw new Error('could not update the order');
        }
        const result = await response.json();
        return [null, result]    }
    else{
        //user.translations.
        //user.translations.shift()
        const response = await fetch(`${apiURL}/${user.id}`, {
            method: 'PATCH',
            headers: createHeaders(),
            body: JSON.stringify({
                username: user.username,
                translations: [...user.translations, translation]
            })
        });
        if(!response.ok){
            throw new Error('could not update the order');
        }
        const result = await response.json();
        return [null, result]
    }
}
catch(error){
return [error.message, null]
}
}

/*export const orderAdd = async (user, translation) =>{
    try{
        const response = await fetch(`${apiURL}/${user.id}`, {
            method: 'PATCH',
            headers: createHeaders(),
            body: JSON.stringify({
                username: user.username,
                translations: [...user.translations, translation]
            })
        });
    
        if(!response.ok){
            throw new Error('could not update the order');
        }
    
        const result = await response.json();
        return [null, result]
    
    }
    catch(error){
    return [error.message, null]
    }
    }*/

export const orderClearHistory = async (user) =>{
try{
    const response = await fetch(`${apiURL}/${user.id}`, {
        method: 'PATCH',
        headers: createHeaders(),
        body: JSON.stringify({
            username: user.username,
            translations: []
        })
    })

    if(!response.ok){
        throw new Error("could not clear history");
    }
    const result = await response.json();
    return [null, result]
}
catch(error){
    return [error.message,null]
}
}