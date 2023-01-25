import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { loginUser } from "../../api/user"
import { useUser } from "../../context/UserContext"
import { storageSave } from "../../utils/storage"
import { STORAGE_KEYS_USER } from "../../const/storageKeys"

const usernameConfig ={
  required: true,
  minLength: 2,
}

const LoginForm = () =>{

  //Hooks
  const{
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const { user, setUser } = useUser()
  
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState(null)
  const navigate = useNavigate()

  useEffect(()=>{
    if(user !== null){
      navigate('/translate')
    }
  }, [user, navigate])

  const onSubmit = async ({ username }) =>{
    setLoading(true)
    const [error, userResponse] = await loginUser(username)

    if(error !== null){
      setApiError(error)
    }

    if(userResponse !== null){
      storageSave(STORAGE_KEYS_USER, userResponse)
      setUser(userResponse)
    }

    setLoading(false)
  }

  const errorMessage = (() =>{
    if(!errors.username){
      return null
    }

    if(errors.username.type === "required"){
      return <span>Username is required</span>
    }

    if(errors.username.type === "minLength"){
      return <span>Username is too short</span>
    }
  })()

  return(
    <>
      <h2>What's your name?</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <label htmlFor="userName">Username</label>
          <input
            type="text"
            placeholder="username"
            {...register("username", usernameConfig)}
          />
          {errorMessage}
        </fieldset>

        <button type="submit" disabled={loading}>
          Continue
        </button>
        {loading && <p>Logging in...</p>}
        {apiError && <p>{apiError}</p>}
      </form>
    </>
  )
}

export default LoginForm