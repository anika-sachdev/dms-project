import {useState,useEffect} from "react";
import {useNavigate, useParams} from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ArrowLeft } from "lucide-react";

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
                    file_url:fileUrl
                }
            )
            console.log(linkError);
            if(!linkError)
            {
                navigate(`/client/${id}`)
            }
    }
    return(
        <div className="flex items-center flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 w-full">
    <div className="w-20"></div>
    <h3 className="text-2xl font-bold text-gray-600">Upload Document</h3>
    <div 
        onClick={() => navigate(`/client/${id}`)}
        className="flex items-center gap-1 text-gray-500 hover:text-blue-500 cursor-pointer w-20 justify-end">
            <ArrowLeft size={16}/>
        <p>Back</p>
    </div>
</div>
            <div className="bg-blue-100 flex flex-col w-3/4 m-auto p-6 mt-2 rounded-xl shadow-md gap-4">
            
            <label className="text-gray-500 font-bold">Document Name:</label>
            <input 
                type="text" 
                placeholder="e.g. Rahul Aadhaar Front"
                className="bg-white px-3 py-2 rounded-xl outline-none"
                value={docName}
                onChange={(e) => setDocName(e.target.value)}
            />

            <label className="text-gray-500 font-bold">Document Number:</label>
            <input 
                type="text" 
                placeholder="Enter your Aadhaar number, PAN number etc."
                className="bg-white px-3 py-2 rounded-xl outline-none"
                value={docNumber}
                onChange={(e) => setDocNumber(e.target.value)}
            />

            <label className="text-gray-500 font-bold">Document Type:</label>
            <select 
                className="bg-white px-3 py-2 rounded-xl outline-none"
                value={docType}
                onChange={(e) => setDocType(e.target.value)}
            >
                <option value="">Select type</option>
                <option value="Aadhaar">Aadhaar</option>
                <option value="PAN">PAN</option>
                <option value="Driving License">Driving License</option>
                <option value="Voter ID">Voter ID</option>
                <option value="Photo">Photo</option>
                <option value="Signature">Signature</option>
                <option value="Other">Other</option>
            </select>

            <label className="text-gray-500 font-bold">Choose File:</label>
            <input 
                type="file"
                className="bg-white px-3 py-2 rounded-xl"
                onChange={(e) => setFile(e.target.files[0])}
            />

            <button onClick={handleUpload} className="bg-blue-300 text-white py-2 m-auto rounded-xl w-1/2 hover:bg-blue-400 mt-2">
                Upload
            </button>
        </div>
        </div>
    );
}
export default UploadDocumentPage;
// Files work differently from text inputs. Instead of e.target.value, we use e.target.files[0].
// This is because a file input can accept many files so it gives you an array. [0] gets the first file. We need the first file only.