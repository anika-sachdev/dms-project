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
    
    return(
        <div>
            <h1 className=" text-gray-500 text-2xl font-bold p-4 text-center">ADD CLIENT</h1>
            <div className="bg-blue-100 flex flex-col justify-center w-3/4 h-full m-auto p-4 rounded-sm shadow-md">
            <label className="text-gray-500 font-bold px-3">Name:</label>
                <input type="text" placeholder="Enter your name" className="bg-white w-220 m-2 px-3 py-1 outline-none rounded-sm" value={name} onChange={(e) => setName(e.target.value)}></input>
                <label className="text-gray-500 font-bold px-3 mt-4">Age:</label>
                <input type="text" placeholder="Enter your age" className="bg-white w-220 m-2 px-3 py-1 outline-none rounded-sm" value={age} onChange={(e) => setAge(e.target.value)}></input>
                <label className="text-gray-500 font-bold px-3 mt-4">Email:</label>
                <input type="text" placeholder="Enter your email" className="bg-white w-220 m-2 px-3 py-1 outline-none rounded-sm" value={email} onChange={(e) => setEmail(e.target.value)}></input>
            <label className="text-gray-500 font-bold px-3 mt-4">Phone Number:</label>
                <input type="text" placeholder="Enter your phone number" className="bg-white w-220 m-2 px-3 py-1 outline-none rounded-sm" value={phone} onChange={(e) => setPhone(e.target.value)}></input>
                <div className="flex justify-center">
            <button onClick={submitData} className="bg-blue-300 text-white py-2 px-4 rounded-xl w-60 hover:bg-blue-400 m-7">Submit</button>
            </div>
            </div>
        </div>
    );
}
export default AddClientPage;