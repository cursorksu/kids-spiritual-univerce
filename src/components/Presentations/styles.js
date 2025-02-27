import styled from '@emotion/styled';
import { CREAM, DARK_GRAY, VEREM_GOLD } from '../../constants/colors.js';
import { TEMPLATES } from '../../constants/presentationTemplates.js'

export const MainSlideStyled = styled('div')`
	width: 100%;
	background: ${ DARK_GRAY };
	border-radius: 20px;
	position: relative;
	overflow: hidden;
	
	&.${TEMPLATES.TEXT_BOTTOM} {
		display: flex;
		justify-content: stretch;
		align-items: stretch;
		flex-direction: column;
		
		.text-wrapper {
			background: rgba(0, 0, 0, 0.7);
			height: 200px;
			padding: 20px !important;
			text-align: center;
			color: ${ CREAM };
			position: absolute;
			top: initial;
			bottom: 0;
			left: 0;
			right: 0;
			
			p {
				text-align: center;
				font-weight: 700;
			}
		}
		
		.img-wrapper {
			height: 70vh;
			overflow: hidden;
			border-radius: 0;
		}
	}
	&.${TEMPLATES.TEXT_TOP} {
		display: flex;
		justify-content: stretch;
		align-items: stretch;
		flex-direction: column;
		
		.text-wrapper {
			background: rgba(0, 0, 0, 0.7);
			padding: 20px;
			text-align: center;
			color: ${ CREAM };
			font-size: 32px;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			
			p {
				text-align: center;
				font-weight: 700;
			}
		}
		
		.img-wrapper {
			height: 70vh;
			overflow: hidden;
			border-radius: 0;
		}
	}
	
	&.${TEMPLATES.TEXT_RIGHT} {
		display: flex;
		justify-content: stretch;
		align-items: stretch;
		
		.text-wrapper {
			flex-basis: 50%;
			font-weight: 700;
			padding: 100px;
			color: ${ CREAM };
			font-size: 32px;
			
			p {
				font-weight: 700;
			}
		}
		
		.img-wrapper {
			flex-basis: 50%;
			height: 70vh;
			overflow: hidden;
			border-radius: 0;
		}
	}
	
	.img-wrapper {
		width: 100%;
		height: 70vh;
		overflow: hidden;
		border-radius: 20px;
	}
	
	img {
		width: 100%;
		height: 70vh;
		object-fit: cover;
	}
	
	.drag-handle {
		cursor: grab;
		position: absolute;
		left: -30px;
		top: 0;
		width: 16px;
		height: 20px;
		background: transparent;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.drag-handle::after {
		content: '';
		width: 16px;
		height: 2px;
		display: block;
		position: relative;
		background: transparent;
		box-shadow: 0 2px 0 0 ${ VEREM_GOLD },
		0 6px 0 0 ${ VEREM_GOLD },
		0 10px 0 0 ${ VEREM_GOLD },
		0 14px 0 0 ${ VEREM_GOLD };
		border-radius: 4px;
	}
	
	.drag-handle:hover::after {
		box-shadow: 0 2px 0 0 #333,
		0 6px 0 0 #333,
		0 10px 0 0 #333,
		0 14px 0 0 #333;
	}

`
export const SlideStyled = styled(MainSlideStyled)`
	width: 90%;
	background: ${ DARK_GRAY };
	margin-bottom: 20px;
	border-radius: 20px;
	margin-left: 30px;
	position: relative;
	overflow: visible;
	
	&.active {
		outline: 2px solid ${ VEREM_GOLD };
		outline-offset: 6px;
	}
	
	.img-wrapper {
		width: 100%;
		height: 130px;
		overflow: hidden;
		border-radius: 20px;
	}
	
	img {
		width: 100%;
		height: 100px;
		object-fit: contain;
	}
	
	.drag-handle {
		cursor: grab;
		position: absolute;
		left: -30px;
		top: 0;
		width: 16px;
		height: 20px;
		background: transparent;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.drag-handle::after {
		content: '';
		width: 16px;
		height: 2px;
		display: block;
		position: relative;
		background: transparent;
		box-shadow: 0 2px 0 0 ${ VEREM_GOLD },
		0 6px 0 0 ${ VEREM_GOLD },
		0 10px 0 0 ${ VEREM_GOLD },
		0 14px 0 0 ${ VEREM_GOLD };
		border-radius: 4px;
	}
	
	.drag-handle:hover::after {
		box-shadow: 0 2px 0 0 #333,
		0 6px 0 0 #333,
		0 10px 0 0 #333,
		0 14px 0 0 #333;
	}

`
export const MetaStyled = styled('div')`
	font-size: 14px;
	font-weight: 300;
`
export const PresentationTitleStyled = styled('div')`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 20px;
	margin-bottom: 60px;
	border-bottom: 1px solid ${ CREAM };
`