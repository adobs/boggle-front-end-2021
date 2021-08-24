import React, { useState, useEffect, useCallback } from 'react';

import Boggle from '../boggle/index.js'
import WordForm from '../wordForm/index.js';
import Paper from '../paper/index.js';
import SecondBoggleHint from '../secondBoggleHint/index.js'
import { TOTAL_SCORE } from '../constants.js';

import s from './page.module.css';

const Page = () => {
  const [guess, setGuess] = useState('');
  const [blueGuess, setBlueGuess] = useState('');
  const [blueValidation, setBlueValidation] = useState('')
  const [redGuess, setRedGuess] = useState('')
  const [redValidation, setRedValidation] = useState('');
  const [validation, setValidation] = useState('');
  const [correctWords, setCorrectWords] = useState([]);
  const [score, setScore] = useState(0);
  const [showSecondHint, setShowSecondHint] = useState(false);
  const [hints, setHints] = useState([]);
  const [hintMode, setHintMode] = useState(false);
  
  const onInputChange = (evt) => {
    const guess = evt.target.value;
    setGuess(guess);
    setValidation('\n');
  };

  const onSecondHintChange = (evt, color) => {
    const guess = evt.target.value;
    if (color === 'blue') {
      setBlueGuess(guess);
      setBlueValidation('\n');
    }
    else {
      setRedGuess(guess);
      setRedValidation('\n');
    }
  }

  const checkIfWordGuessed = (correctWord) => {
    const correctWordsJson = JSON.stringify(correctWords);
    const correctWordJson = JSON.stringify(correctWord);
    if (correctWordsJson.includes(correctWordJson)) {
      setValidation(`You've already guessed ${guess}!`)
      return true;
    }
    return false;
  };

  // useEffect(() => {

  // }, [correctWords])

  const onSubmit = (evt) => {
    evt.preventDefault();

    fetch('http://localhost:5000/boggle', {
      method: 'POST',
      body: JSON.stringify(guess.toLowerCase().trim()),
      mode: 'cors',
    })
      .then(resp => resp.json())
      .then(data => {
        console.log('data ', data)
        const { points } = data;

        if (points === 0) {
          setValidation(`"${guess}" is not an approved word.`)
          return;
        }

        if (checkIfWordGuessed([guess, points])) {
          return;
        }    

        setValidation('Correct!');
        setCorrectWords([...correctWords, [guess, points]]);
        setScore(score + points);
      })
      .catch(err => console.log('err ', err));
        
    if (score === TOTAL_SCORE) {
      setShowSecondHint(true);
    }
  }

  const inHintMode = useCallback(() => {
    fetch('http://localhost:5000/hint', {
      method: 'POST',
      body: JSON.stringify(correctWords),
      mode: 'cors',
    })
      .then(resp => resp.json())
      .then(data => {
        const { hints } = data;
        setHints(hints);
      });
  }, []);

  const toggleHintMode = () => {
    if (hintMode) {
      inHintMode();
      setHintMode(false);
      setHints([]);
    }
    else {
      setHintMode(true);
    }
  };

  const onSecondHintSubmit = (evt, color) => {
    evt.preventDefault();

    let guess;
    if (color === 'blue') {
      guess = blueGuess;
    }
    else {
      guess = redGuess;
    }

    fetch(`http://localhost:5000/${color}`, {
      method: 'POST',
      body: JSON.stringify(guess),
      mode: 'cors',
    })
    .then(resp => resp.json())
    .then(data => {
      const { answer } = data;

      if (answer) {
        if (color === 'blue') {
          setBlueValidation('Correct!')
        }
        else {
          setRedValidation('Correct!')
        }
      }

      else {
        if (color === 'blue') {
          setBlueValidation('Incorrect :(');
        }
        else {
          setRedValidation('Incorrect :(');
        }
      }    
    })
    .catch(err => console.log('err ', err));
  }

  useEffect(() => {
    inHintMode();
  // eslint-disable-next-line no-use-before-define
  }, [correctWords, inHintMode]);

  return (
    <div className={s.page}>
      <div className={s.header}>
        <img src='boggleLogo.jpeg' alt='Boggle' />
        <div className={s.dark}><span>&nbsp;after dark</span></div>
      </div>
        <div className={s.prompt}>Play a {TOTAL_SCORE} point game</div>
      <div className={s.alignment}>
        <div className={s.hints}>
          <button className={s.btn} onClick={toggleHintMode}>{hintMode ? 'Hide Hint Mode' : 'Show Hint Mode'}</button>
          <div className={s.dashes}>
            {hintMode && hints.map((hint, i) =><div key={i}>{hint}</div>)}
          </div>
        </div>
        <div className={s.board}>
          <div>
            <Boggle showSecondHint={showSecondHint} />
          </div>
          <div>
            <div className={s.wordForm}>
              <WordForm onInputChange={onInputChange} guess={guess} onSubmit={onSubmit} validation={validation} />
            </div>
            <Paper correctWords={correctWords} score={score} />
          </div>
        </div>
      </div>
      {showSecondHint && 
        <SecondBoggleHint 
          blueGuess={blueGuess} 
          redGuess={redGuess} 
          blueValidation={blueValidation} 
          redValidation={redValidation} 
          onSecondHintSubmit={onSecondHintSubmit} 
          onSecondHintChange={onSecondHintChange} 
        />
      }
    </div>
  );
}

export default Page;