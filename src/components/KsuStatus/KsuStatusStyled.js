import styled from '@emotion/styled';
import {
	CARD_SHADOW,
	CHOCO,
	ERROR_MAIN,
	PRIMARY_MAIN, STATUS_ACTIVE, STATUS_DRAFT, STATUS_PUBLIC,
	SUCCESS,
	YELLOW_MAIN,
} from '../../constants/colors'
export const EntityStatusMenuStyled = styled.ul`
  padding: 0 10px 10px;
  display: flex;
  text-align: center;
  margin: 0;
`;
export const StatusListStyled = styled.ul`
  padding: 0;
  margin: 0;

  li {
    margin: 0;
    padding: 5px;
    list-style-type: none;
    transition: background-color 0.3s ease-in-out;

    &:hover {
      cursor: pointer;
      background: rgba(163, 147, 103, 0.5)
        linear-gradient(transparent, rgba(255, 255, 255, 0.8));
    }
  }

  .title {
    font-family: Comfortaa, sans-serif;
    color: ${CHOCO};
    font-size: 1.4rem;
    text-align: left;
    font-weight: 700;
  }
  .description {
    font-family: Comfortaa, sans-serif;
    color: ${CHOCO};
    font-size: 1rem;
    text-align: left;
    font-weight: 300;
  }
`;

export const KsuStatusStyled = styled.span`
  margin: 0 5px;
  font-size: 14px;
  padding: 12px 40px;
  border-bottom-right-radius: 30px;
  border-bottom-left-radius: 30px;
  font-family: Comfortaa, sans-serif;
  color: white;
	font-weight: 700;
  display: inline-block;
  text-transform: uppercase;
  background: ${CHOCO};
	
	&.action-button {
		padding: 5px 10px;
		border-radius: 10px;
		text-transform: none;
		text-shadow: ${CARD_SHADOW};
		box-shadow: ${CARD_SHADOW};
	}
	
	&.draft {
		background: ${STATUS_DRAFT};
	}
	
	&.active {
		background: ${STATUS_ACTIVE};
	}
	
	&.public {
		background: ${STATUS_PUBLIC};
	}
	
	&.waiting {
		background: ${YELLOW_MAIN};
	}
`;
