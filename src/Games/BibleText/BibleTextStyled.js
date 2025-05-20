import styled from '@emotion/styled';
import { NEON, NEON_HOVER, NEON_INNER } from '../../constants/colors';
export const BibleTextLink = styled('button')`
  cursor: pointer;
  background-image: url('https://firebasestorage.googleapis.com/v0/b/lessons-ksu.appspot.com/o/static%2F%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202024-05-16%20%D0%B2%2015.53.13.png?alt=media&token=925fa405-957e-4fee-823f-9b9f1a3d6ad8');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  width: 120px;
  height: 120px;
  border-radius: 20px;
  margin-right: 20px;
  border: none;
`;

export const GameScoreStyled = styled('section')`
  background-color: #053b69;
  width: 100%;
  box-shadow: 0 0 25px 25px #000407;
  height: 100px;
  color: #fff;
  transition:
    width 0.3s linear,
    left 0.3s linear;

  .score {
      top: 24px;
      left: 60px;
    text-align: center;
    font-size: 40px;
    font-family: 'Comfortaa', sans-serif;
  }

  .quote {
    position: absolute;
    left: 40px;
    top: 40px;
    font-size: 40px;
    font-family: 'Comfortaa', sans-serif;
    font-weight: 600;
  }

  .reload-button {
    cursor: pointer;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    position: absolute;
    top: 10px;
    right: 40px;
    box-shadow: ${NEON};
    transition: box-shadow 0.3s ease-in-out;

    &:hover {
      box-shadow: ${NEON_HOVER};
    }

    svg {
      width: 80px;
      height: 80px;
    }
  }
`;

export const BibleTextSettingsStyled = styled('section')`
  .action-wrapper {
    margin-top: 20px;
  }
`;

export const BibleTextStyled = styled('section')`
  background-image: url('https://firebasestorage.googleapis.com/v0/b/lessons-ksu.appspot.com/o/static%2Fbg_virs.jpg?alt=media&token=53c7bca0-89a4-4e45-87ed-29423382ddac');
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;

  .word {
    float: right;
    padding: 5px 50px 10px;
    border-radius: 60px;
    font-family: 'Comfortaa', sans-serif;
    line-height: 1;
    background-color: #053b69;
    border: 2px solid rgba(0, 255, 255, 0.5);
    box-shadow: ${NEON_INNER};
    margin: 5px;
    color: #fff;
    font-size: 36px;
    font-weight: 700;

    &.quote {
      display: block;
      margin: 20px 0;
    }
  }

  .empty {
    min-height: 55px;
    min-width: 200px;
    position: relative;

    &:after {
      content: '.....';
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 10;
    }
  }

  .answer-group-bible-tex {
    white-space: pre-wrap;
    padding: 40px;
    height: 30vh;
    text-align: center;
    position: relative;
    background: rgba(0, 0, 0, 0.4);

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 1px;
      border-top: 1px solid rgba(0, 255, 255, 0.5);
      box-shadow: ${NEON_HOVER};
    }
  }
  .question-group {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: wrap;
    white-space: pre-wrap;
    padding: 160px 40px 40px;
    height: 70vh;
    text-align: left;
  }
`;
