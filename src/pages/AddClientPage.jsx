import {useState,useEffect} from "react";
import { supabase } from '../lib/supabase';
import {useNavigate} from 'react-router-dom';

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
    <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200 shadow-sm px-8 py-4">
            <h1 className="text-2xl font-bold text-gray-700">Add Client</h1>
        </div>
        <div className="bg-white border border-gray-200 flex flex-col w-2/4 m-auto mt-8 p-8 rounded-xl shadow-sm gap-4">
            <label className="text-gray-600 font-medium text-sm">Name:</label>
            <input type="text" placeholder="Enter client name" className="bg-gray-50 border border-gray-200 px-3 py-2 outline-none rounded-lg text-gray-700 focus:border-teal-500" value={name} onChange={(e) => setName(e.target.value)}/>

            <label className="text-gray-600 font-medium text-sm">Age:</label>
            <input type="text" placeholder="Enter client age" className="bg-gray-50 border border-gray-200 px-3 py-2 outline-none rounded-lg text-gray-700 focus:border-teal-500" value={age} onChange={(e) => setAge(e.target.value)}/>

            <label className="text-gray-600 font-medium text-sm">Email:</label>
            <input type="text" placeholder="Enter client email" className="bg-gray-50 border border-gray-200 px-3 py-2 outline-none rounded-lg text-gray-700 focus:border-teal-500" value={email} onChange={(e) => setEmail(e.target.value)}/>

            <label className="text-gray-600 font-medium text-sm">Phone Number:</label>
            <input type="text" placeholder="Enter client phone number" className="bg-gray-50 border border-gray-200 px-3 py-2 outline-none rounded-lg text-gray-700 focus:border-teal-500" value={phone} onChange={(e) => setPhone(e.target.value)}/>

            <button onClick={submitData} className="bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 font-medium mt-2">
                Submit
            </button>
        </div>
    </div>
)
}
export default AddClientPage;
// So basically, when we click view on a certain member's card, it goes to the URL client/id (the id we already fetched when fetching members) of the member from the database. 
//       This URL will show us the Client Page where we will fetch the documents of the client by first getting the id from the URL 
//       and then telling supabase to fetch those documents for that member_id.