    import {useNavigate, useParams} from 'react-router-dom';
    import {useState,useEffect} from "react";
    import { supabase } from '../lib/supabase';
    import { File, Mail, Phone, User, ArrowRight,Eye,Download,Trash2} from 'lucide-react'
    import Sidebar from "../components/Sidebar"; 
    import { ArrowLeft, FileText } from 'lucide-react'

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
                return(<div className="flex h-screen items-center justify-center"><p className="text-center">Loading Clients....</p></div>);
            }
        return (
    <div className="flex min-h-screen" style={{background:'#fafaf9'}}>
        <Sidebar userEmail={""} />

        <div className="flex-1 px-8 py-6">

            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div 
                        onClick={() => navigate('/dashboard')}
                        className="flex items-center gap-1 text-stone-400 hover:text-stone-600 cursor-pointer text-sm">
                        <ArrowLeft size={14}/>
                        Back
                    </div>
                    <span className="text-stone-300">|</span>
                    <h1 className="text-xl font-semibold text-stone-800">{member.name}</h1>
                </div>
                <button 
                    onClick={() => navigate(`/upload/${id}`)} 
                    className="text-white text-sm px-4 py-2 rounded-lg font-medium"
                    style={{background:'#d97706'}}>
                    + Upload Document
                </button>
            </div>

            <div className="bg-white border border-stone-200 rounded-xl p-5 mb-6 flex gap-8">
                <div className="flex items-center gap-2">
                    <Mail size={14} className="text-stone-400"/>
                    <p className="text-stone-600 text-sm">{member.email}</p>
                </div>
                <div className="flex items-center gap-2">
                    <Phone size={14} className="text-stone-400"/>
                    <p className="text-stone-600 text-sm">{member.phone}</p>
                </div>
                <div className="flex items-center gap-2">
                    <User size={14} className="text-stone-400"/>
                    <p className="text-stone-600 text-sm">Age: {member.age}</p>
                </div>
            </div>

            <div className="flex items-center gap-2 mb-4">
                <FileText size={16} className="text-stone-400"/>
                <h2 className="text-stone-800 font-medium">Documents</h2>
            </div>

            {documents.length === 0 ? (
                <div className="bg-white border border-stone-200 rounded-xl flex flex-col items-center justify-center py-16 text-stone-400">
                    <FileText size={36} className="mb-2 text-stone-300"/>
                    <p className="text-sm">No documents uploaded yet</p>
                </div>
            ) : (
                <div className="grid grid-cols-3 gap-4">
                    {documents.map((doc) => (
                        <div key={doc.id} className="bg-white border border-stone-200 rounded-xl p-5 hover:border-amber-300 transition-all flex flex-col">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{background:'#fef3c7'}}>
                                    <FileText size={14} style={{color:'#92400e'}}/>
                                </div>
                                <div>
                                    <p className="text-stone-800 text-sm font-medium">{doc.doc_type}</p>
                                    <p className="text-stone-400 text-xs truncate">{doc.doc_name}</p>
                                </div>
                            </div>
                            <p className="text-stone-400 text-xs mb-3">
                                No: {doc.doc_number ? doc.doc_number : "—"}
                            </p>
                            <hr className="border-stone-100 mb-3"/>
                            <div className="flex justify-between text-xs">
                                <a 
                                    href={doc.file_url} 
                                    target="_blank" 
                                    className="flex items-center gap-1 text-stone-400 hover:text-stone-600">
                                    <Eye size={12}/>
                                    View
                                </a>
                                <a 
                                    href={doc.file_url} 
                                    download 
                                    target="_blank" 
                                    className="flex items-center gap-1 text-stone-400 hover:text-stone-600">
                                    <Download size={12}/>
                                    Download
                                </a>
                                <button 
                                    onClick={() => handleDeleteDocument(doc.id, doc.file_url)} 
                                    className="flex items-center gap-1 text-stone-400 hover:text-red-400">
                                    <Trash2 size={12}/>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
)
    }
    export default ClientPage;