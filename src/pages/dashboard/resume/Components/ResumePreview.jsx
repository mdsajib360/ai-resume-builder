import React, { useContext } from 'react'
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext';
import PersonalDetailPreview from '../../components/Preview/PersonalDetailPreview';
import SummaryPreview from './preview/SummaryPreview';
import ExperiencePreview from './preview/ExperiencePreview';
import EducationalPreview from './preview/EducationalPreview';
import SkillPreview from './preview/SkillPreview'
function ResumePreview() {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    return (
      <div className='shadow-lg h-full p-14 border-t-[20px]' style={{borderColor: resumeInfo?.themeColor}} >
           
        {/* personal details */}
        <PersonalDetailPreview resumeInfo={resumeInfo}/>
        {/* summary */}
        <SummaryPreview resumeInfo={resumeInfo} />
        {/* professional experience  */}
        <ExperiencePreview resumeInfo={resumeInfo} />
        {/* educational  */}
        <EducationalPreview resumeInfo={resumeInfo}/>
          {/* skills */}
        <SkillPreview resumeInfo={resumeInfo} /> 
      
      </div>
  )
}

export default ResumePreview