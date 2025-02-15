import styled from '@emotion/styled';
import { GOLD } from '../../constants/colors';

export const DndItemStyled = styled.li`
  list-style-type: none;
  background: transparent;
  overflow: visible;
  position: relative;
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .input {
    flex-basis: calc(100% - 50px);
    width: calc(100% - 50px);
    position: relative;
    margin-right: 20px;

    &:after {
      content: '';
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: ${GOLD};
      display: block;
      box-shadow:
        0 -11px ${GOLD},
        0 11px ${GOLD};
      margin: -3px auto;
      position: absolute;
      right: -12px;
      top: 50%;
    }
  }
`;
