import './Scala.scss';
import React, { useEffect, useState } from 'react';
import Coin from '../assets/sounds/coin.mp3';

export const ScalaPlank = ({ card, onClick, alertClick }) => {
  const [audioIsPlaying, setAudioIsPlaying] = useState(false);

  useEffect(() => {
    setAudioIsPlaying(card?.isUsed);
  }, [card]);

  if (card?.isActive) {
    return (
      <div className="coin-card is-active" onClick={(e) => onClick(e, card)}>
        <h3>{card.text}</h3>
        <div>
          <button onClick={(e) => alertClick(e, card, true)}>Добро</button>
          <button onClick={(e) => alertClick(e, card, false)}>Зло</button>
        </div>

        {audioIsPlaying && (
          <audio autoPlay={true}>
            <source src={Coin} type="audio/mpeg" />
          </audio>
        )}
      </div>
    );
  }
  if (card?.isUsed) {
    return (
      <div className="coin-card is-used" onClick={(e) => onClick(e, card)}>
        {audioIsPlaying && (
          <audio autoPlay={true}>
            <source src={Coin} type="audio/mpeg" />
          </audio>
        )}
      </div>
    );
  }

  return (
    <div onClick={(e) => onClick(e, card)} className={'coin-card'}>
      {audioIsPlaying && (
        <audio autoPlay={true}>
          <source src={Coin} type="audio/mpeg" />
        </audio>
      )}
    </div>
  );
};
