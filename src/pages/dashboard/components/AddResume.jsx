import { Loader2, PlusSquare } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { v4 as uuidv4 } from 'uuid';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from 'react'
import GlobalApi from '../../../../service/GlobalApi';
import { useUser } from '@clerk/clerk-react';



function AddResume() {
    const [openDialog, setOpenDialog] = useState(false)
    const [resumeTitle, setResumeTitle] = useState()
    const { user } = useUser();
    const [loading, setLoading] = useState(false)
   
          
    
const onCreate = async () => {
   
        setLoading(true);

        // Generate a unique identifier
        const uuid = uuidv4();
        console.log(uuid);
        
        // Prepare the data payload
        const data = {
            data: {
                title: resumeTitle,
                resumeId: uuid,
                userEmail: user?.primaryEmailAddress?.emailAddress || "",
                userName: user?.fullName
                
            },
        };
          
   
        GlobalApi.CreateNewResume(data)
            .then(res => {
                console.log(res);
                if (res) {
                    setLoading(false)
                }
            
        }, (error)=> setLoading(false))
     

        // Check response status

};
    return (
      <div>
            <div className='p-14 py-24 border flex items-center justify-center rounded-lg bg-secondary h-[280px] hover:scale-105 transition-all cursor-pointer border-dashed'
            onClick={()=> setOpenDialog(true)}
            >
              <PlusSquare/>
          </div>
          <Dialog open={openDialog} >

              <DialogContent className="bg-white">
    <DialogHeader>
      <DialogTitle>Create New Resume</DialogTitle>
      <DialogDescription>
                            Add a title for your new resume
                            <Input className="mt-2" placeholder="EX.Full Stack Resume"
                            onChange= {(e)=> setResumeTitle(e.target.value)}
                            />
                        </DialogDescription>
                        <div className='flex justify-end gap-5'>
                            <Button onClick={()=> setOpenDialog(false)} variant="secondary">Cancel</Button>
                            <Button disabled={!resumeTitle||loading} onClick={() => onCreate()}>
                                {loading ? <Loader2 className='animate-spin'/> : 'Create'}
                            </Button>
                        </div>
    </DialogHeader>
  </DialogContent>
</Dialog>
    </div>
  )
}

export default AddResume