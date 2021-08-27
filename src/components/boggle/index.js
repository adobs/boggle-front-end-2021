import React from 'react';

import s from './boggle.module.css'

const Boggle = ({ showSecondHint, hintMode }) => {
  const cubeBlue = () => {
    if (hintMode && !showSecondHint) {
      return s.cubeDarkMode;
    }

    if (hintMode && showSecondHint) {
      return s.cubeBlueDarkMode;
    }

    if (!hintMode && !showSecondHint) {
      return s.cube;
    }

    if (!hintMode && showSecondHint) {
      return s.cubeBlue;
    }
  };

  const cubeRed = () => {
    if (hintMode && !showSecondHint) {
      return s.cubeDarkMode;
    }

    if (hintMode && showSecondHint) {
      return s.cubeRedDarkMode;
    }

    if (!hintMode && !showSecondHint) {
      return s.cube;
    }

    if (!hintMode && showSecondHint) {
      return s.cubeRed;
    }
  };

  const cubePurple = () => {
    if (hintMode && !showSecondHint) {
      return s.cubeDarkMode;
    }

    if (hintMode && showSecondHint) {
      return s.cubePurpleDarkMode;
    }

    if (!hintMode && !showSecondHint) {
      return s.cube;
    }

    if (!hintMode && showSecondHint) {
      return s.cubePurple;
    }
  };

  const cube = () => {
    if (hintMode) {
      console.log('in hint mode')
      return s.cubeDarkMode;
    }
    else {
      console.log('not in hint mode')
      return s.cube;
    }
  }

  return (
    <React.Fragment>
      <div className={s.boggleBoard}>
        <div className={s.boggleRow}>
          <div className={cube()}>D</div>
          <div className={cubeBlue()}>L</div>
          <div className={cubeRed()}>O</div>
          <div className={cubeRed()}>S</div>
          <div className={cubeBlue()}>A</div>
        </div> 
        <div className={s.boggleRow}>
          <div className={hintMode ? s.cubeDarkMode : s.cube}>A</div>
          <div className={cubeBlue()}>N</div>
          <div className={hintMode ? s.cubeDarkMode : s.cube}>V</div>
          <div className={cubeRed()}>R</div>
          <div className={hintMode ? s.cubeDarkMode : s.cube}>T</div>
        </div> 
        <div className={s.boggleRow}>
          <div className={hintMode ? s.cubeDarkMode : s.cube}>D</div>
          <div className={hintMode ? s.cubeDarkMode : s.cube}>U</div>
          <div className={cubeBlue()}>Y</div>
          <div className={cubePurple()}>E</div>
          <div className={hintMode ? s.cubeDarkMode : s.cube}>H</div>
        </div> 
        <div className={s.boggleRow}>
          <div className={hintMode ? s.cubeDarkMode : s.cube}>D</div>
          <div className={hintMode ? s.cubeDarkMode : s.cube}>G</div>
          <div className={hintMode ? s.cubeDarkMode : s.cube}>H</div>
          <div className={cubeBlue()}>T</div>
          <div className={hintMode ? s.cubeDarkMode : s.cube}>G</div>
        </div> 
        <div className={s.boggleRow}>
          <div className={cubeBlue()}>M</div>
          <div className={hintMode ? s.cubeDarkMode : s.cube}>Y</div>
          <div className={hintMode ? s.cubeDarkMode : s.cube}>O</div>
          <div className={cubeRed()}>N</div>
          <div className={cubeBlue()}>I</div>
        </div>  
      </div> {/* close boggleBoard  */}
    </React.Fragment>
  )
}

export default Boggle;