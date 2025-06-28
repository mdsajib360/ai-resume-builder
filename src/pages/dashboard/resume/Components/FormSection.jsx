import React, { useState } from 'react'
import PersonalDetails from './forms/PersonalDetails'
import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react'
import {Button} from "../../../../components/ui/button"
import Summary from './forms/Summary';
import Experience from './forms/Experience';
import Education from './forms/Education';
function FormSection() {
  const [ activeFormIndex, setActiveFormIndex ] = useState(3);
  const [enableNext, setEnableNext] = useState(false);
  return (
    <div>
      <div className='flex justify-between'>
        <Button variant="outline"><LayoutGrid /> Theme</Button>
        <div className='flex gap-2'>
           {activeFormIndex>1
            &&<Button size="sm" 
            onClick={()=>setActiveFormIndex(activeFormIndex-1)}> <ArrowLeft/> </Button> }
            <Button 
            disabled={!enableNext}
            className="flex gap-2" size="sm"
            onClick={()=>setActiveFormIndex(activeFormIndex+1)}
            > Next 
            <ArrowRight/> </Button>
        </div>
      </div>
      {/* Personal Details */}
      {activeFormIndex === 1 && <PersonalDetails enableNext={(v)=>  setEnableNext(v)} />}
      {/* Summary  */}
      {activeFormIndex===2  && <Summary  enableNext={(v)=>  setEnableNext(v)} />}
      {/* Experience  */}
      {activeFormIndex===3 && <Experience />}
      {/* Educational Details */}
      {activeFormIndex ===4 && <Education />}
      {/* Skills  */}

    </div>
  )
}

export default FormSection