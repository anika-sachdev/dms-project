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
            <div>
                <div className=" bg-gray-100 h-15 flex w-full justify-between items-center border-b-2 border-gray-300 shadow-md">
                    <h2 className="text-2xl text-blue-300 p-6">DMS</h2>
                    <div className="flex items-center">
                    <h5 className="text-blue-300 justify-end">{currentEmail}</h5>
                    <h5 className="text-blue-300 hover:text-blue-500 cursor-pointer justify-end p-6" onClick={handleLogout}>
                        Logout
                    </h5>
                    </div>
                </div>
                <div className="flex items-center justify-between px-6 py-6">
                    <h4 className="text-gray-500 text-3xl">Clients</h4>
                    <button onClick={() => navigate("/addclient")} className="bg-blue-300 text-white py-2 px-4 rounded-xl hover:bg-blue-400">
                        + Add Client
                    </button>
                </div>
                <div>
                    <input type="search" placeholder="Search by name,email,phone number" className="bg-gray-100 w-280 m-6 px-3 py-2 outline-none rounded-xl"></input>
                </div>
                <div className="grid grid-cols-3 gap-4 px-6">
                {currentMembers.map((member)=>
                (
                    <div className="bg-blue-100 w-80 h-60 p-6 m-8 border-gray-500 shadow-md rounded-xl flex flex-col" key={member.id}>
                        <h3 className="text-xl text-gray-600 font-bold">{member.name[0] + member.name.split(' ').pop()[0]}</h3>
                        <h5 className="text-gray-500 pt-2">{member.name}</h5>
                        <div className="flex gap-2 pt-2 items-center">
                            <Mail size={16} className="text-gray-400 " />
                            <p className="text-gray-500 text-sm truncate">Email: {member.email}</p>
                        </div>
                        <div className="flex gap-2 pt-2 items-center">
                            <Phone size={16} className="text-gray-400" />
                            <p className="text-gray-500">Phone: {member.phone}</p>
                        </div>
                        <div className="flex gap-2 pt-2 items-center">
                            <User size={16} className="text-gray-400" />
                            <p className="text-gray-500">Age: {member.age}</p>
                        </div>
                        <hr className="border-gray-300 mt-3" />
                        <div className="flex justify-between gap-2 pt-2 text-gray-500 text-sm">
                            <p>4 documents</p>
                            <div className="flex items-center gap-1">
                            <p className="text-gray-500 hover:text-blue-500 cursor-pointer justify-end">View</p>
                            <ArrowRight size={16} className="text-gray-400 mt-1" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            </div>
        );
    }
    export default DashboardPage;

    //Any value that is brought from somewhere else (database , api call anything) 
    // and has to be displayed on screen or any value that is continuously changing and affects whats shown on screen we put it in