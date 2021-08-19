import { TOTAL_SCORE } from '../constants.js'

import s from './paper.module.css';

const Paper = ({ correctWords, score }) => {

  return (
    <div className={s.paper}>
      <table>
        <thead className={s.paperHeader}>
          <tr>
            <th>Word</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {correctWords.map((word, i) => (
            <tr key={i}>
              <td>{word[0]}</td>
              <td>{word[1]}</td>
            </tr>))}
        </tbody>
      </table>
      <table>
        <tbody>
          <tr>
            <td>Total points</td>
            <td>{score}</td>
          </tr>
          <tr>
            <td>Remaining points</td>
            <td>{TOTAL_SCORE - score}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Paper
