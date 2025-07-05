import { Input } from '@/components/ui/input'
import React, { useContext, useEffect, useState } from 'react'
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'
import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import GlobalApi from '../../../../../../service/GlobalApi'
function Skills() {

    const [skillsList,setSkillsList]=useState([{
        name:'',
        rating:0
    }])
    const {resumeId}=useParams();

    const [loading,setLoading]=useState(false);
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
   
    useEffect(()=>{
        resumeInfo?.skills?.length>0&&setSkillsList(resumeInfo?.skills)
      },[])
   
    const handleChange=(index,name,value)=>{
        const newEntries=skillsList.slice();
      
        newEntries[index][name]=value;
        setSkillsList(newEntries);
    }

    const AddNewSkills=()=>{
        setSkillsList([...skillsList,{
            name:'',
        rating:0 
        }])
    }
    const RemoveSkills=()=>{
        setSkillsList(skillsList=>skillsList.slice(0,-1))
    }

    const onSave=()=>{

        setLoading(true);
        const data={
            data:{
                skills:skillsList.map(({id, ...rest }) => rest)
            }
        }

        GlobalApi.UpdateResumeDetail(resumeId,data)
        .then(resp=>{
            console.log(resp);
            setLoading(false);
            toast('Details updated !')
        },(error)=>{
            setLoading(false);
            toast('Server Error, Try again! '+ error.message)
        })
    }

    useEffect(()=>{
        setResumeInfo({
            ...resumeInfo,
            skills:skillsList
        })
    },[skillsList])
  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10 bg-white">
  <h2 className="font-bold text-lg mb-2">Skills</h2>
  <p className="mb-4 text-sm text-gray-600">Add Your top professional key skills</p>

  <div>
    {skillsList.map((item, index) => (
      <div
        key={index}
        className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 border rounded-lg p-3 gap-3"
      >
        <div className="w-full sm:w-2/3">
          <label className="text-xs mb-1 block">Name</label>
          <Input
            className="w-full"
            defaultValue={item.name}
            onChange={(e) => handleChange(index, "name", e.target.value)}
          />
        </div>
        <div className="w-full sm:w-auto">
          <label className="sr-only">Rating</label>
          <Rating
            style={{ maxWidth: 120 }}
            value={item.rating}
            onChange={(v) => handleChange(index, "rating", v)}
          />
        </div>
      </div>
    ))}
  </div>

  <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
    <div className="flex gap-2 flex-wrap">
      <Button variant="outline" onClick={AddNewSkills} className="text-primary">
        + Add More Skill
      </Button>
      <Button variant="outline" onClick={RemoveSkills} className="text-primary">
        - Remove
      </Button>
    </div>
    <Button disabled={loading} onClick={() => onSave()}>
      {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
    </Button>
  </div>
</div>

  )
}

export default Skills