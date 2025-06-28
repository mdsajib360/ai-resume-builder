import React, { useContext, useState } from 'react'
import { ResumeInfoContext } from '../../../../../context/ResumeInfoContext'
import { Input } from "../../../../../components/ui/input"
import { Button } from "../../../../../components/ui/button"
import GlobalApi from '../../../../../../service/GlobalApi'
import { useParams } from 'react-router-dom'
import { LoaderCircle } from 'lucide-react'
import { toast } from 'sonner'

function PersonalDetails({enableNext}) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  const params = useParams()
  const [formData, setFormData] = useState()
  const [loading, setLoading] = useState(false);
  const handleInputChange = (e) => {
    enableNext(false)
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:value
    })
    setResumeInfo({
      ...resumeInfo, 
      [name ]: value  
    })
  }
  const onSave = (e) => {
    e.preventDefault();
    setLoading(true)
    const data = {
      data: formData
    }
    GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(res => {
      console.log(res);
      
      enableNext(true)
      setLoading(false)
      toast("Details are updated")
    }, (error) => {
      setLoading(false)
    })
  }
  return (
      <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
          <h2 className='font-bold text-lg'>Personal Detail</h2>
      <p>Get Started with the Basic Information</p>
      <form onSubmit={onSave}>
        <div className="grid grid-cols mt-5 gap-3">
          <div>
            <label className='text-sm' htmlFor="">First Name</label>
            <Input defaultValue={resumeInfo?.firstName} name="firstName" required onChange={handleInputChange} />
          </div>
          <div>
            <label  className='text-sm' htmlFor="">Last Name</label>
            <Input defaultValue={resumeInfo?.lastName} name="lastName" required onChange={handleInputChange} />
          </div>
          <div className='col-span-2'>
            <label className='text-sm' htmlFor="">Job Title</label>
            <Input defaultValue={resumeInfo?.jobTitle} name="jobTitle" required onChange={handleInputChange} />
          </div>
          <div className='col-span-2'>
            <label className='text-sm' htmlFor="">Address</label>
            <Input defaultValue={resumeInfo?.address} name="address" required onChange={handleInputChange} />
          </div>
          <div>
            <label className='text-sm' htmlFor="">Phone</label>
            <Input defaultValue={resumeInfo?.phone} name="phone" required onChange={handleInputChange} />
          </div>
          <div>
            <label className='text-sm' htmlFor="">Email</label>
            <Input defaultValue={resumeInfo?.email} name="email" required onChange={handleInputChange} />
          </div>

        </div>
        <div className='mt-3 flex justify-end'>
          <Button type="submit" disabled={loading}> {loading ? <LoaderCircle className='animate-spin'/>: 'Save'}</Button>
        </div>
      </form>
    </div>
  )
}

export default PersonalDetails