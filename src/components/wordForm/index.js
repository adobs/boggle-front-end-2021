import React from 'react';

import s from './wordForm.module.css';

const WordForm = ({ onInputChange, guess, onSubmit, validation }) => {
  const input = React.createRef();

  return (
    <div className={s.form}>
      <input ref={input} onChange={onInputChange} type="text" value={guess} />
      <button type="submit" disabled={guess ? false : true} onClick={onSubmit}>Submit</button>
      {validation && <p>{validation}</p>}
    </div>
  );
};

export default WordForm;