import React, { useEffect } from 'react';

import s from './secondBoggleHint.module.css';

const SecondBoggleHint = ({ blueGuess, blueValidation, redGuess, redValidation, onSecondHintSubmit, onSecondHintChange, hintMode }) => {

  const blueInput = React.createRef();

  useEffect(() => {
    blueInput.current.scrollIntoView()
  });

  return (
    <>
      <div className={s.secondHint}>
        <div className={s.container}>
          <div className={hintMode ? s.darkModeInput + ' ' + s.blueRedInput : s.input + ' ' + s.blueRedInput}>
          Blue:
          </div> 
          <input ref={blueInput} placeholder='blue' className={hintMode ? s.darkModeinput : s.input} onChange={(evt) => onSecondHintChange(evt, 'blue')}/>
          <button type='submit' disabled={blueGuess ? false : true} onClick={(evt) => onSecondHintSubmit(evt, 'blue')}>Submit</button>
        </div>
        {blueValidation && <div className={hintMode ? s.darkModeValidation : s.validation}>{blueValidation}</div>}
        <div className={s.container}>
          <div className={hintMode ? s.darkModeInput + ' ' + s.blueRedInput : s.input + ' ' + s.blueRedInput}>
          Password: 
          </div>
          <input className={s.redInput} placeholder='=CONCAT(red, points, points)' onChange={(evt) => onSecondHintChange(evt, 'red')} />
          <button type='submit' disabled={redGuess ? false : true} onClick={(evt) => onSecondHintSubmit(evt, 'red')}>Submit</button>
        </div>
        {redValidation && <div className={hintMode ? s.darkModeValidation : s.validation}>{redValidation}</div>}
      </div>
    </>
  );
}

export default SecondBoggleHint;