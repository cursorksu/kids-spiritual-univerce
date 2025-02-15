import styled from '@emotion/styled';
import {
  BOX_SHADOW,
  CHOCO,
  GOLD,
  SUCCESS,
  YELLOW_MAIN,
} from '../constants/colors';

export const NotificationStyled = styled.div`
  max-width: 30%;
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 9999;
  background: white;
  text-align: center;
  color: #fff;
  font-weight: 700;
  font-family: Comfortaa, sans-serif;
  font-size: 1.2rem;
  border-radius: 4px;

  &:after {
    border-radius: 10px;
    position: absolute;
    top: 6px;
    right: 6px;
    left: 6px;
    bottom: 6px;
    content: '';
    z-index: 1;
  }
  span {
    color: ${CHOCO};
  }

  &.open {
    padding: 20px;
    border: 2px solid transparent;
  }

  &.error {
    background: ${YELLOW_MAIN};
  }
  &.success {
    background: ${SUCCESS};
  }
  &.info {
    background: ${GOLD};
  }
`;
