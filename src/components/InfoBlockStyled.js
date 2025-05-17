import styled from '@emotion/styled';
import { BG_GOLD, CARD_SHADOW, CHOCO, DARK_GRAY, VEREM_CREAM_BG, VEREM_GOLD } from '../constants/colors'

export const InfoBlockStyled = styled.div`
	font-family: Comfortaa, sans-serif;
	font-size: 1.5rem;
	font-weight: 300;
	line-height: 1.5;
	width: 100%;
	padding-bottom: 20px;
	background: ${VEREM_CREAM_BG};
    
    .aside-wrapper {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
	
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
		border-radius: 20px;
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
		border-radius: 20px;
		box-shadow: ${ CARD_SHADOW };
		position: relative;
		overflow: hidden;
		height: 280px;
		
		&.full-screen {
			width: 100vw;
			height: 100vh;
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 1001;
			background: ${DARK_GRAY};
			border-radius: 0;
			
			
			img	{
				width: 100vw;
				height: 100vh;
				object-fit: contain;
			}
		}
		
		button {
			position: absolute;
			top: 10px;
			right: 10px;
			z-index: 1;
		}
	}

	img {
		width: 280px;
		height: 280px;
		object-fit: cover;
	}

	.lesson-content-wrapper {
		padding: 0 12px 20px 0;
		font-size: 18px;
     
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
            line-height: 1.6;
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
	
	.material-list {
		li {
			display: flex;
			align-items: center;
			gap: 10px;
		}
	}
`;
