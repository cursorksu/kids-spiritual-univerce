import styled from '@emotion/styled';
import { BG_GOLD, CARD_SHADOW, CHOCO, DARK_GRAY } from '../../constants/colors'
export const KsuCardStyled = styled('div')`
  font-size: 16px !important;
  font-weight: 300;
  line-height: 1.5;
  color: ${DARK_GRAY};
  position: relative;
  min-height: 100px;
	background: #fff;
	border-radius: 20px;
	box-shadow: ${CARD_SHADOW};
	overflow: hidden;
	padding: 20px 20px 60px;
	margin-bottom: 20px;
	
	ul {
		list-style-type: none;
		padding: 0;
		margin: 0;
	}
	
	label {
		font-size: 12px !important;
		line-height: 1.5;
		margin-bottom: 5px !important;
	}
	&.admin-panel {
		background: ${CHOCO};
		padding: 10px 20px 10px;
		color: white;
		text-align: center;
		overflow: visible;
		
		.content > * {
			display: flex;
			justify-content: center;
			align-items: center;
			font-weight: 700 !important;
			margin-bottom: 20px;
		}
		
		button {
			font-weight: 700;
			margin: 0 20px;
		}
		.ui.dropdown {
			min-height: 40px;
		}
		.ui.label {
			text-overflow: ellipsis;
			text-wrap: nowrap;
			padding-right: 30px;
			overflow: hidden;
			margin: 4px 0;
			
			.dropdown.icon,
			.icon {
				top: 8px;
			}
		}
		.ui.dropdown>.dropdown.icon {
			top: 10px;
		}
		.item {
			max-width: 240px;
			top: 110%;
			overflow: hidden;
		}
		
		.text {
			display: block;
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
			width: 100%;
		}
	}
	
	.action-buttons {
		margin-top: 20px;
	}
	
	&.bible {
		color: white;
		text-align: center;
		background-size: auto 400px;
		background-position: center bottom 40px;
		background-repeat: no-repeat;
		backdrop-filter: opacity(0.5);
		background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6)),
		url("https://firebasestorage.googleapis.com/v0/b/lessons-ksu.appspot.com/o/static%2Fbible-bg.png?alt=media&token=b982c86c-b8c8-4eb1-b726-de64ff425cc6");
		
		p {
			font-weight: 700;
			text-align: center;
		}
	}
	
	input {
		display: block;
		margin-bottom: 20px;
	}
	
  .card-actions {
    padding: 0 10px;
	  height: 40px;
    background: ${BG_GOLD};
    display: flex;
    justify-content: flex-end;
    align-items: center;
	  position: absolute;
	  bottom: 0;
	  left: 0;
	  right: 0;
	  z-index: 1;
  }
  .action-top {
    position: absolute;
    top: 0;
    right: 0;

    & > div {
      padding: 0;
    }
  }
`;
