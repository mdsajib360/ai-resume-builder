import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FormSection from '../../Components/FormSection';
import ResumePreview from '../../Components/ResumePreview';
import dummy from '../../../../../data/dummy';
import { ResumeInfoContext } from '../../../../../context/ResumeInfoContext';
import GlobalApi from '../../../../../../service/GlobalApi';

function EditResume() {
  const {resumeId} = useParams();
  // console.log(resumeId);
  
  const [resumeInfo, setResumeInfo] = useState([]);
  useEffect(() => {
    GetResumeInfo()
  
    
  }, [])
  GlobalApi.GetResumeById(resumeId).then(res =>{
    // console.log(res.data.data)
    
  })
   const GetResumeInfo=()=>{
        GlobalApi.GetResumeById(resumeId).then(resp=>{
          console.log(resp.data.data);
          setResumeInfo(resp.data.data);
        })
    }
  return (
    <ResumeInfoContext.Provider value={{resumeInfo, setResumeInfo}}>

    <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'> 
      {/* Form Section */}
      <FormSection/>
      {/* Preview Section */}
    <ResumePreview/>
    </div>
    </ResumeInfoContext.Provider>
  )
}

export default EditResume