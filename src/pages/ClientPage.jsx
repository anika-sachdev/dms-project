    import {useNavigate, useParams} from 'react-router-dom';
    import {useState,useEffect} from "react";
    import { supabase } from '../lib/supabase';
    import { File, Mail, Phone, User, ArrowRight } from 'lucide-react'

    function ClientPage()
    {
        const navigate=useNavigate();
        const [member,setMember] = useState(null);
        const [documents,setDocuments] = useState([]);
        //Since the member's info to be displayed at the top of the page and the documents list for each client is coming from the database
        // and affects the HTML, they are declared as states.
        const {id} = useParams();
        useEffect(()=>
        {
            async function fetchMemberDetails()
            {
                const {data:memberData,error:memberError}=await supabase. from('members').select('*').eq('id',id).single()
                if(memberData){
                    setMember(memberData);
                }
                const {data:documentData,error:docError}=await supabase. from('documents').select('*').eq('member_id',id)
                if(documentData)
                {
                    setDocuments(documentData);
                }
                //Renaming the data as documentData and memberData so that there is no confusion between the two.
            }
            fetchMemberDetails();
        },[]);
        if(!member)
            {
                return(<p>Loading</p>);
            }
        return (
    <div className="flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-600">{member.name}</h2>
            <button 
                onClick={() => navigate('/dashboard')}
                className="bg-blue-300 text-white px-4 py-2 rounded-xl hover:bg-blue-400">
                Back to Dashboard
            </button>
        </div>

        <div className="flex gap-6 p-6 border-b border-gray-200">
            <div className="flex items-center gap-2">
                <Mail size={16} className="text-gray-400"/>
                <p className="text-gray-500 text-sm">{member.email}</p>
            </div>
            <div className="flex items-center gap-2">
                <Phone size={16} className="text-gray-400"/>
                <p className="text-gray-500 text-sm">{member.phone}</p>
            </div>
            <div className="flex items-center gap-2">
                <User size={16} className="text-gray-400"/>
                <p className="text-gray-500 text-sm">Age: {member.age}</p>
            </div>
        </div>

        <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-2">
                <File size={20} className="text-gray-400"/>
                <p className="text-gray-500 text-xl font-bold">Documents</p>
            </div>
            <button onClick={() => navigate(`/upload/${id}`)} className="bg-blue-300 text-white px-4 py-2 rounded-xl hover:bg-blue-400">
                + Upload Document
            </button>
        </div>

        <div className="grid grid-cols-3 gap-4 px-6"></div>
    </div>
);
    }
    export default ClientPage;