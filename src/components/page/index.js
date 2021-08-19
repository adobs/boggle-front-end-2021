import React, { useState } from 'react';

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
  const [showHint, setShowHint] = useState(false);

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
      setShowHint(true);
    }
  }

  const onSecondHintSubmit = (evt, color) => {
    evt.preventDefault();

    let guess;
    if (color === 'blue') {
      guess = blueGuess;
    }
    else {
      guess = redGuess;
    }
    console.log('guess is ', guess)

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

  return (
    <div className={s.page}>
      <div className={s.header}>
        <img src='boggleLogo.jpeg' alt='Boggle' />
        <div className={s.dark}><span>&nbsp;after dark</span></div>
      </div>
      <div className={s.prompt}>Play a {TOTAL_SCORE} point game</div>
      <div className={s.board}>
        <div>
          <Boggle showHint={showHint} />
        </div>
        <div>
          <div className={s.wordForm}>
            <WordForm onInputChange={onInputChange} guess={guess} onSubmit={onSubmit} validation={validation} />
          </div>
          <Paper correctWords={correctWords} score={score} />
        </div>
      </div>
      {showHint && 
        <SecondBoggleHint 
          blueGuess={blueGuess} 
          redGuess={redGuess} 
          blueValidation={blueValidation} 
          redValidation={redValidation} 
          onSecondHintSubmit={onSecondHintSubmit} 
          onSecondHintChange={onSecondHintChange} />}
    </div>
  );
}

export default Page;