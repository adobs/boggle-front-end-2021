import React, { useEffect } from 'react';

import s from './secondBoggleHint.module.css';

const SecondBoggleHint = ({ blueGuess, blueValidation, redGuess, redValidation, onSecondHintSubmit, onSecondHintChange }) => {

  const blueInput = React.createRef();

  useEffect(() => {
    blueInput.current.scrollIntoView()
  });

  return (
    <div className={s.secondHint}>
      <div className={s.blueRedInput}>
        Blue: 
        <input ref={blueInput} onChange={(evt) => onSecondHintChange(evt, 'blue')}/>
        <button type='submit' disabled={blueGuess ? false : true} onClick={(evt) => onSecondHintSubmit(evt, 'blue')}>Submit</button>
        {blueValidation && <p>{blueValidation}</p>}
      </div>
      <div className={s.blueRedInput}>
        Password: 
        <input className={s.redInput} placeholder='=CONCAT(red, points, points)' onChange={(evt) => onSecondHintChange(evt, 'red')} />
        <button type='submit' disabled={redGuess ? false : true} onClick={(evt) => onSecondHintSubmit(evt, 'red')}>Submit</button>
        {redValidation && <p>{redValidation}</p>}
      </div>
    </div>
  )
}

export default SecondBoggleHint;