import { Loader } from 'lucide-react'
import React from 'react'

function EducationalPreview({ resumeInfo }) {
    const themeColors = resumeInfo?.themeColor || 'black'

    
  return (
      <div>
                        <h2 className='text-center font-bold text-sm mb-2' style={{ color: themeColors }}>Education</h2>
          <hr className='border-[1.5px] my-2' style={{ borderColor: themeColors }} />
          {
              !resumeInfo.education && (
                   <div className="flex justify-center mt-20">
        <Loader className="animate-spin h-8 w-8" />
      </div>
              )
          }
          {
              resumeInfo?.education?.map((education, index) => (
                  <div key={index} className='my-5'>
                     
                      <h2 style={{ color: themeColors}} className='text-xs font-bold'>{education?.universityName}</h2>
                      <h2  className='text-xs flex justify-between'>{education?.degree && education.degree + ' in' }  {education?.major}
                          <span>{education?.startDate} - {education?.endDate} </span>
                      </h2>
                      <p className='text-xs my-2'>
                          {education?.description }
                      </p>
                      </div>
              ))
          }
    </div>
  )
}

export default EducationalPreview