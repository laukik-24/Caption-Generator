// import { Platform, CaptionResponse } from '../types';
// import { GoogleGenerativeAI } from '@google/generative-ai';

// const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
// const genAI = new GoogleGenerativeAI(API_KEY);

// export const generateCaption = async (
//   platform: Platform,
//   context: string = ''
// ): Promise<CaptionResponse> => {
//   try {
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
//     let prompt = `Generate a creative and engaging caption for ${platform}.`;
//     if (context) {
//       prompt += ` The context is: ${context}.`;
//     }
    
//     prompt += ` The caption should:
//     - Match ${platform}'s style and tone
//     - Include relevant hashtags if appropriate
//     - Be within the platform's character limit
//     - Be engaging and authentic
//     - Avoid clichés and overused phrases`;

//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const caption = response.text();

//     return { caption };
//   } catch (error) {
//     console.error('Error generating caption:', error);
//     return { 
//       caption: '', 
//       error: 'Failed to generate caption. Please try again.' 
//     };
//   }
// };

import { Platform, CaptionResponse } from '../types';
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

export const generateCaption = async (
  platform: Platform,
  context: string = ''
): Promise<CaptionResponse> => {
  try {
    // If there's no context, return a sorry message
    if (!context) {
      return {
        caption: '',
        error: 'Sorry, context is required to generate a caption.'
      };
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    let prompt = `Generate a creative and engaging caption for ${platform}.`;
    prompt += ` The context is: ${context}.`;
    
    prompt += ` The caption should:
    - Match ${platform}'s style and tone
    - Include relevant hashtags if appropriate
    - Be within the platform's character limit
    - Be engaging and authentic
    - Avoid clichés and overused phrases`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const caption = response.text();

    return { caption };
  } catch (error) {
    console.error('Error generating caption:', error);
    return { 
      caption: '', 
      error: 'Failed to generate caption. Please try again.' 
    };
  }
};
