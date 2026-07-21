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
    <div className="min-h-screen flex items-center justify-center" style={{background:'#fafaf9'}}>
        <div className="bg-white border border-stone-200 rounded-xl shadow-sm p-8 w-96 flex flex-col gap-4">
            
            <div className="mb-2">
                <p className="text-stone-800 font-semibold text-lg">Anand Investment</p>
                <p className="text-stone-400 text-xs mt-0.5">Document Portal</p>
            </div>

            <div>
                <h2 className="text-stone-800 font-medium text-base">{isSignUp ? "Create account" : "Sign in"}</h2>
                <p className="text-stone-400 text-xs mt-1">{isSignUp ? "Fill in your details to get started" : "Enter your credentials to continue"}</p>
            </div>

            {currentError && (
                <div className="bg-red-50 border border-red-100 text-red-500 text-xs px-3 py-2 rounded-lg">
                    {currentError}
                </div>
            )}

            <div className="flex flex-col gap-1">
                <label className="text-stone-600 text-xs font-medium">Email</label>
                <input 
                    className="bg-stone-50 border border-stone-200 px-3 py-2 rounded-lg outline-none text-sm text-stone-700 focus:border-amber-400" 
                    type="email" 
                    placeholder="Enter your email" 
                    onChange={emailState} 
                    value={currentEmail}
                />
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-stone-600 text-xs font-medium">Password</label>
                <input 
                    className="bg-stone-50 border border-stone-200 px-3 py-2 rounded-lg outline-none text-sm text-stone-700 focus:border-amber-400" 
                    type="password" 
                    placeholder="Enter your password" 
                    onChange={passwordState} 
                    value={currentPassword}
                />
            </div>

            <button 
                className="text-white text-sm py-2 rounded-lg font-medium mt-1" 
                style={{background:'#d97706'}}
                onClick={handleEmailAuth}>
                {isSignUp ? "Create account" : "Sign in"}
            </button>

            <div className="flex items-center gap-2">
                <hr className="flex-1 border-stone-200"/>
                <span className="text-stone-400 text-xs">or</span>
                <hr className="flex-1 border-stone-200"/>
            </div>

            <button 
                onClick={handleGoogleLogin} 
                className="border border-stone-200 text-stone-600 text-sm py-2 rounded-lg hover:bg-stone-50 font-medium">
                Continue with Google
            </button>

            <p className="text-center text-xs text-stone-400">
                {isSignUp ? "Already have an account?" : "Don't have an account?"}
                <button 
                    onClick={() => setIsSignUp(!isSignUp)} 
                    className="ml-1 font-medium"
                    style={{color:'#d97706'}}>
                    {isSignUp ? "Sign in" : "Sign up"}
                </button>
            </p>
        </div>
    </div>
)
}

export default LoginPage

//useNavigate is a hook provided by React Router that allows you to route to different pages of the website without reloading 
// the whole website by making chnages to the URL. A normal link would go to a different page only when it is clicked and not when login is successful.
// Since we have a condition that it should navigate to the dashboard only when login is successful, we use useNavigate to navigate to the dashboard page when login is successful.