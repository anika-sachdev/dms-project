    import {useNavigate, useParams} from 'react-router-dom';
    import {useState,useEffect} from "react";
    import { supabase } from '../lib/supabase';
    import { File, Mail, Phone, User, ArrowRight,Eye,Download} from 'lucide-react'

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
            <div>
            </div>
            <button onClick={() => navigate(`/upload/${id}`)} className="bg-blue-300 text-white px-4 py-2 rounded-xl hover:bg-blue-400">
                + Upload Document
            </button>
        </div>
            {documents.length==0?
            (<div className="flex flex-col items-center justify-center p-12 text-gray-400">
        <File size={40} />
        <p className="mt-2">No documents uploaded yet</p>
    </div>):(
        <div className="grid grid-cols-3 gap-4 px-6">
        {documents.map((doc)=>
                (
                    <div key={doc.id} className="bg-blue-100 w-80 h-46 p-6 m-8 border-gray-500 shadow-md rounded-xl flex flex-col">
                        <p className="text-xl text-gray-600 font-bold">{doc.doc_type}</p>
                        <div className="flex gap-2 pt-2 items-center">
                            <p className="text-gray-500 truncate">Document Name: {doc.doc_name}</p>
                        </div>
                        <div className="flex gap-2 pt-2 items-center">
                            <p className="text-gray-500">Document Number: {doc.doc_number?doc.doc_number:"NA"}</p>
                        </div>
                        <hr className="border-gray-300 mt-3" />
                        <div className="flex justify-between ml-4 mr-4 gap-2 pt-2 text-gray-500 text-sm">
                            <div className=" flex items-center gap-3">
                            <Eye size={16} />
                                <a href={doc.file_url} className="text-gray-500 hover:text-blue-500 cursor-pointer justify-end" target="_blank">View</a>
                            </div>
                            <div className=" flex items-center gap-3"> 
                            <Download size={16} />
                                <a href={doc.file_url} className="text-gray-500 hover:text-blue-500 cursor-pointer justify-end" target="_blank" download>Download</a>
                                </div>
                        </div>
                    </div>
                ))}
                </div>
    )}
    </div>
);
    }
    export default ClientPage;