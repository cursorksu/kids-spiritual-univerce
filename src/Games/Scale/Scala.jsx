import React, { useEffect, useMemo, useState } from 'react';
import './Scala.scss';
import data from './data.json';
import Coin from './assets/sounds/coin.mp3';
import Skrip from './assets/sounds/skrip.mp3';
import { ScalaPlank } from './components/ScalaPlank';

function Scala() {
  const [cards, setCards] = useState([]);
  const [audioIsPlaying, setAudioIsPlaying] = useState(false);
  const [isEval, setIsEval] = useState(4);
  const [scalaIsActive, setScalaIsActive] = useState(false);

  useEffect(() => {
    const randomIndices = createRandomArray();
    setCards(randomIndices.map((index) => data[index]));

    return () => {
      clearTimeout(animationTimeout);
    };
  }, []);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const createRandomArray = () => {
    const numbers = Array.from({ length: 12 }, (_, index) => index);
    return shuffleArray(numbers);
  };

  let animationTimeout;
  useEffect(() => {
    const cardIndices = shuffleArray(
      Array.from({ length: data.length }, (_, i) => i)
    );
    setCards(cardIndices.map((index) => data[index]));
  }, []);

  useEffect(() => {
    animationTimeout = setTimeout(() => {
      audioIsPlaying && setAudioIsPlaying(false);
    }, 1500);

    animationTimeout = setTimeout(() => {
      scalaIsActive && setScalaIsActive(false);
    }, 400);
  }, [audioIsPlaying]);

  const cardsLeft = useMemo(() => cards.slice(0, cards.length / 2), [cards]);
  const cardsRight = useMemo(() => cards.slice(cards.length / 2), [cards]);
  const onCardClick = (e, card) => {
    e.stopPropagation();
    const activeCardIndex = cards?.findIndex((el) => card.id === el.id);
    const updatedCards = [...cards];
    updatedCards[activeCardIndex] = {
      ...updatedCards[activeCardIndex],
      isActive: !updatedCards[activeCardIndex].isActive,
    };
    setAudioIsPlaying(true);
    setCards(updatedCards);
  };

  const onAlertClick = (e, card, isGood) => {
    e.stopPropagation();
    animationTimeout = setTimeout(() => {
      setScalaIsActive(true);
    }, 1500);
    setIsEval((prev) => {
      if (isGood) {
        return prev + 1;
      } else {
        return prev - 1;
      }
    });
    setCards(
      cards.map((el) => {
        if (el.id === card.id) {
          return {
            ...el,
            isActive: false,
            isUsed: true,
          };
        } else {
          return {
            ...el,
            isActive: false,
          };
        }
      })
    );
  };

  return (
    <div className="scala">
      <div className="coins">
        {cardsLeft.map((el) => (
          <ScalaPlank
            key={el.id}
            card={el}
            onClick={onCardClick}
            alertClick={onAlertClick}
          />
        ))}
      </div>
      <div>
        <div className="center" />
        <div
          className={`caps ${scalaIsActive && 'is-active'}`}
          // style={{
          //   transform: `rotate(${-isEval}deg) translate(-50%, 0)`,
          //   transition: 'transform 2s',
          // }}
        />
      </div>
      <div className="coins">
        {cardsRight.map((el) => (
          <ScalaPlank
            key={el.id}
            card={el}
            onClick={onCardClick}
            alertClick={onAlertClick}
          />
        ))}
      </div>
      {scalaIsActive && (
        <audio autoPlay={true}>
          <source src={Skrip} type="audio/mpeg" />
        </audio>
      )}
      {audioIsPlaying && (
        <audio autoPlay={true}>
          <source src={Coin} type="audio/mpeg" />
        </audio>
      )}
    </div>
  );
}

export default Scala;
