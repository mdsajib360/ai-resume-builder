import { useContext, useEffect, useState } from "react";
import Editor, {
  BtnBold,
  BtnItalic,
  Toolbar,
  BtnUnderline,
  HtmlButton,
  Separator,
  BtnNumberedList,
  BtnBulletList,
  BtnLink,
  BtnClearFormatting,
  BtnStrikeThrough,
  BtnStyles,
  EditorProvider,
} from "react-simple-wysiwyg";
import { ResumeInfoContext } from "../../../../context/ResumeInfoContext";
import { Button } from "../../../../components/ui/button";
import { Brain, LoaderCircle, LoaderPinwheel } from "lucide-react";
import { experienceSummary } from "../../../../../service/ExperienceAi";
import { toast } from "sonner";

function RichTextEditor({ onRichTextEditorChange, index, defaultValue, name }) {
  const [value, setValue] = useState(defaultValue);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);
  const [aiSummary, setAISummary] = useState("");

  // Synchronize value with defaultValue when defaultValue changes
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const GenerateSummaryByAI = async () => {
    const experienceTitle = resumeInfo?.experiencelist[index]?.title;
    if (!experienceTitle) {
      toast("Please Add Position Title");
      return;
    }
    try {
      setLoading(true);
      const aiResponse = await experienceSummary(experienceTitle); // Await the result of the promise
      setValue(aiResponse);
      setAISummary(aiResponse);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching summary:", error.message);
      setLoading(false);
    }
  };
  console.log(onRichTextEditorChange)
  return (
    <div>
      <div className="flex justify-between my-2">
        <label className="text-xs">Summary</label>
        <Button
          variant="outline"
          onClick={GenerateSummaryByAI}
          type="button"
          size="sm"
          className="border-primary text-primary flex gap-2 px-4 py-2 rounded-lg transition duration-300 ease-in-out hover:bg-primary hover:text-white hover:border-transparent focus:ring-2 focus:ring-primary focus:ring-offset-2 active:scale-95"
        >
          {loading && !value ? (
            <>
              <LoaderPinwheel />
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
      <EditorProvider>
         <Editor
          value={value}
          name= {name}
          onChange={(e) => {
        setValue(e.target.value);
        onRichTextEditorChange(e);
      }}
    >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnBulletList />
            <BtnNumberedList />
            <Separator />
            <BtnLink />
            <BtnClearFormatting />
            <Separator />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
}

export default RichTextEditor;
