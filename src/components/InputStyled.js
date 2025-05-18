import styled from '@emotion/styled';
import {BORDER_GRAY, CHOCO, ERROR_MAIN, PRIMARY_MAIN, VEREM_GOLD} from '../constants/colors'

export const FormStyled = styled.div`
  margin: 10px 0;
`;
export const FormFieldStyled = styled.div`
  margin: 14px 0;
`;
export const LabelStyled = styled.label`
    color: ${VEREM_GOLD};
    margin-bottom: 8px;
    padding: 0;
    background: transparent;
    font-family: Comfortaa, sans-serif;
    font-weight: 600;
    font-size: 14px;
    display: block;
    &.inline {
      display: inline-block;
    }
`;
export const InputErrorStyled = styled.p`
	color: ${ERROR_MAIN};
	font-size: 12px;
	font-weight: 700;
	margin-top: 6px;
	`;


export const InputFieldStyled = styled.div`
  width: 100%;
  display: block;
  font-family: Comfortaa, sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: ${VEREM_GOLD};
  margin-bottom: 10px;
	
	&.required {
		position: relative;
		
		&:after {
			content: '*';
			font-size: 28px;
			position: absolute;
			top: 0;
			right: 0;
		}
	}

  .label,
  label {
    color: rgba(0, 0, 0, 0.6);
  }
`;

export const InputStyled = styled.input`
  width: 100%;
  border-radius: 20px;
  padding: 5px 12px;
  border: 1px solid ${VEREM_GOLD};
  height: 40px;
  line-height: 40px;
  font-family: Comfortaa, sans-serif;
  font-weight: 400;
  font-size: 18px;
  color: ${CHOCO};

  &:focus {
    border: 1px solid ${VEREM_GOLD};
    outline: 2px solid ${VEREM_GOLD};
    outline-offset: 4px; 
  }
	
	&::placeholder {
		font-size: 16px;
		font-weight: 300;
		color: ${BORDER_GRAY};
	}
`;

export const TextareaAutosizeStyled = styled.textarea`
  border: 1px solid ${PRIMARY_MAIN};
  resize: vertical;
  cursor: pointer;
  font-family: Comfortaa, sans-serif;
  font-weight: 400;
  font-size: 1.2rem;
  line-height: 1.5rem;
  min-height: 270px;
  color: ${CHOCO};
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 20px;
  padding: 20px;
  display: block;
  width: 100%;

  &:focus,
  &:focus-visible {
    border: 1px solid ${VEREM_GOLD};
    outline: 2px solid ${VEREM_GOLD};
    outline-offset: 4px;
  }
`;
