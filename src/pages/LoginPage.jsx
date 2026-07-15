import { useState } from "react"
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'

function LoginPage() {
    const navigate = useNavigate();
    const [currentEmail,setCurrentEmail] = useState("");
    const [currentPassword,setCurrentPassword] = useState("");
    const [currentError,setCurrentError] = useState("");
    const [isSignUp, setIsSignUp] = useState(false);
    const [successMessage, setSuccessMessage] = useState("")
  async function handleEmailAuth() {
    //async mean that Javscript has to wait for the function to complete before moving on to the next line of code.
    setCurrentError("");
    let error;
    if(isSignUp)
    {
        const result =await supabase.auth.signUp({email:currentEmail,password:currentPassword});
        error=result.error;
    }
    else
    {
    const result =await supabase.auth.signInWithPassword({email:currentEmail,password:currentPassword});
    error=result.error;
    }
    if(error) {
    setCurrentError(error.message)
} else {
    navigate("/dashboard");
}
  }
  async function handleGoogleLogin() {
    const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: 'http://localhost:5173/dashboard'
        }
    })
    if(error) setCurrentError(error.message)
}
  function emailState(event)
  {
    setCurrentEmail(event.target.value);
  }
  function passwordState(event)
  {
    setCurrentPassword(event.target.value);
  }
  return (
    <div className="bg-gray-50 min-h-screen flex justify-center items-center">
      <div className="bg-white w-96 rounded-2xl flex flex-col shadow-lg p-8 gap-4 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-700 text-center">{isSignUp ? "CREATE ACCOUNT" : "WELCOME BACK"}</h2>
        <p className="text-gray-400 text-sm text-center">A one stop place to store all your documents</p>

        <div className="flex flex-col gap-1">
          <label className="text-gray-600 text-sm font-medium">Email:</label>
          <input className="bg-gray-50 border border-gray-200 px-3 py-2 rounded-lg outline-none focus:border-teal-500 text-gray-700" type="email" placeholder="Enter your email" onChange={emailState} value={currentEmail}/>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-gray-600 text-sm font-medium">Password:</label>
          <input className="bg-gray-50 border border-gray-200 px-3 py-2 rounded-lg outline-none focus:border-teal-500 text-gray-700" type="password" placeholder="Enter your password" onChange={passwordState} value={currentPassword}/>
        </div>

        <div>
          {currentError && <p className="text-red-500 text-sm">{currentError}</p>}
        </div>

        <button className="bg-teal-500 text-white py-2 w-full rounded-lg hover:bg-teal-600 font-medium" onClick={handleEmailAuth}>
          {isSignUp ? "SIGN UP" : "LOGIN"}
        </button>

        <div className="flex items-center gap-2">
          <hr className="flex-1 border-gray-200"/>
          <span className="text-gray-400 text-xs">or</span>
          <hr className="flex-1 border-gray-200"/>
        </div>

        <button onClick={handleGoogleLogin} className="border border-gray-200 text-gray-600 py-2 w-full rounded-lg hover:bg-gray-50 font-medium">
          GOOGLE SIGN IN
        </button>

        <div className="flex justify-center mt-2">
          {isSignUp ? (
            <button className="text-gray-400 text-sm" onClick={() => setIsSignUp(false)}>Already have an account? <span className="text-teal-500">Login</span></button>
          ) : (
            <button className="text-gray-400 text-sm" onClick={() => setIsSignUp(true)}>Don't have an account? <span className="text-teal-500">Sign Up</span></button>
          )}
        </div>
      </div>
    </div>
)
}

export default LoginPage

//useNavigate is a hook provided by React Router that allows you to route to different pages of the website without reloading 
// the whole website by making chnages to the URL. A normal link would go to a different page only when it is clicked and not when login is successful.
// Since we have a condition that it should navigate to the dashboard only when login is successful, we use useNavigate to navigate to the dashboard page when login is successful.