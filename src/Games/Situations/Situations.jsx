import { useEffect, useState } from 'react';
import clsx from 'clsx';
import './Situations.css';
import { Card } from './components/Card';
import data from './data.json';
import Udar from './assets/sounds/hit-effekt-quotstrela-smertiquot-25207.mp3';
import { Col, Row } from 'antd';

function Situations() {
  const [cards, setCards] = useState(data);
  const [hammerIsActive, setHammerIsActive] = useState(false);
  const [selectedCardPosition, setSelectedCardPosition] = useState({
    x: 0,
    y: 0,
  });
  const [audioIsPlaying, setAudioIsPlaying] = useState(false);

  useEffect(() => {
    setAudioIsPlaying(hammerIsActive);
  }, [hammerIsActive]);

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

  const onCardClick = (e, card) => {
    const activeCardIndex = cards?.findIndex((el) => card.id === el.id);
    const updatedCards = [...cards];
    updatedCards[activeCardIndex] = {
      ...updatedCards[activeCardIndex],
      isActive: !updatedCards[activeCardIndex].isActive,
    };
    setCards(updatedCards);
  };

  const onAlertClick = (e, card) => {
    const activeCardIndex = cards?.findIndex((el) => card.id === el.id);
    const updatedCards = [...cards];

    updatedCards[activeCardIndex] = {
      ...updatedCards[activeCardIndex],
      isUsed: !updatedCards[activeCardIndex].isUsed,
    };
    setHammerIsActive(true);
    animationTimeout = setTimeout(() => {
      setCards(updatedCards);
      setHammerIsActive(false);
    }, 1900);
    const rect = e.currentTarget.getBoundingClientRect();
    setSelectedCardPosition({ x: rect.left, y: rect.top });
  };

  return (
    <div className="situations">
        <Row>
          {cards.map((el) => (
            <Col width={4}>
              <Card
                key={el.id}
                card={el}
                onClick={onCardClick}
                alertClick={onAlertClick}
              />
            </Col>
          ))}
        </Row>
      <div
        // style={{
        //   top: `${selectedCardPosition.y - 100}px`,
        //   left: `${selectedCardPosition.x}px`,
        // }}
        className={clsx({
          'hammer-holder': true,
          active: hammerIsActive,
        })}>
        <div className={clsx({ hammer: true, active: hammerIsActive })} />
      </div>

      {audioIsPlaying && (
        <audio autoPlay={true}>
          <source src={Udar} type="audio/mpeg" />
        </audio>
      )}
    </div>
  );
}

export default Situations;
