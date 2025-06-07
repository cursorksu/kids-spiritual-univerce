import styled from '@emotion/styled';
import { CHOCO, CREAM } from '../../constants/colors'

export const ChurchesListStyled = styled('div')`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  padding: 20px;
`;

export const ContentStyled = styled.div`
	color: ${CREAM};
	height: 200px;
	overflow: hidden;
	background-image: url(${props => props.img});
	background-size: 130%;
	background-repeat: no-repeat;
	background-position: center center;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	cursor: pointer;
	flex-direction: column;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	transition: all 0.6s ease;
	
	&:hover {
		background-size: 200%;
	}
	
	& > * {
		position: relative;
		z-index: 2;
	}
	
	&:after {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.4);
		backdrop-filter: blur(3px);
		z-index: 0;
	}
	
	.logo {
		width: 60px;
		height: 60px;
		object-fit: contain;
		display: block;
		margin-bottom: 20px;
		margin-top: 20px;
	}
	
	h3 {
		font-size: 20px;
		letter-spacing: 2px;
		max-width: 90%;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		margin-bottom: 5px !important;
		text-transform: uppercase;
	}
	
	.meta {
		font-size: 12px;
		font-weight: 600;
		letter-spacing: 1.5px;
		width: 90%;
		text-transform: uppercase;
		text-align: center;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		height: 20px;
		margin: 0;
	}
	`;
export const ChurchItemStyled = styled('div')`
  width: 100%;
  height: 200px;
  position: relative;
  background-color: ${CHOCO};
  border-radius: 4px;
  overflow: hidden;
	
	.footer {
		background: #000;
		line-height: 30px;
		color: #fff;
		font-size: 18px;
		font-family: 'Comfortaa', sans-serif;
		font-weight: 400;
		text-align: center;
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
	}
	
   .action {
     position: absolute;
     top: 5px;
     right: 5px;
     z-index: 10;
     display: flex;
   }
`;
