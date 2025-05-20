import styled from '@emotion/styled';
import {
  CREAM,
  ERROR_MAIN,
  ITEM_BG,
  ITEM_OUTER,
  NEON,
  SUCCESS,
} from '../../constants/colors';

export const SelectedGamesStyled = styled('div')`
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 20px;
  background: ${ITEM_BG};
  display: flex;
  text-align: left;
  border: none;
`;

export const MillionerLink = styled('button')`
  cursor: pointer;
  width: 120px;
  height: 120px;
  background-image: url('https://firebasestorage.googleapis.com/v0/b/lessons-ksu.appspot.com/o/static%2Fpngegg.png?alt=media&token=139b4be5-a7b8-461b-a558-5f4c4416292d');
  background-size: contain;
  background-color: #000407;
  border-radius: 20px;
  border: none;
  opacity: 0.8;
  transition: opacity 0.3s ease-in-out;
  margin-right: 20px;

  &:hover {
    opacity: 1;
  }

  &:disabled {
    opacity: 0.4;
  }
`;
export const GameSlideStyled = styled('div')`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 140px;
  margin-left: -100%;
  padding: 60px;
  transition: margin-left 0.3s ease-in-out;
  width: 90%;
  

  &.visible {
    margin-left: 0;
  }

  .mic-content {
    font-size: 36px;
  }
  & > .mic {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
    font-style: normal;
   
  }

  .question {
    font-family: "Comfortaa", sans-serif;
    color: #fff;
    font-weight: 700;
    margin: 20px 0 40px;

    .answer {
      height: auto;
      padding: 80px 30px 30px;
      margin: auto;
      font-size: 36px;
      position: relative;
      max-width: 90%;

      &::after,
      &::before {
        content: none;
      }
    }
  }

  .answer {
    font-family: "Comfortaa", sans-serif;
    background-color: #053b69;
    border: 2px solid rgba(0, 255, 255, 0.5);
    box-shadow: inset 5px -5px 10px rgba(0, 255, 255, 0.5),
    inset -5px 5px 10px rgba(130, 60, 166, 0.5),
    inset 5px -5px 10px rgba(0, 255, 255, 0.5),
    inset -5px 5px 10px rgba(130, 66, 166, 0.5);
    width: 90%;
    display: block;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    height: auto;
    min-height: 100px;
    font-size: 28px;
    display: flex;
    padding: 10px 20px 10px 100px;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    text-align: center;
    line-height: 1.5 !important;
    overflow: visible;

    &.is-excluded {
      opacity: 0;
    }

    .mic {
      position: absolute;
      top: 50%;
      left: -50px;
      transform: translateY(-50%);
    }
  }

  .answer-group {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 40px;
    grid-row-gap: 40px;
    padding: 0;
    margin: 0;
    overflow: visible;

    li {
      margin: 0;
      list-style-type: none;
      position: relative;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;

      &.selected:not(.fact) {
        .answer {
          background: ${ERROR_MAIN};
          box-shadow: ${ITEM_OUTER};
        }
      }

      &.selected.fact {
        .answer {
          background: ${SUCCESS};
        }
      }

      &::before {
        content: none !important;
      }

      &.fact {
        overflow: visible;

        .answer {
          background-color: #fff;
          color: #1a084e;
          text-shadow: 5px -5px 50px rgba(0, 255, 255, 0.5),
          -5px 5px 50px rgba(130, 60, 166, 0.5),
          5px -5px 50px rgba(0, 255, 255, 0.5),
          -5px 5px 50px rgba(130, 66, 166, 0.5);
        }
      }
    }
  }
`;
export const TestGameViewStyled = styled('div')`
    height: 100vh;
    overflow: hidden;
    font-family: "Comfortaa", sans-serif;
    font-weight: 600;
    background-image: url("https://firebasestorage.googleapis.com/v0/b/lessons-ksu.appspot.com/o/static%2FChatGPT%20Image%20May%2021%2C%202025%2C%2012_09_11%20AM.png?alt=media&token=7b7f3d59-68b0-4b05-a388-635b4536159d");
    background-size: 100%;
    color: ${CREAM};
    background-repeat: repeat;
    position: relative;

  .pagination {
    top: 30px;
    z-index: 800 !important;
    max-height: 70px;
    width: auto;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 20px;
    
    button {
      opacity: 0.8;
    }
  }

    .score {
        position: absolute;
    }

    .start-slide {
        display: flex;
        width: 100%;
        height: calc(100vh - 50px);
        justify-content: center;
        align-items: center;
        flex-direction: column;

        h1 {
            font-family: "Comfortaa", sans-serif;
            font-size: 60px;
            font-weight: 700;
            padding-bottom: 60px;
            text-shadow: ${NEON};
            cursor: pointer;
            transition: opacity 0.3s ease-in-out;

            &:hover {
                opacity: 0.7;
            }
        }

        img {
            width: 600px !important;
            height: 60vh !important;
            object-fit: contain !important;
        }
    }

    .hints {
        position: absolute;
        top: 10px;
        right: 60px;
        height: 80px;
        overflow: hidden;
        background-position: center center;
        background-size: 300px;
        background-repeat: no-repeat;
        width: 320px;
        background-image: url("https://firebasestorage.googleapis.com/v0/b/lessons-ksu.appspot.com/o/static%2FLIFELINEs.png?alt=media&token=82eaaf69-d1f1-41b9-8c21-20da50ed15da");

        & > div {
            width: 94px;
            height: 58px;
            border-radius: 50%;
            position: absolute;
            top: 12px;
            z-index: 10;

            &:hover {
                box-shadow: 5px -5px 5px rgba(0, 255, 255, 0.5),
                -5px 5px 5px rgba(130, 60, 166, 0.5),
                5px -5px 5px rgba(0, 255, 255, 0.5),
                -5px 5px 5px rgba(130, 66, 166, 0.5);
            }

            &.used {
                &:after,
                &:before {
                    content: '';
                    width: 8px;
                    height: 80px;
                    border-radius: 4px;
                    background: ${ERROR_MAIN};
                    position: absolute;
                    top: -10px;
                    left: 50%;
                    transform: rotate(60deg);
                }

                &:before {
                    transform: rotate(-60deg);
                }
            }
        }

        & > div:nth-of-type(1) {
            left: 8px;
        }

        & > div:nth-of-type(2) {
            left: 108px;
        }

        & > div:nth-of-type(3) {
            right: 8px;
        }
    }

  .swiper-pagination-bullet {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    width: 40px !important;
    font-weight: 700;
    height: 40px !important;
    color: ${CREAM};
    background: #1a084e;
    box-shadow: inset 5px -5px 10px rgba(0, 255, 255, 0.5),
    inset -5px 5px 10px rgba(130, 60, 166, 0.5),
    inset 5px -5px 10px rgba(0, 255, 255, 0.5),
    inset -5px 5px 10px rgba(130, 66, 166, 0.5);

    &.focused {
      outline: 2px solid ${CREAM};
      outline-offset: 4px;
    }
    &:focus,
    &:active {
      outline: 2px solid ${CREAM};
    }
  }
`;
