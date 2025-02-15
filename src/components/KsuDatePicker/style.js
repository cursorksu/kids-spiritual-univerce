import styled from '@emotion/styled';
import { CHOCO, PRIMARY_MAIN, VEREM_GOLD } from '../../constants/colors';

export const DatePickerStyled = styled('div')`
  min-width: 100%;
  position: relative;

  .icon {
    position: absolute;
    top: 50%;
    left: 12px;
    transform: translateY(-50%);
    display: inline-block;
    width: 20px;
    height: 20px;
    color: ${VEREM_GOLD};
    z-index: 10;

    svg {
      display: inline-block;
      width: 100%;
      height: 20px;
    }
  }

  .react-datepicker__input-container,
  .react-datepicker-wrapper {
    display: block;
    width: 100% !important;
  }

  input {
      width: 100%;
      border-radius: 40px;
      padding: 5px 12px 5px 40px;
      border: 1px solid ${VEREM_GOLD};
      height: 40px;
      line-height: 40px;
      font-family: Comfortaa, sans-serif;
      font-weight: 400;
      font-size: 1.2rem;
      color: ${CHOCO};
    
      &:focus {
        border: 1px solid ${VEREM_GOLD};
        outline: 2px solid ${VEREM_GOLD}; /* Золотистый outline при фокусе */
        outline-offset: 4px; /* Отступ для эстетичности */
      }
    &::placeholder {
      font-family: Comfortaa, sans-serif;
      font-weight: 400;
      font-size: 16px;
    }
  }
`;
