import React from 'react';

import s from './boggle.module.css'

const Boggle = ({ showSecondHint }) => {
  return (
    <React.Fragment>
      <div className={s.boggleBoard}>
        <div className={s.boggleRow}>
          <div className={s.cube}>D</div>
          <div className={showSecondHint ? s.cubeBlue : s.cube}>L</div>
          <div className={showSecondHint ? s.cubeRed : s.cube}>O</div>
          <div className={showSecondHint ? s.cubeRed : s.cube}>S</div>
          <div className={showSecondHint ? s.cubeBlue : s.cube}>A</div>
        </div> 
        <div className={s.boggleRow}>
          <div className={s.cube}>A</div>
          <div className={showSecondHint ? s.cubeBlue : s.cube}>N</div>
          <div className={s.cube}>V</div>
          <div className={showSecondHint ? s.cubeRed : s.cube}>R</div>
          <div className={s.cube}>T</div>
        </div> 
        <div className={s.boggleRow}>
          <div className={s.cube}>D</div>
          <div className={s.cube}>U</div>
          <div className={showSecondHint ? s.cubeBlue : s.cube}>Y</div>
          <div className={showSecondHint ? s.cubePurple : s.cube}>E</div>
          <div className={s.cube}>H</div>
        </div> 
        <div className={s.boggleRow}>
          <div className={s.cube}>D</div>
          <div className={s.cube}>G</div>
          <div className={s.cube}>H</div>
          <div className={showSecondHint ? s.cubeBlue : s.cube}>T</div>
          <div className={s.cube}>G</div>
        </div> 
        <div className={s.boggleRow}>
          <div className={showSecondHint ? s.cubeBlue : s.cube}>M</div>
          <div className={s.cube}>Y</div>
          <div className={s.cube}>O</div>
          <div className={showSecondHint ? s.cubeRed : s.cube}>N</div>
          <div className={showSecondHint ? s.cubeBlue : s.cube}>I</div>
        </div>  
      </div> {/* close boggleBoard  */}
    </React.Fragment>
  )
}

export default Boggle;