import React, { useState } from 'react';
import { BookOpen, CheckCircle, Loader2 } from 'lucide-react';
import getCorrectedText from './aiEnglish';
import './App.css';

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
        const isIncorrect =
          inputText.includes(segment.trim()) ||
          segment.trim().includes('Incorrect') ||
          segment.trim().includes('Error');
        return (
          <div key={index} className='correction'>
            <span className={isIncorrect ? 'highlight incorrect' : 'highlight'}>
              {segment}
            </span>
          </div>
        );
      }
      return segment.split('\n').map((line, i) => (
        <p key={`${index}-${i}`} className='text-line'>
          {line}
        </p>
      ));
    });
  };

  return (
    <div className='app'>
      <div className='container'>
        <header className='header'>
          <BookOpen className='icon' />
          <h1>Grammar Correction</h1>
          <p className='subtitle'>
            Enter your text below and let AI polish your writing
          </p>
        </header>

        <div className='input-card'>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder='Enter text to be corrected...'
          />
          <button
            onClick={handleCorrectText}
            disabled={isLoading || !inputText.trim()}
            className='correct-button'
          >
            {isLoading ? (
              <>
                <Loader2 className='icon spinning' />
                Correcting...
              </>
            ) : (
              <>
                <CheckCircle className='icon' />
                Correct Text
              </>
            )}
          </button>
        </div>

        {correctedText && (
          <div className='output-card'>
            <h2>Corrected Text</h2>
            <div className='corrected-content'>
              {renderCorrectedText(correctedText)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
