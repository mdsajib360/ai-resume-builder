import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { RWebShare } from 'react-web-share'
import GlobalApi from '../../../../../service/GlobalApi'
import ResumePreview from '../../../dashboard/resume/Components/ResumePreview'
import Header from '../../../../components/header/Header'
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext'
import { toast } from 'sonner'
import { Loader } from 'lucide-react'

function ViewResume() {

    const [resumeInfo,setResumeInfo]=useState(null);
    const {resumeId}=useParams();

    // const GetResumeInfo=()=>{
    //   GlobalApi.GetResumeById(resumeId).then(resp=>{
    //     console.log(resp.data.data);
    //     setResumeInfo(resp.data.data);
    //   })
    // }
  useEffect(() => {
  let isMounted = true;

  GlobalApi.GetResumeById(resumeId).then(resp => {
    if (isMounted) {
      console.log(resp.data.data);
      setResumeInfo(resp.data.data);
    }
  });

  return () => { isMounted = false; };
}, [resumeId]);



    const HandleDownload=()=>{
        window.print();
  }
   useEffect(() => {
  if (resumeInfo?.firstName && resumeInfo?.lastName) {
    document.title = `${resumeInfo.firstName} ${resumeInfo.lastName}_resume`;
  }
}, [resumeInfo]);

  return (
    <>
      {
      !resumeInfo &&
   <div className="flex justify-center mt-20"><Loader className="animate-spin h-8 w-8 " /></div>

      }
   { resumeInfo && (
    <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}} >
        <div id="no-print">
            <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
                <h2 className='text-center text-2xl font-medium'>
                    Congrats! Your Ultimate AI generates Resume is ready !
                </h2>
                <p className='text-center text-gray-400'>
                    Now you are ready to download your resume and you can share unique
                    resume url with your friends and family
                </p>
                <div className='flex justify-between px-44 my-10'>
                    <Button onClick={HandleDownload}>Download</Button>

                    <RWebShare
                        data={{
                            text: "Hello Everyone, This is my resume please open url to see it",
                            url: import.meta.env.VITE_BASE_URL+"/my-resume/"+resumeId+"/view",
                            title: `${resumeInfo.firstName || ''} ${resumeInfo.lastName || ''} resume`, // Defensive access
                        }}
                        onClick={() => toast("shared successfully!")}
                    >
                        <Button>Share</Button>
                    </RWebShare>
                </div>
            </div>
        </div>
        <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
            <div id="print-area" className='content'>
                <ResumePreview/> {/* This component will also receive null initially */}
            </div>
        </div>
    </ResumeInfoContext.Provider>
)}
    </>
  )
}

export default ViewResume