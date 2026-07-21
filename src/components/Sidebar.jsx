import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { Users, LogOut } from 'lucide-react'

function Sidebar({ userEmail }) {
    const navigate = useNavigate()

    async function handleLogout() {
        await supabase.auth.signOut()
        navigate('/')
    }

    return (
        <div className="w-56 min-h-screen flex flex-col flex-shrink-0" style={{background:'#292524'}}>

            <div className="px-5 py-6 border-b border-stone-700">
                <p className="text-stone-100 font-semibold text-sm">Anand Investment</p>
                <p className="text-stone-500 text-xs mt-0.5">Document Portal</p>
            </div>

            <div className="flex-1 px-3 py-4">
                <p className="text-stone-600 text-xs uppercase tracking-widest px-2 mb-3">Main</p>
                <div 
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-700 cursor-pointer text-sm mb-1">
                    <Users size={15}/>
                    Clients
                </div>
            </div>

            <div className="px-3 py-4 border-t border-stone-700">
                <p className="text-stone-500 text-xs px-3 mb-3 truncate">{userEmail}</p>
                <div 
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-stone-700 cursor-pointer text-sm">
                    <LogOut size={15}/>
                    Logout
                </div>
            </div>
        </div>
    )
}

export default Sidebar