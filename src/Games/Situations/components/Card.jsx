import './Card.css';
import FamilyImage from '../assets/images/family.com.png';
import BoyImage from '../assets/images/boy.com.png';
import JesusImage from '../assets/images/jesus.com.png';
import Udar from '../assets/sounds/gluhoy-udar.mp3';
import Glass from '../assets/sounds/steklo-priglushennyiy-udar.mp3';
import Glasses from '../assets/sounds/gromkiy-zvuk-tseloy-kuchi-razbitogo-stekla.mp3';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

export const Card = ({ card, onClick, alertClick }) => {
  const [audioIsPlaying, setAudioIsPlaying] = useState(false);

  useEffect(() => {
    setAudioIsPlaying(card.isUsed);
  }, [card]);

  if (!card.isActive) {
    return <div className="card" onClick={(e) => onClick(e, card)} />;
  }

  return (
    <div
      className={clsx({
        card: true,
        'is-active': card.isActive,
        'is-used': card.isUsed,
      })}>
      {card.status === 1 && (
        <div className="card-img">
          <img src={FamilyImage} alt="img" />
          {audioIsPlaying && (
            <audio autoPlay={true}>
              <source src={Glasses} type="audio/mpeg" />
            </audio>
          )}
        </div>
      )}

      {card.status === 2 && (
        <div className="card-img">
          <img src={BoyImage} alt="img" />
          {audioIsPlaying && (
            <audio autoPlay={true}>
              <source src={Glass} type="audio/mpeg" />
            </audio>
          )}
        </div>
      )}
      {card.status === 3 && (
        <div className="card-img">
          <img src={JesusImage} alt="img" />
          {audioIsPlaying && (
            <audio autoPlay={true}>
              <source src={Udar} type="audio/mpeg" />
            </audio>
          )}
        </div>
      )}
      {card.isUsed && card.status !== 3 && <div className="broken-glass" />}
      <div className="card-text">
        {card.text}
        <span className="alert" onClick={(e) => alertClick(e, card)}>
          {card.status === 1 && 'Демонструю на зовні'}
          {card.status === 2 && 'Залишаю в собі'}
          {card.status === 3 && 'Пожаліюся Iсусу'}
        </span>
      </div>
    </div>
  );
};
