    import {useState,useEffect} from "react";
    import { supabase } from '../lib/supabase';
    import { useNavigate } from 'react-router-dom';
    import {Mail,Phone,User,ArrowRight} from 'lucide-react';
    import Sidebar from "../components/Sidebar"; 
    function DashboardPage()
    {
        // So we are using useEffect so that when the page loads, we fetch the email id of the user 
        // and display it on the screen (we are using state since it affects what is displayed on the screen)
        const navigate = useNavigate();
        const [currentEmail,setCurrentEmail] = useState("");
        const [currentMembers,setCurrentMembers] = useState([]);
        const [searchTab,setSearchTab]=useState("");
        const filteredMembers=currentMembers.filter((member)=>
            member.name.toLowerCase().includes(searchTab.toLowerCase()) || 
            member.email.toLowerCase().includes(searchTab.toLowerCase())||
            member.phone.toLowerCase().includes(searchTab))
        // Search works by maintaining a searchQuery state that updates every time the user types in the search bar.
// Instead of making a new Supabase call on every keystroke, we already have all members stored in currentMembers.
// filteredMembers is a filtered copy of currentMembers that only keeps members whose name, email, or phone
// contains the search text. When searchQuery is empty, filteredMembers matches all members and all cards show.
// When the user types, React re-renders automatically and filteredMembers recalculates, showing only matching cards.

// .filter() goes through every member in currentMembers and keeps only the ones where the condition is true.
// .toLowerCase() converts both the member data and search query to lowercase so "Priya" matches "priya" or "PRIYA".
// .includes() checks if the search text appears anywhere in the name, email, or phone.
// If any one of the three conditions is true (name OR email OR phone matches), that member is kept in filteredMembers.
        useEffect(() => {
            async function getUserEmail(){
            const {data:{user}}= await supabase.auth.getUser();
            if(user)
            {
                setCurrentEmail(user.email);
            }
            const {data,error}= await supabase.from('members').select('*').eq('user_id',user.id);
            if(data)
            {
                setCurrentMembers(data);
            }
        }
        getUserEmail();
        },[]);
        //React doesnt allow useEffect to be async so we create an async function inside useEffect.
        //So, when the page loads, useEffect seees the call of the async function and executes it.
        async function handleLogout()
        {
            await supabase.auth.signOut();
            navigate("/");
        }        return (
    <div className="flex min-h-screen" style={{background:'#fafaf9'}}>
        <Sidebar userEmail={currentEmail}/>
        
        <div className="flex-1 px-8 py-6">

            <div className="flex items-center justify-between mb-6">
                <h1 className="text-xl font-semibold text-stone-800">Clients</h1>
                <button 
                    onClick={() => navigate("/addclient")} 
                    className="text-white text-sm px-4 py-2 rounded-lg font-medium"
                    style={{background:'#d97706'}}>
                    + Add Client
                </button>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white border border-stone-200 rounded-lg p-4">
                    <p className="text-stone-400 text-xs mb-1">Total Clients</p>
                    <p className="text-2xl font-semibold text-stone-800">{currentMembers.length}</p>
                </div>
                <div className="bg-white border border-stone-200 rounded-lg p-4">
                    <p className="text-stone-400 text-xs mb-1">Total Documents</p>
                    <p className="text-2xl font-semibold text-stone-800">—</p>
                </div>
                <div className="bg-white border border-stone-200 rounded-lg p-4">
                    <p className="text-stone-400 text-xs mb-1">Added This Month</p>
                    <p className="text-2xl font-semibold text-stone-800">—</p>
                </div>
            </div>

            <input 
                onChange={(e) => setSearchTab(e.target.value)} 
                value={searchTab}
                type="search" 
                placeholder="Search by name, email, phone number" 
                className="w-full bg-white border border-stone-200 px-4 py-2 rounded-lg text-sm text-stone-600 outline-none mb-6"
            />
            <div className="grid grid-cols-2 gap-4">
                {filteredMembers.map((member) => (
                    <div key={member.id} className="bg-white border border-stone-200 rounded-xl p-5 hover:border-amber-400 transition-all">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold" style={{background:'#fef3c7', color:'#92400e'}}>
                                {member.name[0] + member.name.split(' ').pop()[0]}
                            </div>
                            <p className="text-stone-800 font-medium text-sm">{member.name}</p>
                        </div>
                        <div className="flex items-center gap-2 mb-1.5">
                            <Mail size={12} className="text-stone-400"/>
                            <p className="text-stone-500 text-xs truncate">{member.email}</p>
                        </div>
                        <div className="flex items-center gap-2 mb-1.5">
                            <Phone size={12} className="text-stone-400"/>
                            <p className="text-stone-500 text-xs">{member.phone}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <User size={12} className="text-stone-400"/>
                            <p className="text-stone-500 text-xs">Age: {member.age}</p>
                        </div>
                        <hr className="border-stone-100 my-3"/>
                        <div className="flex justify-between items-center text-xs">
                            <p className="text-stone-400">documents</p>
                            <div 
                                onClick={() => navigate(`/client/${member.id}`)}
                                className="flex items-center gap-1 cursor-pointer font-medium"
                                style={{color:'#d97706'}}>
                                View <ArrowRight size={12}/>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);
    }
    export default DashboardPage;

    //Any value that is brought from somewhere else (database , api call anything) 
    // and has to be displayed on screen or any value that is continuously changing and affects whats shown on screen we put it in