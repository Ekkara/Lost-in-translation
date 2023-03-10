//Save data from JSON file to client's computer
export const storageSave = (key, value) => {
    if (!key) {
        throw new Error('storageSave: No storage key provided')
    }

    if (!value) {
        throw new Error('storageSave: No storage value provided')
    }

    localStorage.setItem(key, JSON.stringify(value))
}

//read files from the JSON file
export const storageRead = (key) => {
    const data = localStorage.getItem(key)

    if (data) {
        return JSON.parse(data)
    }

    return null
}

export const storageDelete = key => {
    localStorage.removeItem(key)
}