import {useState,useEffect} from "react";
import { supabase } from '../lib/supabase';
import {useNavigate} from 'react-router-dom';
import Sidebar from "../components/Sidebar"; 
import { ArrowLeft } from 'lucide-react'

function AddClientPage() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [age,setAge]= useState('');

    async function submitData() {
        const {data:{user}}= await supabase.auth.getUser();
        const {error} = await supabase.from('members').insert([
            {
                user_id: user.id,
                name: name,
                email: email,
                phone: phone,
                age: Number(age)
            }
        ]);
        if(!error)
        {
            navigate("/dashboard");
        }
        else
        {
            alert("Error adding client: " + error.message);
        }
    }
    
    return (
    <div className="flex min-h-screen" style={{background:'#fafaf9'}}>
        <Sidebar userEmail={""} />
        
        <div className="flex-1 px-8 py-6">
            <div className="flex items-center gap-3 mb-6">
                <div 
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center gap-1 text-stone-400 hover:text-stone-600 cursor-pointer text-sm">
                    <ArrowLeft size={14}/>
                    Back
                </div>
                <span className="text-stone-300">|</span>
                <h1 className="text-xl font-semibold text-stone-800">Add Client</h1>
            </div>

            <div className="bg-white border border-stone-200 rounded-xl p-6 max-w-lg mx-auto flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <label className="text-stone-600 text-xs font-medium">Full Name</label>
                    <input 
                        type="text" 
                        placeholder="Enter client name" 
                        className="bg-stone-50 border border-stone-200 px-3 py-2 rounded-lg outline-none text-sm text-stone-700 focus:border-amber-400" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-stone-600 text-xs font-medium">Age</label>
                    <input 
                        type="text" 
                        placeholder="Enter client age" 
                        className="bg-stone-50 border border-stone-200 px-3 py-2 rounded-lg outline-none text-sm text-stone-700 focus:border-amber-400" 
                        value={age} 
                        onChange={(e) => setAge(e.target.value)}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-stone-600 text-xs font-medium">Email</label>
                    <input 
                        type="text" 
                        placeholder="Enter client email" 
                        className="bg-stone-50 border border-stone-200 px-3 py-2 rounded-lg outline-none text-sm text-stone-700 focus:border-amber-400" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-stone-600 text-xs font-medium">Phone Number</label>
                    <input 
                        type="tel" 
                        pattern="[0-9]*"
                        placeholder="Enter client phone number" 
                        className="bg-stone-50 border border-stone-200 px-3 py-2 rounded-lg outline-none text-sm text-stone-700 focus:border-amber-400" 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                    />
                </div>

                <button 
                    onClick={submitData} 
                    className="text-white text-sm py-2 rounded-lg font-medium mt-1"
                    style={{background:'#d97706'}}>
                    Add Client
                </button>
            </div>
        </div>
    </div>
)
}
export default AddClientPage;
// So basically, when we click view on a certain member's card, it goes to the URL client/id (the id we already fetched when fetching members) of the member from the database. 
//       This URL will show us the Client Page where we will fetch the documents of the client by first getting the id from the URL 
//       and then telling supabase to fetch those documents for that member_id.