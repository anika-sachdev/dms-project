    import {useState,useEffect} from "react";
    import { supabase } from '../lib/supabase';
    import { useNavigate } from 'react-router-dom';
    import {Mail,Phone,User,ArrowRight} from 'lucide-react';

    function DashboardPage()
    {
        // So we are using useEffect so that when the page loads, we fetch the email id of the user 
        // and display it on the screen (we are using state since it affects what is displayed on the screen)
        const navigate = useNavigate();
        const [currentEmail,setCurrentEmail] = useState("");
        const [currentMembers,setCurrentMembers] = useState([]);
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
    <div className="min-h-screen bg-gray-50">
        <div className="bg-white h-16 flex w-full justify-between items-center border-b border-gray-200 shadow-sm px-6">
            <h2 className="text-2xl font-bold text-teal-600">DMS</h2>
            <div className="flex items-center gap-6">
                <h5 className="text-gray-500 text-sm">{currentEmail}</h5>
                <h5 className="text-gray-500 text-sm hover:text-red-400 cursor-pointer" onClick={handleLogout}>Logout</h5>
            </div>
        </div>

        <div className="flex items-center justify-between px-8 py-6">
            <h4 className="text-gray-700 text-2xl font-bold">Clients</h4>
            <button onClick={() => navigate("/addclient")} className="bg-teal-500 text-white py-2 px-5 rounded-lg hover:bg-teal-600 font-medium">
                + Add Client
            </button>
        </div>

        <div className="px-8 mb-6">
            <input type="search" placeholder="Search by name, email, phone number" className="bg-white border border-gray-200 w-full px-4 py-2 outline-none rounded-lg text-gray-600 focus:border-teal-500"/>
        </div>

        <div className="grid grid-cols-3 gap-6 px-8">
            {currentMembers.map((member) => (
                <div className="bg-white border border-gray-200 p-6 shadow-sm rounded-xl flex flex-col hover:border-teal-400 transition-all" key={member.id}>
                    <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center mb-3">
                        <h3 className="text-teal-600 font-bold">{member.name[0] + member.name.split(' ').pop()[0]}</h3>
                    </div>
                    <h5 className="text-gray-700 font-semibold">{member.name}</h5>
                    <div className="flex gap-2 pt-2 items-center">
                        <Mail size={14} className="text-gray-400"/>
                        <p className="text-gray-500 text-sm truncate">{member.email}</p>
                    </div>
                    <div className="flex gap-2 pt-2 items-center">
                        <Phone size={14} className="text-gray-400"/>
                        <p className="text-gray-500 text-sm">{member.phone}</p>
                    </div>
                    <div className="flex gap-2 pt-2 items-center">
                        <User size={14} className="text-gray-400"/>
                        <p className="text-gray-500 text-sm">Age: {member.age}</p>
                    </div>
                    <hr className="border-gray-100 mt-3"/>
                    <div className="flex justify-between gap-2 pt-2 text-sm">
                        <p className="text-gray-400">4 documents</p>
                        <div className="flex items-center gap-1 text-teal-500 hover:text-teal-600 cursor-pointer" onClick={() => navigate(`/client/${member.id}`)}>
                            <p>View</p>
                            <ArrowRight size={14}/>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
)
    }
    export default DashboardPage;

    //Any value that is brought from somewhere else (database , api call anything) 
    // and has to be displayed on screen or any value that is continuously changing and affects whats shown on screen we put it in