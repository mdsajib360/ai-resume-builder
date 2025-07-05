import { LoaderCircle } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import GlobalApi from "../../../../../../service/GlobalApi";
import { Button } from "../../../../../components/ui/button";
import { Input } from "../../../../../components/ui/input";
import { Textarea } from "../../../../../components/ui/textarea";
import { ResumeInfoContext } from "../../../../../context/ResumeInfoContext";
import RichTextEditor from "../RichTextEditor";
// const formField = {
//   title: "",
//   companyName: "",
//   city: "",
//   state: "",
//   startDate: "",
//   endDate: "",
//   workSummary: "",
// };

function Experience() {
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();
  console.log(params.resumeId);

  const [experienceList, setExperienceList] = useState([
    {
      title: '',
      companyName: '',
      city: '',
      state: '',
      startDate: '',
      endDate: '',
      workSummary: '',
    },
  ]);

  useEffect(() => {
    resumeInfo?.experiencelist.length>0 && setExperienceList(resumeInfo?.experiencelist);
  }, []);

  const handleChange = (event, index) => {
    const newEntries = experienceList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setExperienceList(newEntries);
  };

  const AddNewExperience = () => {
    setExperienceList([
      ...experienceList,
      {
        title: '',
        companyName: '',
        city: '',
        state: '',
        startDate: '',
        endDate: '',
        workSummary: '',
      },
    ]);
  };

  const RemoveExperience = () => {
    setExperienceList((experienceList) => experienceList.slice(0, -1));
  };

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        experiencelist: experienceList.map(({ ...rest }) => rest),
      },
    };

    GlobalApi.UpdateResumeDetail(params.resumeId, data).then(
      
      (resp) => {
        console.log(resp);
        setLoading(false);
        toast('Details updated!');
      },
      (error) => {
        setLoading(false);
        toast('Server Error, Please try again!', error.message);
      }
    );
  };
  
   const handleRichTextEditor=(e,name,index)=>{
     console.log("handleRich", e, experienceList)   
     const newEntries = experienceList.slice();
     newEntries[index][name]=e.target.value;
     
     setExperienceList(newEntries);
     console.log(experienceList)
    }

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      experiencelist: experienceList,
    });
  }, [experienceList]);

  return (
    <div className="p-3 sm:p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
  <h2 className="font-bold text-lg">Professional Experience</h2>
  <p>Add Your previous job experience</p>

  <div>
    {experienceList.map((item, index) => (
      <div key={index}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-5 border p-3 my-5 rounded-lg">
          <div className="md:col-span-2">
            <label>Position Title</label>
            <Input
              name="title"
              onChange={(e) => handleChange(e, index)}
              defaultValue={item?.title}
            />
          </div>

          <div>
            <label>Company Name</label>
            <Input
              name="companyName"
              onChange={(e) => handleChange(e, index)}
              defaultValue={item?.companyName}
            />
          </div>

          <div>
            <label>City</label>
            <Input
              name="city"
              onChange={(e) => handleChange(e, index)}
              defaultValue={item?.city}
            />
          </div>

          <div>
            <label>State</label>
            <Input
              name="state"
              onChange={(e) => handleChange(e, index)}
              defaultValue={item?.state}
            />
          </div>

          <div>
            <label>Start Date</label>
            <Input
              type="date"
              name="startDate"
              onChange={(e) => handleChange(e, index)}
              defaultValue={item?.startDate}
            />
          </div>

          <div>
            <label>End Date</label>
            <Input
              type="date"
              name="endDate"
              onChange={(e) => handleChange(e, index)}
              defaultValue={item?.endDate}
            />
          </div>

          <div className="md:col-span-2">
            <label>Work Summary</label>
            <RichTextEditor
              index={index}
              defaultValue={item?.workSummary}
              onRichTextEditorChange={(event) =>
                handleRichTextEditor(event, 'workSummary', index)
              }
              name="workSummary"
            />
          </div>
        </div>
      </div>
    ))}
  </div>

  <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mt-4">
    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
      <Button
        variant="outline"
        onClick={AddNewExperience}
        className="text-primary w-full sm:w-auto"
      >
        + Add More Experience
      </Button>
      <Button
        variant="outline"
        onClick={RemoveExperience}
        className="text-primary w-full sm:w-auto"
      >
        - Remove Experience
      </Button>
    </div>

    <Button
      disabled={loading}
      onClick={() => onSave()}
      className="w-full sm:w-auto"
    >
      {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
    </Button>
  </div>
</div>

  );
}


export default Experience;
