import styled from '@emotion/styled';

export const LoaderStyled = styled('div')`
  min-height: 300px;
  min-width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  box-shadow: none;

  .puzzle {
    width: 40px;
    height: 40px;
    overflow: visible;
    position: relative;
    background: transparent;
    -webkit-animation: rotate-scale-up 4s ease-out infinite both;
    animation: rotate-scale-up 4s ease-out infinite both;
  }

  svg {
    position: absolute;
    width: 40px;
    height: 40px;

    &:nth-of-type(1) {
      top: 0;
      left: 0;
      -webkit-animation: slide-tl 2s ease-out infinite alternate both;
      animation: slide-tl 2s ease-out infinite alternate both;
    }

    &:nth-of-type(2) {
      top: 0;
      right: 0;
      -webkit-animation: slide-tr 2s ease-out infinite alternate both;
      animation: slide-tr 2s ease-out infinite alternate both;
    }

    &:nth-of-type(3) {
      bottom: 0;
      left: 0;
      -webkit-animation: slide-br 2s ease-out infinite alternate both;
      animation: slide-br 2s ease-out infinite alternate both;
    }

    &:nth-of-type(4) {
      bottom: 0;
      right: 0;
      -webkit-animation: slide-bl 2s ease-out infinite alternate both;
      animation: slide-bl 2s ease-out infinite alternate both;
    }
  }
`;
