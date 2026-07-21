import {useState,useEffect} from "react";
import {useNavigate, useParams} from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ArrowRight,ArrowLeft } from "lucide-react";
import Sidebar from "../components/Sidebar"; 
function UploadDocumentPage()
{
    const navigate=useNavigate();
    const {id}=useParams();
    const [docName,setDocName]=useState("");
    const [docType,setDocType]=useState("");
    const [docNumber,setDocNumber]=useState("");
    const [file,setFile]=useState("");

    async function handleUpload()
    {
        if (!docType || !docName || !file)
        {
            alert("Fields are empty");
            return;
        }
        if(file.size>1*1024*1024)
        {
            alert("File size must not exceed 1MB");
            return;
        }
            const fileExt=file.name.split('.').pop()
            const fileName=`${id}_${Date.now()}.${fileExt}`
            const { data: { user } } = await supabase.auth.getUser();

            const {error:uploadError}= await supabase.storage.from('documents').upload(fileName,file)

            if(uploadError)
            {
                alert("Upload failed: "+uploadError);
                return;
            }
            const {data:urlData}=await supabase.storage.from('documents').getPublicUrl(fileName)
            const fileUrl=urlData.publicUrl

            const {error:linkError}=await supabase.from('documents').insert(
                {
                    member_id:id,
                    doc_name:docName,
                    doc_type:docType,
                    doc_number:docNumber,
                    file_url:fileUrl,
                    user_id: user.id
                }
            )
            console.log(linkError);
            if(!linkError)
            {
                navigate(`/client/${id}`)
            }
    }
    return (
    <div className="flex min-h-screen" style={{background:'#fafaf9'}}>
        <Sidebar userEmail={""} />

        <div className="flex-1 px-8 py-6">
            <div className="flex items-center gap-3 mb-6">
                <div 
                    onClick={() => navigate(`/client/${id}`)}
                    className="flex items-center gap-1 text-stone-400 hover:text-stone-600 cursor-pointer text-sm">
                    <ArrowLeft size={14}/>
                    Back
                </div>
                <span className="text-stone-300">|</span>
                <h1 className="text-xl font-semibold text-stone-800">Upload Document</h1>
            </div>

            <div className="bg-white border border-stone-200 rounded-xl p-6 max-w-lg mx-auto flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <label className="text-stone-600 text-xs font-medium">Document Name</label>
                    <input 
                        type="text" 
                        placeholder="e.g. Aadhaar Front" 
                        className="bg-stone-50 border border-stone-200 px-3 py-2 rounded-lg outline-none text-sm text-stone-700 focus:border-amber-400" 
                        value={docName} 
                        onChange={(e) => setDocName(e.target.value)}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-stone-600 text-xs font-medium">Document Number <span className="text-stone-400 font-normal">(optional)</span></label>
                    <input 
                        type="text" 
                        placeholder="Aadhaar number, PAN number etc." 
                        className="bg-stone-50 border border-stone-200 px-3 py-2 rounded-lg outline-none text-sm text-stone-700 focus:border-amber-400" 
                        value={docNumber} 
                        onChange={(e) => setDocNumber(e.target.value)}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-stone-600 text-xs font-medium">Document Type</label>
                    <select 
                        className="bg-stone-50 border border-stone-200 px-3 py-2 rounded-lg outline-none text-sm text-stone-700 focus:border-amber-400" 
                        value={docType} 
                        onChange={(e) => setDocType(e.target.value)}>
                        <option value="">Select type</option>
                        <option value="Aadhaar">Aadhaar</option>
                        <option value="PAN">PAN</option>
                        <option value="Driving License">Driving License</option>
                        <option value="Voter ID">Voter ID</option>
                        <option value="Photo">Photo</option>
                        <option value="Signature">Signature</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-stone-600 text-xs font-medium">Choose File</label>
                    <input 
                        type="file" 
                        className="bg-stone-50 border border-stone-200 px-3 py-2 rounded-lg text-sm text-stone-600" 
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                </div>

                <button 
                    onClick={handleUpload} 
                    className="text-white text-sm py-2 rounded-lg font-medium mt-1"
                    style={{background:'#d97706'}}>
                    Upload Document
                </button>
            </div>
        </div>
    </div>
)
}
export default UploadDocumentPage;
// Files work differently from text inputs. Instead of e.target.value, we use e.target.files[0].
// This is because a file input can accept many files so it gives you an array. [0] gets the first file. We need the first file only.