import styled from '@emotion/styled';
import { NEON, NEON_HOVER } from '../../constants/colors';
export const BoxesTextLink = styled('button')`
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
  width: ${({ isMenuCollapsed }) =>
    `calc(100% - ${isMenuCollapsed ? 80 : 250}px)`};
  box-shadow: 0 0 25px 25px #000407;
  position: absolute;
  top: 0;
  left: ${({ isMenuCollapsed }) => (isMenuCollapsed ? 80 : 250 + 'px')};
  right: 0;
  height: 100px;
  margin-bottom: 100px;
  color: #fff;
  transition:
    width 0.3s linear,
    left 0.3s linear;

  .score {
    text-align: center;
    font-size: 60px;
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

export const BoxesSettingsStyled = styled('section')`
  display: grid;
  grid-template-columns: 30% 1fr;
  grid-gap: 40px;

  .test-question {
    display: grid;
    grid-template-columns: 1fr 40px;
    grid-gap: 40px;
    align-items: end;
  }
`;

export const BoxesStyled = styled('section')`
  height: 100vh;
  padding-top: 150px;
  background: #083752;

  .question-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    width: 100%;
    height: calc(100vh - 150px);
  }

  li > div {
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;
    border-top-right-radius: 40px;
    border-top-left-radius: 40px;
    width: 100%;
    height: 160px;

    &.close {
      background-image: url('https://firebasestorage.googleapis.com/v0/b/lessons-ksu.appspot.com/o/static%2F%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202024-05-16%20%D0%B2%2018.40.39.png?alt=media&token=e5715071-50a2-4e79-9b4f-81b0aa398826');
    }
    &.opening {
      background-image: url('https://firebasestorage.googleapis.com/v0/b/lessons-ksu.appspot.com/o/static%2F%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202024-05-16%20%D0%B2%2015.53.13.png?alt=media&token=925fa405-957e-4fee-823f-9b9f1a3d6ad8');
    }
    &.open {
      background-image: url('https://firebasestorage.googleapis.com/v0/b/lessons-ksu.appspot.com/o/static%2F%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202024-05-16%20%D0%B2%2015.53.13.png?alt=media&token=925fa405-957e-4fee-823f-9b9f1a3d6ad8');
    }
  }

  .empty {
    min-height: 74px;
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
