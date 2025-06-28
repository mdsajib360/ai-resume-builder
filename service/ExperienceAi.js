
import { GoogleGenAI } from '@google/genai';


 export const experienceSummary = async (positionTitle) => {
     

      try {
        const ai = new GoogleGenAI({
          apiKey: import.meta.env.VITE_GEMINI_AI_API_KEY,
        });

        const config = {
          thinkingConfig: {
            thinkingBudget: 0,
          },
          responseMimeType: 'text/plain',
        };

        const model = 'gemini-2.5-flash';

        const contents = [
          {
            role: 'user',
            parts: [
              {
                text: `position title: ${positionTitle}, Depends on position title give me 5-7 bullet points for my experience in resume. only give me the response in plain text in each response.
`,
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
  
   



 


