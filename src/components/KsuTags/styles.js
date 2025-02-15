import styled from '@emotion/styled';
import { BG_GOLD, CHOCO, CREAM, HOVER_GOLD, PRIMARY_MAIN, VEREM_GOLD } from '../../constants/colors';

export const KsuTagsStyled = styled.div`
  .tags-input-container {
    padding: 5px 12px;
    border-radius: 30px;
    min-width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 3px;
    min-height: 36px;
    font-size: 1.2rem;
    font-family: Comfortaa, sans-serif;
    color: ${CHOCO};
    background: #fff;
    border: 1px solid ${VEREM_GOLD};
    font-weight: 400;

    &.focused {
        border: 1px solid ${VEREM_GOLD};
        outline: 2px solid ${VEREM_GOLD};
        outline-offset: 4px; 
      }
  }

  .tag-item {
    background-color: ${BG_GOLD};
    line-height: 1.2em;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    padding: 3px 3px 3px 9px;
    border-radius: 16px;
    color: ${CHOCO};
  }
  .tag-item .close {
    flex-basis: 20px;
    height: 20px;
    width: 20px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    background-color: ${CHOCO};
    color: ${CREAM};
    border-radius: 50%;
    margin-left: 5px;
    cursor: pointer;
  }

  .tags-input {
    background-color: transparent;
    flex-grow: 1;
    padding: 2px 0;
    border: none;
    outline: none;
    font-size: 1.2rem;
    font-family: Comfortaa, sans-serif;
    color: ${PRIMARY_MAIN};
    font-weight: 300;
  }
`;
