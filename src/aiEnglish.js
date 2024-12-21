import { GoogleGenerativeAI } from '@google/generative-ai';

const aiEnglish = new GoogleGenerativeAI(process.env.REACT_APP_GOOGLE_API_KEY);
const model = aiEnglish.getGenerativeModel({ model: 'gemini-1.5-flash' });

const getCorrectedText = async (text) => {
  const prompt = ` You are my English instructor give me correct grammar and explain it to me my paragraph is:${text} give me the correct grammer and explain it in Turkish.`;
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.log('Error:', error);
  }
};
export default getCorrectedText;
