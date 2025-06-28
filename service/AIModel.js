
import { GoogleGenAI } from '@google/genai';


 export const fetchResumeSummary = async (jobTitle) => {
     

      try {
        const ai = new GoogleGenAI({
          apiKey: import.meta.env.VITE_GEMINI_AI_API_KEY,
        });

        const config = {
          thinkingConfig: {
            thinkingBudget: 0,
          },
          responseMimeType: 'application/json',
        };

        const model = 'gemini-2.5-flash';

        const contents = [
          {
            role: 'user',
            parts: [
              {
                text: `Job Title:${jobTitle}, Depends on job title give me summery for my resume within 4-5 lines in JSON format with field experience Level and Summery with Experience level for Fresher, Mid-Level, Experienced. keep the object name resumeSummaries in every response do not change this`,
              },
            ],
          },
        ];

        const response = await ai.models.generateContentStream({
          model,
          config,
          contents,
        });

        let generatedSummary = '';
        for await (const chunk of response) {
          generatedSummary += chunk.text;
        }
        return generatedSummary;

      } catch (err) {
       return `${err} Failed to generate resume summary`;
      } 
   
    };
  
   



 


