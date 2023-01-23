import {createHeaders} from "./index"

const  apiURL = process.env.REACT_APP_API_URL;
export const orderAdd = async (user, order) =>{
try{
    const response = await fetch(`${apiURL}/${user.id}`, {
        method: 'PATCH',
        headers: createHeaders(),
        body: JSON.stringify({
            username: user.username,
            orders: [...user.orders, order]
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
}
export const orderClearHistory = async (userId) =>{
try{
    const response = await fetch(`${apiURL}/${userId}`,{
        method: 'PATCH',
        headers: createHeaders(),
        body: JSON.stringify({
            orders: []
        })

    });
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