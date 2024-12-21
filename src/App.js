import React, { useState } from 'react';
import getCorrectedText from './aiEnglish';
import './App.css';

const App = () => {
  const [inputText, setInputText] = useState('');
  const [correctedText, setCorrectedText] = useState('');

  const handleCorrectText = async () => {
    const corrected = await getCorrectedText(inputText);
    setCorrectedText(corrected);
  };

  const renderParagraphs = (text) => {
    return text
      .split('\n')
      .map((paragraph, index) => <p key={index}>{paragraph}</p>);
  };

  return (
    <div className='app-container'>
      <h1 className='app-title'>Grammar Correction App</h1>
      <textarea
        className='text-input'
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder='Enter text to be corrected'
      />
      <button className='correct-button' onClick={handleCorrectText}>
        Correct Text
      </button>
      <div className='corrected-text-container'>
        <h2>Corrected Text:</h2>
        {renderParagraphs(correctedText)}
      </div>
    </div>
  );
};

export default App;
