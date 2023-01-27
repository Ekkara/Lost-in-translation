import { createHeaders } from "./index.js"

const apiURL = process.env.REACT_APP_API_URL

const checkForUser = async (username) => {
  //Try to find current user
  try {
    const response = await fetch(`${apiURL}?username=${username}`)

    if (!response.ok) {
      throw new Error("Could not complete request")
    }

    const data = await response.json()
    return [null, data]
  }
  catch (error) {
    return [error.message, []]
  }
}
const createUser = async (username) => {
  //Create a new user in the JSON file
  try {
    const response = await fetch(apiURL, {
      method: "POST",
      headers: createHeaders(),
      body: JSON.stringify({
        username,
        translations: []
      })
    })

    if (!response.ok) {
      throw new Error("Could not create user with username " + username)
    }

    const data = await response.json()
    return [null, data]
  }
  catch (error) {
    return [error.message, []]
  }
}

export const loginUser = async (username) => {
  //try to fetch user by username
  const [checkError, user] = await checkForUser(username)

  if (checkError !== null) {
    return [checkError, null]
  }

  //If one is found, return it 
  if (user.length > 0) {
    return [null, user.pop()]
  }
  //Else, create a new one
  return await createUser(username)
}

//(Fetching the user for auto login)
export const getUser = async (userid) => {
  try {
    const response = await fetch(`${apiURL}/${userid}`)

    if (!response.ok) {
      throw new Error("Could not fetch!")
    }

    const user = await response.JSON()
    return [null, user]
  }
  catch (error) {
    return [error.message, null]
  }
}
