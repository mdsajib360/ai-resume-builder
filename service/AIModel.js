
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
               text: `Generate 3 short (2–3 line) resume summaries for the job title **${jobTitle}** — one each for **Fresher**, **Mid-Level**, and **Experienced**.

If "\${jobTitle}" is invalid, return:
{ "error": "Invalid Job Title" }

**Output (strict):**

✅ Valid:
{
  "resumeSummaries": [
    { "experienceLevel": "Fresher", "summary": "..." },
    { "experienceLevel": "Mid-Level", "summary": "..." },
    { "experienceLevel": "Experienced", "summary": "..." }
  ]
}

❌ Invalid:
{ "error": "Invalid Job Title" }

* Always return exactly 3 summaries if valid.
* Use only the top-level key \`resumeSummaries\`.`


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
  
   



 


