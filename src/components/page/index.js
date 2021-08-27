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

  const onSubmit = (evt) => {
    evt.preventDefault();

    fetch('https://boggle-api-2021.herokuapp.com/boggle', {
      method: 'POST',
      body: JSON.stringify(guess.toLowerCase().trim()),
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin':'*'
      } 
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
    
    console.log('score', score);
    console.log('total score', TOTAL_SCORE)
    if (score === TOTAL_SCORE) {
      console.log('score is total score')
      setShowSecondHint(true);
    }
  }

  const inHintMode = useCallback(() => {
    fetch('https://boggle-api-2021.herokuapp.com/hint', {
      method: 'POST',
      body: JSON.stringify(correctWords),
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': 'https://serene-jackson-2e4440.netlify.app/',
        'Access-Control-Allow-Headers': 'X-Token',
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT",
        'Access-Control-Request-Headers': 'origin, x-requested-with'
      }
    })
      .then(resp => resp.json())
      .then(data => {
        const { hints } = data;
        setHints(hints);
        console.log(data)
      });
  }, [correctWords]);

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

    fetch(`https://boggle-api-2021.herokuapp.com/${color}`, {
      method: 'POST',
      body: JSON.stringify(guess),
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin':'*'
      }    
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
  }, [correctWords, inHintMode]);

  useEffect(() => {
    if (score === TOTAL_SCORE) {
      setShowSecondHint(true);
    }
  }, [score]);

  return (
    <div className={hintMode ? s.page + ' ' + s.darkMode : s.page}>
      <div className={s.header}>
        <img src='boggleLogo.png' alt='Boggle' />
        <div className={s.dark}><span>&nbsp;after dark</span></div>
      </div>
        <div className={hintMode ? s.darkModePrompt : s.prompt}>Play a {TOTAL_SCORE} point game</div>
      <div className={s.alignment}>
        <div className={s.hints}>
          <button className={s.btn} onClick={toggleHintMode}>{hintMode ? 'Hide Hint Mode' : 'Show Hint Mode'}</button>
          <div className={hintMode ? s.darkModeDashes : s.dashes}>
            {hintMode && !showSecondHint && hints.map((hint, i) =><div key={i}>{hint}</div>)}
          </div>
        </div>
        <div className={hintMode ? s.board + ' ' + s.darkModeBoard : s.board}>
          <div>
            <Boggle showSecondHint={showSecondHint} hintMode={hintMode}/>
          </div>
          {!showSecondHint && (
            <div>
              <div className={s.wordForm}>
                <WordForm onInputChange={onInputChange} guess={guess} onSubmit={onSubmit} validation={validation} />
              </div>
              <Paper correctWords={correctWords} score={score} />
            </div>
          )}
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