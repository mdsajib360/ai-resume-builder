import { Button } from '@/components/ui/button'
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from '../../../../../service/GlobalApi'
import ResumePreview from '../../../dashboard/resume/Components/ResumePreview'
import Header from '../../../../components/header/Header'
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext'
import { toast } from 'sonner'
import { Loader } from 'lucide-react'
import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf'



function ViewResume() {

    const [resumeInfo,setResumeInfo]=useState(null);
    const {resumeId}=useParams();
    const printAreaRef = useRef(null);

    // const GetResumeInfo=()=>{
    //   GlobalApi.GetResumeById(resumeId).then(resp=>{
    //     console.log(resp.data.data);
    //     setResumeInfo(resp.data.data);
    //   })
  // }
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${resumeInfo.firstName || ''} ${resumeInfo.lastName || ''} resume`,
          text: 'Hello Everyone, This is my resume please open url to see it',
          url: `${import.meta.env.VITE_BASE_URL}/my-resume/${resumeId}/view`,
        });
        toast('Shared successfully!');
      } catch (error) {
        console.error('Share failed:', error);
      }
    } else {
      alert('Web Share API is not supported in your browser');
    }
  };
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



const HandleDownload = async () => {
  if (!printAreaRef.current) {
    toast.error('Resume content not found');
    return;
  }

  const element = printAreaRef.current;
  element.classList.add("print-pdf"); // 🔧 Apply fixed size

  await new Promise(resolve => setTimeout(resolve, 100)); // Allow reflow

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: null,
      allowTaint: true
    });

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: 'a4',
      hotfixes: ["px_scaling"]
    });

    const imgData = canvas.toDataURL('image/png', 1.0);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    let heightLeft = pdfHeight;
    let position = 0;
    const pageHeight = pdf.internal.pageSize.getHeight();

    pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);

    while (heightLeft > pageHeight) {
      position -= pageHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
      heightLeft -= pageHeight;
    }

    const timestamp = new Date().toISOString().slice(0, 10);
    pdf.save(`${resumeInfo.firstName}_resume_${timestamp}.pdf`);

    toast.success('PDF generated successfully!');
  } catch (err) {
    console.error('PDF Error:', err);
    toast.error('PDF generation failed');
  } finally {
    element.classList.remove("print-pdf"); // cleanup
  }
};




   useEffect(() => {
  if (resumeInfo?.firstName && resumeInfo?.lastName) {
    document.title = `${resumeInfo.firstName} ${resumeInfo.lastName}_resume`;
  }
}, [resumeInfo]);

  return (
  <>
    {!resumeInfo && (
      <div className="flex justify-center mt-20">
        <Loader className="animate-spin h-8 w-8" />
      </div>
    )}

    {resumeInfo && (
      <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
        <div id="no-print">
          <div className="my-10 px-4 md:px-20 lg:px-36">
            <h2 className="text-center text-2xl font-medium">
              Congrats! Your Ultimate AI Generated Resume is ready!
            </h2>
            <p className="text-center text-gray-400 mt-2">
              Now you are ready to download your resume and you can share a unique
              resume URL with your friends and family.
            </p>

            {/* Button Section */}
            <div className="flex flex-col md:flex-row gap-4 justify-between md:px-44 items-center mt-8">
              <Button onClick={HandleDownload} className="w-full md:w-auto">
                Download
              </Button>

             
                <Button onClick={handleShare} className="w-full md:w-auto">Share</Button>
              
            </div>
          </div>
        </div>

        <div className="flex justify-center my-10 px-4 md:px-40 lg:px-46">
          <div id="print-area" ref={printAreaRef} style={{ color: 'black', backgroundColor: 'white' }} >
            <ResumePreview />
          </div>
        </div>
      </ResumeInfoContext.Provider>
    )}
  </>
);

}

export default ViewResume