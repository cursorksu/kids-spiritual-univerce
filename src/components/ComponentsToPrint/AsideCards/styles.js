import styled from '@emotion/styled'
import {
	CREAM,
	STATUS_DRAFT,
	STATUS_PUBLIC,
	VEREM_GOLD
} from '../../../constants/colors'
import { Progress } from 'antd'

export const ProgressStyled = styled(Progress)`
	.ant-progress-text {
		color: ${ CREAM } !important;
		font-weight: 700;
		font-family: 'Comfortaa', sans-serif;
	}
	`;

export const MediaButtonWrapperStyled = styled.div`
	display: grid !important;
	width: 100%;
	grid-template-columns: 1fr 1fr 1fr;
	grid-gap: 20px;
	padding-bottom: 40px;
`
export const MediaButtonStyled = styled.button`
	padding: 0;
	margin: 2px !important;
	width: 60px;
	height: 60px;
	background: linear-gradient(to bottom, ${ CREAM }, ${ STATUS_DRAFT });
	border-radius: 20px !important;
	border: none !important;
	color: white;
	font-size: 16px;
	font-weight: bold;
	text-align: center;
	cursor: pointer;
	box-shadow: rgba(0, 0, 0, 0.2) 4px 4px 8px,
	inset rgba(0, 0, 0, .3) -3px -3px 3px 3px,
	inset rgba(255, 255, 255, .5) 3px 3px 3px 3px,
	1px 1px 1px rgba(255, 255, 255, .1);
	text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2) !important;
	transition: all 0.3s ease-in-out;
	display: flex;
	justify-content: center;
	align-items: center;
	
	svg {
		width: 36px;
		height: 36px;
	}
	
	&.exist {
		background: linear-gradient(to bottom, ${ CREAM }, ${ VEREM_GOLD });
	}
	
	&:hover {
		background: linear-gradient(to bottom, #d4af37, #faebd7);
		box-shadow: rgba(0, 0, 0, 0.3) 6px 6px 12px, inset rgba(0, 0, 0, .2) -3px -3px 3px 3px,
		inset rgba(255, 255, 255, .7) 3px 3px 3px 3px,
		1px 1px 4px rgba(255, 255, 255, .1);
	}
	
	&.active {
		color: #fff;
		background: ${ STATUS_PUBLIC } !important;
		transform: scale(0.95);
		box-shadow: rgba(0, 0, 0, 0.6) 2px 2px 4px, inset rgba(0, 0, 0, .3) -3px -3px 3px 3px,
		inset rgba(255, 255, 255, .5) 3px 3px 3px 3px,
		1px 1px 1px rgba(255, 255, 255, .1);
	}
`