import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BookOpen, CheckCircle, Loader2 } from 'lucide-react';
import getCorrectedText from './aiEnglish';

const App = () => {
  const [inputText, setInputText] = useState('');
  const [correctedText, setCorrectedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCorrectText = async () => {
    setIsLoading(true);
    try {
      const corrected = await getCorrectedText(inputText);
      setCorrectedText(corrected);
    } catch (error) {
      console.error('Error correcting text:', error);
    }
    setIsLoading(false);
  };

  const renderCorrectedText = (text) => {
    return text.split('**').map((segment, index) => {
      if (index % 2 !== 0) {
        return (
          <div key={index} className='py-1'>
            <span className='font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded'>
              {segment}
            </span>
          </div>
        );
      }
      return segment.split('\n').map((line, i) => (
        <p key={`${index}-${i}`} className='py-1'>
          {line}
        </p>
      ));
    });
  };

  return (
    <div className='min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-3xl mx-auto'>
        <div className='text-center mb-8'>
          <BookOpen className='mx-auto h-12 w-12 text-blue-600' />
          <h1 className='mt-4 text-3xl font-bold tracking-tight text-gray-900'>
            Grammar Correction
          </h1>
          <p className='mt-2 text-gray-600'>
            Enter your text below and let AI polish your writing
          </p>
        </div>

        <Card className='mb-6'>
          <CardContent className='pt-6'>
            <textarea
              className='w-full h-40 p-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200 ease-in-out'
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder='Enter text to be corrected...'
            />
            <button
              onClick={handleCorrectText}
              disabled={isLoading || !inputText.trim()}
              className='mt-4 w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center'
            >
              {isLoading ? (
                <>
                  <Loader2 className='animate-spin -ml-1 mr-2 h-5 w-5' />
                  Correcting...
                </>
              ) : (
                <>
                  <CheckCircle className='mr-2 h-5 w-5' />
                  Correct Text
                </>
              )}
            </button>
          </CardContent>
        </Card>

        {correctedText && (
          <Card className='mt-8'>
            <CardHeader>
              <CardTitle className='text-lg font-medium text-gray-900'>
                Corrected Text
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='prose prose-blue max-w-none'>
                {renderCorrectedText(correctedText)}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default App;
