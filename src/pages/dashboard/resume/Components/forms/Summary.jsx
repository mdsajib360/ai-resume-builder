import React, { useContext, useEffect, useState } from 'react'
import { Button } from '../../../../../components/ui/button'
import {Textarea} from '../../../../../components/ui/textarea'
import { ResumeInfoContext } from '../../../../../context/ResumeInfoContext'
import { useParams } from 'react-router-dom'
import GlobalApi from '../../../../../../service/GlobalApi'
import { Brain, Loader, LoaderCircle, LoaderPinwheelIcon, LucideLoaderPinwheel } from 'lucide-react'
import { toast } from 'sonner'
import { fetchResumeSummary } from '../../../../../../service/AIModel'



function Summary({enableNext}) {
    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext)
    const [summary, setSummary] = useState();
    const [loading, setLoading] = useState(false)
    const [aiGeneratedSummaryList, setAIGeneratedSummaryList] = useState([]);
    const [suggestionLoading, setSuggestionLoading] = useState(false)
    const params = useParams()

  console.log(enableNext);
  
  const GenerateSummaryFromAI = async () => {
      
    const jobTitle = resumeInfo?.jobTitle;
    
    try {
     setSuggestionLoading(true)
        // Await the result of the promise
      const result = await fetchResumeSummary(jobTitle);
      const parsedResult = JSON.parse(result);
      setAIGeneratedSummaryList([parsedResult])
      console.log(parsedResult)
      setLoading(false) 
      setSuggestionLoading(false)
    } catch (error) {
      
       console.error("Error fetching summary:", error.message);
      setLoading(false); // Ensure loading state is reset
      setSuggestionLoading(false)
    }
};

      
    
    useEffect(() => {
        summary && setResumeInfo({
            ...resumeInfo, 
            summary: summary
        })     
    }, [summary])
    
   
   const onSave = (e) => {
    e.preventDefault();
    setLoading(true)
    const data = {
        data: {
          summary: summary
      }
    }
    GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(res => {
      console.log(res); 
      enableNext(true)
      setLoading(false)
      toast("Summary updated")
    }, (error) => {
      setLoading(false)
      enableNext(true)
      toast(`Server Error ${error.message}`)

    })
  }
 console.log(aiGeneratedSummaryList)
  
    return (
      <div>
        <div className="p-5  shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
          <h2 className="font-bold text-lg">Summary</h2>
          <p>Add Summary For Your Job Title</p>
          <form className="mt-7" onSubmit={onSave}>
            <div className="flex justify-between items-end">
              <label htmlFor="">Summary</label>
              <Button
                variant="outline"
                onClick={() => GenerateSummaryFromAI()}
                type="button"
                size="sm"
                className="border-primary text-primary flex gap-2 px-4 py-2 rounded-lg transition duration-300 ease-in-out hover:bg-primary hover:text-white hover:border-transparent focus:ring-2 focus:ring-primary focus:ring-offset-2 active:scale-95"
              >
                {suggestionLoading && !summary ? (
            <>
              <LoaderPinwheelIcon />
              <span> Generating ...</span>
            </>
          ) : (
            <>
              <Brain className="h-4 w-4 animate-bounce" />
              <span> Generate from AI</span>
            </>
          )}
              </Button>
            </div>
            <Textarea
              className="mt-5"
              required
             value={summary || resumeInfo?.summary || ""} 
             onChange={(e) => setSummary(e.target.value)}
            />
            <div className="mt-2 flex justify-end">
              <Button disabled={loading && !summary} type="submit">
                {loading ? (
                  <LoaderCircle className="animate-spin    " />
                ) : (
                  "Save"
                )}
              </Button>
            </div>
          </form>
        </div>

        {aiGeneratedSummaryList && (
          <div className="my-5">
            <h2 className="font-bold text-lg">Suggestions</h2>
            {suggestionLoading && !summary && (
              <div className="flex justify-center items-center my-10">
                <Loader className="animate-spin h-8 w-8 text-primary" />
                <span className="ml-2 text-primary font-semibold">Generating Suggestions...</span>
              </div>)}
            {aiGeneratedSummaryList?.map((item, index) => (
              <div key={index} className="p-5 shadow-lg my-4 rounded-lg">
                <h2 className="font-bold text-primary my-2">{item.jobTitle}</h2>
                {item?.resumeSummaries?.map((summaryObj, idx) => {
                  const levelColor =
                    summaryObj.experienceLevel === "Fresher"
                      ? "text-green-600"
                      : summaryObj.experienceLevel === "Mid-Level"
                      ? "text-blue-600"
                      : "text-red-600"; // Customize colors as needed
                  return (
                    <div
                      key={idx}
                      className="p-4 shadow-md my-2 rounded-lg cursor-pointer"
                      onClick={()=>setSummary(summaryObj.summary)}
                    >
                      <h3 className={`font-semibold ${levelColor}`}>
                        Level: {summaryObj.experienceLevel}
                      </h3>
                      <p>{summaryObj.summary}</p>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </div>
    );
}

export default Summary