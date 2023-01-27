import LoginForm from "../components/Login/LoginForm"
import "../css/login.css"

const Login = () => {
  return (
    <>
      <div id="background" />
      <div id="loginHolder">
        <h1>Login</h1>
        <LoginForm />
      </div>
    </>
  )
}

export default Login