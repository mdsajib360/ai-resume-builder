import React from 'react'

function ExperiencePreview({ resumeInfo }) {
  const themeColor = resumeInfo?.themeColor || 'black'
  
  return (
    <div className='my-6'>
          <h2 className='text-center font-bold text-sm mb-2' style={{ color: themeColor }}>Professional Experience</h2>
          <hr className='border-[1.5px] my-2' style={{ borderColor: themeColor }} />
      {resumeInfo?.experiencelist?.map((experience, index) => {
        
        console.log('expreview', experience.title)

          return     <div key={index} className='my-5'>
                  
                  <h2 className='text-xs font-bold' style={{ color: themeColor }}>{experience.title} </h2>
              <h2 className='text-xs flex justify-between'>{experience.companyName}, {experience?.city} {experience?.state}
              <span>{experience?.startDate} to {experience?.currentlyWorking?'Present':experience.endDate} </span>
              </h2>
            {/* <p className='text-xs my-2'> {experience.workSummary} </p> */}
                <div className='text-sm my-2' dangerouslySetInnerHTML={{__html:experience?.workSummary}}>
                  
                </div>
              </div>
          })}
         
    </div>
  )
}

export default ExperiencePreview