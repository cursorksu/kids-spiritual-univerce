import styled from '@emotion/styled'
import { CHOCO, CREAM, VEREM_GOLD } from '../../constants/colors'

export const FooterStyles = styled('div')`
	width: 100%;
	height: 340px;
	background-color: ${CHOCO};
	background-size: 350px 350px;
	background-repeat: no-repeat;
	background-position: left -40px bottom -50px;
	background-image: url('https://firebasestorage.googleapis.com/v0/b/lessons-ksu.appspot.com/o/static%2Ftulep.png?alt=media&token=96d3f024-5df8-4e82-80ca-049f306701a0');
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-gap: 60px;
	padding: 20px 100px;
	
	label, span, p, div, li, a {
		color: ${CREAM} !important;
		font-weight: 600;
		font-size: 14px;
		text-align: center;
		font-family: 'Comfortaa', sans-serif;
	}
`;

export const BottomNavigationStyled = styled('div')`
	ul {
		margin: 0;
		padding: 0;
	}
	
	li {
		padding: 0;
		margin: 0;
		list-style-type: none;
		font-size: 18px;
		font-weight: 600;
		text-align: right;
		line-height: 32px;
		letter-spacing: 1px;
		position: relative;
		
		a {
			position: relative;
			text-decoration: none;
		}
		
		& a:after {
			content: '';
			position: absolute;
			bottom: -6px;
			width: 0;
			left: 0;
			right: 0;
			height: 1px;
			background: ${CREAM};
			transition: width 0.3s ease;
		}
		
		& a:hover {
			&:after {
				width: 100%;
			}
		}
	}
	
	.network-buttons {
		margin-top: 60px;
		display: grid;
		color: ${CREAM};
		gap: 20px;
		grid-template-columns: 4fr 1fr 1fr 1fr;
		
		button {
			width: 36px;
			height: 36px;
			svg {
				width: 36px;
				height: 36px;
			}
		}
	}
	`;
export const DonationStyled = styled('div')`
	label, span, p, div {
		color: #fff;
		font-weight: 600;
		text-align: center;
		font-family: 'Comfortaa', sans-serif;
	}
	
	.donation-buttons {
		width: 100%;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-gap: 20px;
		
		&:last-child {
			display: flex;
			justify-content:  space-between;
			align-items: flex-end;
			grid-gap: 20px;
			
			button, input, div {
				margin: 0;
			}
		}
		
		label {
			color: ${CREAM};
		}
		
		button {
			width: 100% !important;
			font-weight: 700 !important;
			font-size: 18px;
			margin: 0 0 6px 0;
			
			&.active {
				outline: 2px solid ${VEREM_GOLD};
				outline-offset: 4px;
				box-shadow: none;
			}
		}
	}
`;