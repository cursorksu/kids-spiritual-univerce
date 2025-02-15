import styled from '@emotion/styled';
import { BG_GOLD, CREAM, VEREM_GOLD } from '../constants/colors'

export const ButtonStyled = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(90deg, #f0c674, ${VEREM_GOLD}, ${VEREM_GOLD}, #f0c674);
  background-size: 200%;
  color: white;
  font-family: Comfortaa, sans-serif;
  font-size: 14px;
  font-weight: bold;
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background 3s ease, box-shadow 0.3s ease;
  box-shadow: 0 0 0 rgba(0, 0, 0, 0.2);

  &:hover {
    animation: slow-shine 3s infinite linear;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }
  
  &:not(:first-of-type) {
    margin-left: 20px;
  }
  
  svg {
    width: 20px;
    height: 20px;
    display: inline-block;
    margin: 0 10px 0 0;
  }
  
  &.secondary {
    background: transparent;
    color: ${VEREM_GOLD};
    
    &:hover {
       box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }
  }
  
  &:focus {
    outline: 2px solid ${VEREM_GOLD};
    outline-offset: 4px;
    box-shadow: none;
  }

  &:active {
    outline: 2px solid ${VEREM_GOLD};
  }
  
    
  &:disabled {
      background: ${BG_GOLD};
      cursor: not-allowed;
      
      &:hover {
        box-shadow: none;
      }
      &:focus {
        outline: none;
        outline-offset: 0;
      }
  }

  @keyframes slow-shine {
    0% {
      background-color: linear-gradient(90deg, #f0c674, ${VEREM_GOLD}, ${VEREM_GOLD}, #f0c674);
      background-position: 0% 0%;
    }
    100% {
      background-color: linear-gradient(90deg, #f0c674, ${VEREM_GOLD}, ${VEREM_GOLD}, #f0c674);
      background-position: 200% 200%;
    }
  }
`;

export const ButtonIconStyled = styled(ButtonStyled)`
  padding: 0;
  width: 38px;
  height: 38px;
  display: inline-flex;
  color: ${CREAM};
	border-radius: 50%;
	margin-left: 7px !important;
	background-color: ${VEREM_GOLD};
	white-space: nowrap;
  justify-content: center;
  align-items: center;
  
  svg {
    margin: 0;
  }
  
  &:hover {
	  box-shadow: none;
    animation: slow-shine 2s infinite linear;
  }
`;

export const ButtonIconMiniStyled = styled(ButtonIconStyled)`
  width: 20px;
  height: 20px;
  transition: translate  2s ease;
	background: transparent;
	color: ${VEREM_GOLD};
  
  &:not(:first-of-type) {
    margin-left: 10px;
  }
  
   &:hover {
      transform: scale(1.1);
  }
  
  &.close {
    position: absolute;
    top: 10px;
    right: 10px;
  }
`;
