import {useState,useEffect} from "react";
import {useNavigate, useParams} from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ArrowRight } from "lucide-react";

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
    <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-8 py-4">
            <div className="w-20"></div>
            <h3 className="text-2xl font-bold text-gray-700">Upload Document</h3>
            <div onClick={() => navigate(`/client/${id}`)} className="flex items-center gap-1 text-gray-400 hover:text-teal-500 cursor-pointer w-20 justify-end">
                <p className="text-sm">Back</p>
                <ArrowRight size={16}/>
            </div>
        </div>

        <div className="bg-white border border-gray-200 flex flex-col w-2/4 m-auto mt-8 p-8 rounded-xl shadow-sm gap-4">
            <label className="text-gray-600 font-medium text-sm">Document Name:</label>
            <input type="text" placeholder="e.g. Rahul Aadhaar Front" className="bg-gray-50 border border-gray-200 px-3 py-2 rounded-lg outline-none focus:border-teal-500 text-gray-700" value={docName} onChange={(e) => setDocName(e.target.value)}/>

            <label className="text-gray-600 font-medium text-sm">Document Number:</label>
            <input type="text" placeholder="Enter Aadhaar number, PAN number etc." className="bg-gray-50 border border-gray-200 px-3 py-2 rounded-lg outline-none focus:border-teal-500 text-gray-700" value={docNumber} onChange={(e) => setDocNumber(e.target.value)}/>

            <label className="text-gray-600 font-medium text-sm">Document Type:</label>
            <select className="bg-gray-50 border border-gray-200 px-3 py-2 rounded-lg outline-none focus:border-teal-500 text-gray-700" value={docType} onChange={(e) => setDocType(e.target.value)}>
                <option value="">Select type</option>
                <option value="Aadhaar">Aadhaar</option>
                <option value="PAN">PAN</option>
                <option value="Driving License">Driving License</option>
                <option value="Voter ID">Voter ID</option>
                <option value="Photo">Photo</option>
                <option value="Signature">Signature</option>
                <option value="Other">Other</option>
            </select>

            <label className="text-gray-600 font-medium text-sm">Choose File:</label>
            <input type="file" className="bg-gray-50 border border-gray-200 px-3 py-2 rounded-lg text-gray-600" onChange={(e) => setFile(e.target.files[0])}/>

            <button onClick={handleUpload} className="bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 font-medium mt-2">
                Upload
            </button>
        </div>
    </div>
)
}
export default UploadDocumentPage;
// Files work differently from text inputs. Instead of e.target.value, we use e.target.files[0].
// This is because a file input can accept many files so it gives you an array. [0] gets the first file. We need the first file only.