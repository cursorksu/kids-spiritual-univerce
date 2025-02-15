import styled from '@emotion/styled';
import { BG_GOLD, CARD_SHADOW, CHOCO, VEREM_GOLD } from '../constants/colors'

export const InfoBlockStyled = styled.div`
	font-family: Comfortaa, sans-serif;
	font-size: 1.5rem;
	font-weight: 300;
	line-height: 1.5;
	width: 100%;
	padding-bottom: 20px;
	
	.btn-block {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		margin: 20px 0;
	}
	
	.video-wrapper {
		width: 100%;
		height: 56vh;
		border-radius: 20px;
		border: none;
		background: ${BG_GOLD};
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.ksu-wrapper {
		padding: 20px;
		display: grid;
		grid-gap: 20px;
		grid-template-columns: 280px calc(100% - 600px) 280px;
	}

	
	.title-wrapper {
		border-radius: 30px;
		box-shadow: ${ CARD_SHADOW };
		position: relative;
		overflow: hidden;
		padding: 0 12px 0 20px;
		margin-bottom: 20px;
		background: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.image-wrapper {
		border-radius: 30px;
		box-shadow: ${ CARD_SHADOW };
		position: relative;
		overflow: hidden;
		margin-bottom: 20px;
		
		button {
			position: absolute;
			top: 10px;
			right: 10px;
			z-index: 1;
		}
	}
	.ui.checkbox input:checked:focus~label:before,
	.ui.checkbox input ~ label:before {
		border-radius: 6px;
		width: 20px;
		height: 20px;
		border: 1px solid ${ VEREM_GOLD };
		box-shadow: ${ CARD_SHADOW };
		background: #fff;
	}
	
	.ui.checkbox input:checked ~ label:after {
		color: ${ VEREM_GOLD };
		width: 20px;
		height: 20px;
	}
	
	img {
		width: 280px;
		height: 280px;
		object-fit: cover;
	}

	.lesson-content-wrapper {
		background: #fff;
		padding: 20px;
		font-size: 16px;
		box-shadow: ${ CARD_SHADOW };
		border-radius: 20px;
		height: calc(100vh - 280px);
		overflow: auto;
		
		a {
			color: ${VEREM_GOLD};
			transition: color 0.3s ease;
			
			&:hover {
				color: ${CHOCO};
			}
		}
		p {
			content: '';
			float: none;
			&:after {
				content: '';
				float: none;
			}
		}
		img {
			width: 120px;
			height: 120px;
			object-fit: contain;
			float: left;
			padding-right: 20px;
		}
		
		ul {
			list-style-type: none;
		}

		h1, h2, h3, h4, h5, h6 {
			margin: 0;
			padding: 0;
			font-family: Comfortaa, sans-serif;
			font-weight: 700;
		}
	}
`;
