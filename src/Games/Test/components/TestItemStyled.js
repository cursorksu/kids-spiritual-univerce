import styled from '@emotion/styled';
import {
  BG_GOLD,
  ERROR_MAIN,
  GOLD,
  PRIMARY_MAIN,
  SUCCESS,
} from '../../../constants/colors';

export const TestWrapperStyled = styled('div')`
  display: grid;
  grid-template-columns: 30% 70%;
  grid-gap: 20px;

  .aside-wrapper {
    border-right: 1px solid ${GOLD};
    padding-right: 20px;
  }
`;

export const TestItemStyled = styled('div')`
  padding-top: 20px;
  display: grid;
  justify-content: stretch;
  align-items: center;
  grid-template-areas:
    'question question'
    'answer0 answer1'
    'answer2 answer3'
    'answer4 answer5'
    'answer6 answer7';

  grid-gap: 30px;

  .test-question {
    grid-area: question;
  }
  .test-answer {
    max-width: 600px;
  }
  .test-answer:nth-of-type(0) {
    grid-area: answer0;
  }
  .test-answer:nth-of-type(1) {
    grid-area: answer1;
  }
  .test-answer:nth-of-type(2) {
    grid-area: answer2;
  }
  .test-answer:nth-of-type(3) {
    grid-area: answer3;
  }
  .test-answer:nth-of-type(4) {
    grid-area: answer4;
  }
  .test-answer:nth-of-type(5) {
    grid-area: answer5;
  }
  .test-answer:nth-of-type(6) {
    grid-area: answer6;
  }
  .test-answer:nth-of-type(7) {
    grid-area: answer7;
  }
  input,
  .remove-handle {
    z-index: 2;
    position: relative;
    font-size: 1.5rem;
  }
  .test-answer,
  .test-question {
    display: grid;
    grid-template-columns: 1fr 60px 40px 40px;
    grid-gap: 10px;
    align-items: center;
    position: relative;

    .input-label {
      font-size: 12px;
      position: absolute;
      top: -26px;
    }
  }
  .is-excluded {
    background: ${PRIMARY_MAIN} !important;
  }
  .checkbox label:after {
    background: ${ERROR_MAIN}
      linear-gradient(transparent, rgba(255, 255, 255, 0.5)) !important;
  }
  .checkbox.checked label:after {
    background: ${SUCCESS}
      linear-gradient(transparent, rgba(255, 255, 255, 0.5)) !important;
  }
`;

export const TestTextStyled = styled('ul')`
  list-style-type: none;
  font-family: 'Comfortaa', sans-serif;
  font-size: 1.2rem;
  font-weight: 300;
  padding: 20px 0 0;

  .test-text-question {
    font-weight: 700;
    line-height: 1.8;
    white-space: pre-wrap;
  }

  .empty-test {
    width: 100%;
    height: 300px;
    border-radius: 4px;
    display: flex;
    font-size: 2rem;
    font-weight: 300;
    color: ${GOLD};
    justify-content: center;
    align-items: center;
    background: ${BG_GOLD};
  }

  .test-item {
    position: relative;
    background: #fff;
    padding-left: 36px;
    display: block;
    margin-bottom: 20px;

    &:hover {
      .drag-handler::before,
      .drag-handler::after {
        background-color: ${PRIMARY_MAIN};
      }
    }

    .drag-handler {
      position: absolute;
      top: 10px;
      left: 0;
      width: 20px;
      height: 20px;
    }

    .drag-handler::before,
    .drag-handler::after {
      content: '';
      position: absolute;
      width: 20px;
      border-radius: 2px;
      height: 4px;
      background-color: ${BG_GOLD};
      transition: background-color 0.3s ease-in-out;
    }

    .drag-handler::before {
      top: 0;
    }

    .drag-handler::after {
      top: 8px;
    }
  }

  ul {
    padding: 10px 0;
    display: grid;
    justify-content: stretch;
    align-items: flex-start;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
    list-style-type: none;

    li {
      display: block;
      white-space: pre-wrap;

      b {
        display: inline-block;
        margin-right: 10px;
      }
    }
  }
`;
