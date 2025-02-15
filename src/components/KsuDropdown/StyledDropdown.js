import styled from '@emotion/styled';
import { BG_GOLD, CHOCO, PRIMARY_MAIN, VEREM_GOLD } from '../../constants/colors';

export const StyledDropdown = styled('div')`
  .ui.dropdown .menu .item .image,
  .ui.dropdown .menu .item img,
  .ui.dropdown .text .image,
  .ui.dropdown .text img {
    margin-top: -10px;
    margin-bottom: 0;
    min-width: 40px;
    min-height: 40px;
  }
  
  .ui.multiple.search.dropdown > .text {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 10px;
  }

  input {
    border: none;
  }
  .dropdown.fluid {        
    width: 100%;
    border-radius: 40px;
    padding: 0 12px;
    border: 1px solid ${VEREM_GOLD};
    background: #fff;
    font-family: Comfortaa, sans-serif;
    font-weight: 400;
    font-size: 1.2rem;
    color: ${CHOCO};
    
    &:focus {
      border: 1px solid ${VEREM_GOLD};
      outline: 2px solid ${VEREM_GOLD};
      outline-offset: 4px; 
    }

    .text {
      color: ${CHOCO};
      font-weight: 400;
      font-size: 1.2rem;
    }

    & > .text {
      width: 100%;
      line-height: 40px;

      & > * {
        display: inline-block;
      }

      .avatar {
        min-width: 40px !important;
        max-width: 40px !important;
        width: 40px !important;
        height: 40px !important;
      }
    }
  }
  .ui.dropdown>.delete.icon, .ui.dropdown>.dropdown.icon, .ui.dropdown>.search.icon {
    position: absolute;
    top: 12px;
    right: 20px;
    display: inline-block;
    font-size: 20px;
    color: ${VEREM_GOLD};
    z-index: 10;

    svg {
      display: inline-block;
      width: 20px;
      height: 20px;
    }
  }

  .ui.multiple.dropdown > .label {
    box-shadow: none;
  }

  .ui.dropdown .menu {
    top: 140%;
    width: 100%;
  }

  .ui.active.dropdown .menu:hover,
  .ui.active.dropdown .menu,
  .ui.dropdown .menu,
  .ui.active.dropdown:hover,
  .ui.active.dropdown,
  .ui.dropdown {
    box-shadow: none;
    border: 1px solid ${VEREM_GOLD} !important;
    border-radius: 30px !important;
  }
  .ui.label {
    border: 1px solid ${VEREM_GOLD};
    background-color: ${BG_GOLD};
    width: 80%;
    position: relative;
    transition: background-color 0.3s ease-in-out;
    grid-template-columns: 40px auto;
    grid-gap: 10px;
    padding-right: 15px;
    border-radius: 40px;
    box-shadow: none;

    .ksu-option {
      color: ${CHOCO};
    }

    .description {
      display: none;
    }

    &:hover {
      border: 1px solid ${PRIMARY_MAIN};
      background-color: transparent;
    }

    .icon {
      position: absolute;
      right: 10px;
      top: 12px;
      color: ${VEREM_GOLD};
      width: 20px;
      height: 20px;
      z-index: 0;
      
      &:hover {
        color: ${PRIMARY_MAIN}
      }
    }
  }

  .dropdown.selection {
    width: 100%;
    border-radius: 30px;
    padding: 5px 32px 5px 10px;
    border: 1px solid ${VEREM_GOLD};
    min-height: 40px;
    line-height: 40px;
    font-family: Comfortaa, sans-serif;
    font-weight: 400;
    color: ${CHOCO};

    &:hover {
      border-color: ${VEREM_GOLD};
      box-shadow: none;
      transition: background-color 0.3s ease-in-out;
    }
    &:focus-visible {
        outline: 2px solid ${VEREM_GOLD}; /* Золотистый outline при фокусе */
        outline-offset: 4px; /* Отступ для эстетичности */
    }

    &::placeholder {
      font-family: Comfortaa, sans-serif;
      font-weight: 300;
      font-size: 16px;
      padding-left: 20px;
    }

    .text {
      padding: 0 0 0 10px;
    }

    .ksu-option {
      overflow: hidden;
      line-height: 1.5;

      .description {
        color: ${PRIMARY_MAIN};
        font-weight: 300;
        font-size: 1.2rem;
      }

      div {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    a:after {
      content: none !important;
    }
    .label {
      max-width: 260px;
      display: inline-block !important;
      padding-right: 30px;

      &:after {
        content: none;
      }
    }
  }
`;
