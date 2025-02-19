import styled from '@emotion/styled';
import { BG_GOLD, CHOCO, PRIMARY_MAIN, VEREM_GOLD } from '../../constants/colors';
import { Select } from 'antd'

export const OptionTeacherStyled = styled.span`
	display: flex;
	justify-content: stretch;
	align-items: center;
	
	.user-email {
		font-weight: 300;
		line-height: 16px;
		padding-bottom: 6px;
		font-size: 14px;
		color: ${ CHOCO };
		opacity: 0.7;
	}
	
	span {
		display: block;
	}
	
	img {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		margin-right: 20px;
	}
	`;
export const StyledDropdown = styled(Select)`
	&.ant-select {
		display: block;
		width: 100% !important;
		min-height: 40px;
		height: auto;
		
		&.ant-select-focused .ant-select-selector {
			min-height: 40px;
			height: auto;
			line-height: 40px;
			font-size: 18px;
			border-color: #af931b !important;
			outline: 2px solid #af931b;
			outline-offset: 4px;
			box-shadow: 0 2px 8px 4px rgba(0, 0, 0, 0.5);
		}
		
		.ant-select-selection-item {
			font-family: Comfortaa, sans-serif;
			font-weight: 400;
			font-size: 18px;
			color: rgb(96, 81, 71);
		}
		
		&:focus,
		&:hover {
			.ant-select-selector {
				border: 1px solid ${ VEREM_GOLD } !important;
				outline: 2px solid ${ VEREM_GOLD } !important;
				outline-offset: 4px;
			}
		}
		
		.ant-select-selector {
			min-height: 40px;
			height: auto;
			padding: 0 40px 0 12px !important;
			border-radius: 30px !important;
			line-height: 40px;
			font-family: Comfortaa, sans-serif;
			font-weight: 400;
			font-size: 18px;
			border-color: #af931b !important;
			outline: none !important;
			box-shadow: none !important;
			color: ${ CHOCO };
		}
	}
	.ant-select-selection-placeholder {
		line-height: 40px;
		font-size: 18px;
		top: 0;
		transform: none;
	}
	.ant-select-selection-wrap {
		display: inline-block;
		line-height: 40px;
		font-size: 18px;
	}
	
	.ui.label {
		border: 1px solid ${ VEREM_GOLD };
		background-color: ${ BG_GOLD };
		width: 80%;
		position: relative;
		transition: background-color 0.3s ease-in-out;
		grid-template-columns: 40px auto;
		grid-gap: 10px;
		padding-right: 15px;
		border-radius: 40px;
		box-shadow: none;
		
		.ksu-option {
			color: ${ CHOCO };
		}
		
		.description {
			display: none;
		}
		
		&:hover {
			border: 1px solid ${ PRIMARY_MAIN };
			background-color: transparent;
		}
		
		.icon {
			position: absolute;
			right: 10px;
			top: 12px;
			color: ${ VEREM_GOLD };
			width: 20px;
			height: 20px;
			z-index: 0;
			
			&:hover {
				color: ${ PRIMARY_MAIN }
			}
		}
	}
	
	.dropdown.selection {
		width: 100%;
		border-radius: 30px;
		padding: 5px 32px 5px 10px;
		border: 1px solid ${ VEREM_GOLD };
		min-height: 40px;
		line-height: 40px;
		font-family: Comfortaa, sans-serif;
		font-weight: 400;
		color: ${ CHOCO };
		
		&:hover {
			border-color: ${ VEREM_GOLD };
			box-shadow: none;
			transition: background-color 0.3s ease-in-out;
		}
		
		&:focus-visible {
			outline: 2px solid ${ VEREM_GOLD }; /* Золотистый outline при фокусе */
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
				color: ${ PRIMARY_MAIN };
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
