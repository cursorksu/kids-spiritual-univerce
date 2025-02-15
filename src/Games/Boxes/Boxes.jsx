import { BoxesStyled, GameScoreStyled } from './BoxesStyled';
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { ReloadIcon } from '../../assets/ReloadIcon.jsx';
import clsx from 'clsx';
import { VeremLayout } from '../../pages/VeremLayout.jsx';

export const Boxes = () => {
  const isMenuCollapsed = useSelector((store) => store.mainMenuCollapsed);
  const { lesson } = useSelector((state) => state.lessonData);
  const [score] = useState(0);
  const [correctSound, setCorrectSound] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!lesson) navigate(-1);
  }, [lesson, navigate]);

  const musicRef = useRef(null);

  useEffect(() => {
    if (correctSound) {
      musicRef.current = setTimeout(() => {
        setCorrectSound(false);
      }, 1500);
    }

    return () => {
      clearTimeout(musicRef.current);
    };
  }, [correctSound]);
  const [game, setGame] = useState([]);
  useEffect(() => {
    const gameData = lesson?.memory
      ? lesson.memory
        .find((el) => el.id === 'boxes')
        ?.settings.map((el) => ({ ...el, box: 'close' }))
      : [];
    setGame(gameData);
  }, [lesson]);

  const reloadHandler = () => {};

  const handleBoxClick = (el) => {
    const newDataGame = game.map((item) =>
      item.id === el.id
        ? {
          ...item,
          box: 'opening',
        }
        : item
    );

    setGame(newDataGame);
  };

  return (
    <VeremLayout>
      <BoxesStyled>
        <GameScoreStyled isMenuCollapsed={isMenuCollapsed}>
          <h1 className="score">Бали: {score}</h1>
          <div className="reload-button" role="button" onClick={reloadHandler}>
            <ReloadIcon />
          </div>
        </GameScoreStyled>

        <ul className="question-list">
          {game?.map((el) => (
            <li onClick={() => handleBoxClick(el)}>
              <div
                className={clsx({
                  close: el.box === 'close',
                  opening: el.box === 'opening',
                  open: el.box === 'open',
                })}
              />
              <div className="question-item">{el.question}</div>
            </li>
          ))}
        </ul>
        {correctSound && (
          <audio autoPlay={true}>
            <source
              src="https://firebasestorage.googleapis.com/v0/b/lessons-ksu.appspot.com/o/sounds%2FcorrectSound.mp3?alt=media&token=dd985855-cdb5-40cd-9f1b-18543f5072e2"
              type="audio/mpeg"
            />
            Your browser does not support the audio element.
          </audio>
        )}
      </BoxesStyled>
    </VeremLayout>
  );
};
