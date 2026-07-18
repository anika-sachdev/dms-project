    import {useNavigate, useParams} from 'react-router-dom';
    import {useState,useEffect} from "react";
    import { supabase } from '../lib/supabase';
    import { File, Mail, Phone, User, ArrowRight,Eye,Download,Trash2} from 'lucide-react'

    function ClientPage()
    {
        const navigate=useNavigate();
        const [member,setMember] = useState(null);
        const [documents,setDocuments] = useState([]);
        //Since the member's info to be displayed at the top of the page and the documents list for each client is coming from the database
        // and affects the HTML, they are declared as states.
        const {id} = useParams();
        async function handleDeleteDocument(docId,fileUrl)
        {
            const fileName=fileUrl.split('/').pop();
            const {error:storageError}=await supabase.storage.from('documents').remove([fileName]);
            const {error:databaseError}=await supabase.from('documents').delete().eq('id',docId);
            setDocuments(documents.filter((doc)=>doc.id !==docId));
        }
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
    <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="bg-white flex items-center justify-between px-8 py-4 border-b border-gray-200 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-700">{member.name}</h2>
            <button onClick={() => navigate('/dashboard')} className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 font-medium">
                Back to Dashboard
            </button>
        </div>

        <div className="flex gap-8 px-8 py-4 bg-white border-b border-gray-200">
            <div className="flex items-center gap-2">
                <Mail size={15} className="text-teal-500"/>
                <p className="text-gray-500 text-sm">{member.email}</p>
            </div>
            <div className="flex items-center gap-2">
                <Phone size={15} className="text-teal-500"/>
                <p className="text-gray-500 text-sm">{member.phone}</p>
            </div>
            <div className="flex items-center gap-2">
                <User size={15} className="text-teal-500"/>
                <p className="text-gray-500 text-sm">Age: {member.age}</p>
            </div>
        </div>

        <div className="flex items-center justify-between px-8 py-4">
            <div className="flex items-center gap-2">
                <File size={18} className="text-teal-500"/>
                <p className="text-gray-700 text-lg font-bold">Documents</p>
            </div>
            <button onClick={() => navigate(`/upload/${id}`)} className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 font-medium">
                + Upload Document
            </button>
        </div>

        {documents.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-gray-400">
                <File size={40} className="text-teal-300"/>
                <p className="mt-2">No documents uploaded yet</p>
            </div>
        ) : (
            <div className="grid grid-cols-3 gap-6 px-8">
                {documents.map((doc) => (
                    <div key={doc.id} className="bg-white border border-gray-200 p-6 shadow-sm rounded-xl flex flex-col hover:border-teal-400 transition-all">
                        <p className="text-lg text-gray-700 font-bold">{doc.doc_type}</p>
                        <p className="text-gray-500 text-sm truncate mt-1">{doc.doc_name}</p>
                        <p className="text-gray-400 text-sm mt-1">No: {doc.doc_number ? doc.doc_number : "NA"}</p>
                        <hr className="border-gray-100 mt-3"/>
                        <div className="flex justify-between mt-3 text-sm">
                            <a href={doc.file_url} target="_blank" className="flex items-center text-gray-400 gap-1 hover:text-teal-600">
                                <Eye size={14}/>
                                View
                            </a>
                            <a href={doc.file_url} download target="_blank" className="flex items-center gap-1 text-gray-400 hover:text-teal-500">
                                <Download size={14}/>
                                Download
                            </a>
                            <button 
                                    onClick={() => handleDeleteDocument(doc.id, doc.file_url)} className="flex items-center gap-1 text-gray-400 hover:text-red-500">
                                    <Trash2 size={14}/>
                                    Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
)
    }
    export default ClientPage;