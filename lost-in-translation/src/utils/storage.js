export const storageSave = (key, value) =>{
    if(!key){
        throw new Error('storageSave: no storage key provided')
    }
    if(!value){
        throw new Error('storageSave: no storage value provided')
    }    

    sessionStorage.setItem(key, JSON.stringify(value))

};

export const storageRead =key =>{
    const data = sessionStorage.getItem(key);
    if(data){
        return JSON.parse(data);
    }
    return null;
}

export const storageDelete = key =>{
    sessionStorage.removeItem(key);

}
