import {useState,useEffect} from "react";
import {useNavigate, useParams} from 'react-router-dom';
import { supabase } from '../lib/supabase';

function UploadDocumentPage()
{
    const {id}=useParams();
    const [docName,setDocName]=useState("");
    const [docType,setDocType]=useState("");
    const [file,setFile]=useState("");
    return(
        <div className="flex justify-center">
            <h3 className="text-2xl font-bold text-gray-600 pt-6">Upload Documents</h3>
        </div>
    );
}
export default UploadDocumentPage;