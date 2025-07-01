import React, { useState } from 'react'
import PersonalDetails from './forms/PersonalDetails'
import { ArrowLeft, ArrowRight, HomeIcon, LayoutGrid, LucideHome } from 'lucide-react'
import {Button} from "../../../../components/ui/button"
import Summary from './forms/Summary';
import Experience from './forms/Experience';
import Education from './forms/Education';
import Skills from './forms/Skills';
import { Link, Navigate, useParams } from 'react-router-dom';
import Home from '../../../Home/Home';
import ThemeColor from './ThemeColor';
function FormSection() {
  const [activeFormIndex,setActiveFormIndex]=useState(1);
  const [enableNext,setEnableNext]=useState(true);
  const {resumeId}=useParams();
  return (
    <div>
        <div className='flex justify-between items-center bg-white'>
          <div className='flex gap-5'>
            <Link to={"/dashboard"}>
          <Button><LucideHome/> </Button>
          </Link>

         
          <ThemeColor/>
          </div>
          <div className='flex gap-2 bg-white'>
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
        {/* Personal Detail  */}
         {activeFormIndex==1?  
        <PersonalDetails  enableNext={(v) => setEnableNext(v)} />
       
        :activeFormIndex==2?
              <Summary  enableNext={(v)=>setEnableNext(v)} />
        :activeFormIndex==3?
          <Experience />  
          :activeFormIndex==4?
          <Education />
          :activeFormIndex==5?
          <Skills/>
          :activeFormIndex==6?
          <Navigate to={'/my-resume/'+resumeId+"/view"}/>
              
        :null
          }
        

      {/* Experience  */}

      {/* Educational Detail  */}

      {/* Skills  */}

    </div>
  )

}

export default FormSection