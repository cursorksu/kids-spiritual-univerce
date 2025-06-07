import styled from '@emotion/styled';
import {
	BG_GOLD,
	BOX_SHADOW_HOVER,
	CHOCO,
	CREAM,
	GOLD,
	ITEM_BG,
	VEREM_CREAM_BG,
	VEREM_GOLD, YELLOW_LIGHT,
} from '../constants/colors'

export const PresentationsStyled = styled('section')`
	background: ${CHOCO};
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	padding: 20px;
	min-height: 100vh;
	
	.list-wrapper {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-gap: 20px;
	}
	`;

export const PresentationPageStyled = styled('section')`
	background: ${CHOCO};
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 100vh;
	flex-wrap: wrap;
	
	.presentation-title {
		flex-basis: 100%;
		border-bottom: 6px double ${CHOCO};
		display: flex;
		min-height: 166px;
		justify-content: space-between;
		align-items: center;
		background: ${VEREM_CREAM_BG};
		color: ${CHOCO};
	}
	
	.slide-list {
		flex-basis: 280px;
		border-left: 4px double ${CREAM};
		height: calc(100vh - 100px);
		overflow-y: auto;
		padding: 20px;
	}
	.slide-wrapper {
		flex-basis: calc(100% - 280px);
		min-height: calc(100vh - 100px);
		padding: 20px;
	
	}
	`;
export const ShadowCardStyled = styled('li')`
  position: relative;
  background: ${ITEM_BG};
  border-radius: 30px;
  border: 1px solid ${VEREM_GOLD};
  list-style-type: none;
  padding: 20px;
  margin: 0;
  font-size: 1.5rem;
  color: ${VEREM_GOLD};
  text-align: center;
  
  h2 {
    font-size: 1.2rem;
    font-family: "Comfortaa", serif;
    font-weight: 700;
    color: ${CHOCO};
    margin: 0;
  }

  &.in-aside {
    margin-bottom: 20px;
  }

  &.d-block {
    display: block;

    svg {
      width: 18px;
      height: 18px;
    }
  }

  &.active {
    outline: 2px solid ${VEREM_GOLD};
    outline-offset: 4px; 
    
    .icon-holder {
      margin: auto;
      border-radius: 50%;
      background: #fff;
      padding: 10px;
      width: 60px;
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .subtitle {
    font-size: 1.2rem;
    text-align: center;
    white-space: pre-wrap;
    color: ${CHOCO};
  }

  svg {
    display: block;
    margin: 10px auto;
    width: 40px;
    height: 40px;
  }
`;

export const HomeContentStyled = styled('div')`
    padding: 40px;

    .title {
      color: ${CHOCO};
      font-size: 1.5rem;
      font-family: Comfortaa, sans-serif;
      font-weight: 700;
      padding-bottom: 30px;
      white-space: pre-wrap;
    }

    & > .aside-wrapper {
      position: relative;
      overflow: hidden;
      display: grid;
      grid-template-columns: 5fr 4fr;
      grid-gap: 30px;
      font-size: 1.2rem;
      margin-bottom: 40px;

      &.d-block {
        display: block;
      }

      .ui.card {
        border: none;
        padding: 0;
        border-radius: 0;
        outline: none;

        &:hover {
          outline: none;
        }
      }

      .game-list {
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 30px;
        text-align: center;

        .subtitle {
          text-align: center;
          font-size: 20px;
        }
      }

      iframe {
        width: 100%;
        height: 300px;
        border-radius: 4px;
      }
    }
    & > .content-wrapper {
      overflow: visible;
      
      .title {
        text-align: center;
        font-size: 1.8rem;
        font-weight: 700;
      }

      .d-flex {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
`;
export const ControlMobileStyled = styled('div')`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: ${({ collapsed }) => (collapsed
      ? '60px'
      : '100%')};
  padding-top: 60px;
  background: ${VEREM_CREAM_BG};
  z-index: 100;

  & > button {
    position: absolute;
    top: 12px;
    left: 4px;
  }

  .fixed-mobile-menu {
    font-size: 1.1rem;
    padding-bottom: 100px;
    overflow-y: auto;
    height: 100vh;

    .ant-menu {
      background: transparent !important;
      border-radius: 0;
      box-shadow: none;
      border: none;
    }

    .ant-menu-submenu,
    .ant-menu-submenu-title {
      color: ${CHOCO} !important;
    }

    .ant-menu-submenu-selected > .ant-menu-submenu-title,
    .ant-menu .ant-menu-submenu-selected > .ant-menu-submenu-title
    .ant-menu-title-content,
    .ant-menu-item {
      font-size: 20px;
      background: transparent !important;
      color: ${CHOCO} !important;
      margin: 0;
      box-shadow: none;
      border-radius: 0;
    }

    .ant-menu-submenu-title {
      outline: none;
      margin: 0;
      padding: 4px;
      border-radius: 0;
    }

    .ant-menu-item:target .ant-menu-submenu-title,
    .ant-menu-item:visited .ant-menu-submenu-title,
    .ant-menu-item:hover .ant-menu-submenu-title,
    .ant-menu-item:focus-visible .ant-menu-submenu-title,
    .ant-menu-item:active .ant-menu-submenu-title {
      background: ${BG_GOLD} !important;
			transition: ease-in-out 0.3s color;
      outline: none;
    }

    .ant-menu-submenu-title {
      .ant-menu-title-content {
        color: ${VEREM_GOLD} !important;
        font-size: 20px !important;
      }
    }
    .ant-menu-item-active {
      color: ${VEREM_GOLD} !important;
      font-size: 20px !important;

      .ant-menu-title-content {
        color: ${VEREM_GOLD} !important;
        font-size: 20px !important;
      }
    }

    svg {
      width: 24px;
      height: 24px;
      display: inline-block;
      margin-right: 12px;
    }

    .middle {
      svg {
        width: 25px;
        height: 25px;
      }
    }

    .big {
      svg {
        width: 30px;
        height: 30px;
      }
    }
  }
`;
export const VeremMainContentStyled = styled('div')`
	position: relative;
	overflow-y: auto;
	height: ${({isMobile}) => (isMobile ? '100vh' : 'auto')};
	min-height: 100vh;
	width: 100%;
	overflow-x: hidden;

	.collections-wrapper {
		margin: 0;
		padding: 20px;
		display: grid;
		gap: 20px;
		grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
	}
	
	.entity-title-wrapper {
		padding: 20px 0 0;
	}

	.content-wrapper {
		margin: 0;
		padding: 0;

		.benefits {
			margin: 20px 0;
			padding: 0;
			display: grid;
			gap: 20px;
			grid-template-columns: repeat(3, 1fr);
		}

		h1, h2, h3, h4, h5, h6 {
			margin: 0;
			padding: 0;
			font-family: Comfortaa, sans-serif;
			font-weight: 700;
		}

		h1 {
			white-space: pre-wrap !important;
			font-size: 20px !important;
		}
	}

	.main-content {
		width: ${({collapsed, isMobile}) =>
			(isMobile ? '100%' : (collapsed ? 'calc(100% - 80px)' : 'calc(100% - 250px)'))};
		margin-left: ${({collapsed, isMobile}) =>
			(isMobile ? 0 : (collapsed ? '80px' : '250px'))};
		transition: margin-left 0.2s ease-in-out;
	}

	.hero {
		width: 100%;
		text-align: center;
	}

	.collapsed-menu {
		font-size: 1.14rem;
		display: flex;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		z-index: 200;
		box-shadow: ${BOX_SHADOW_HOVER};

		.active {
			background: rgba(255, 255, 255, 0.7);
			color: ${CHOCO} !important;
		}

		li ul li {
			a {
				padding: 0 0 0 50px;
			}

			&.active {
				background: #fff;
			}
		}

		svg {
			width: 20px;
			height: 20px;
			display: inline-block;
		}

		.middle {
			svg {
				width: 25px;
				height: 25px;
			}
		}

		.big {
			svg {
				width: 30px;
				height: 30px;
			}
		}
	}

	.collapsed-menu .ps-menu-button {
		color: #282c34 !important;
	}
	
	.ps-menuitem-root.disabled {
		opacity: 0.3;
		color: white;
		pointer-events: none;
		display: none;
	}

	.ps-submenu-expand-icon,
	.ps-menu-icon {
		color: ${GOLD};
	}

	.ps-menu-button:hover {
		background-color: white !important;
		transition: color 0.3s ease,
		background-color 0.3s ease;
	}

	.ps-menu-root {
		.divider {
			margin: 0;
		}
	}

	.ps-menu-root ul {
		display: flex;
		min-height: 100vh;
		justify-content: space-between;
		flex-direction: column;
		background: ${CREAM};
		border-color: transparent;
	}

	.ps-menu-root .ps-submenu-content {
		min-width: 300px;
		
		ul {
			min-height: initial;
		}
	}

	[data-popper-escaped] .ps-menu-button {
		padding: 0 10px;
	}

	.control-panel {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 0 0 10px;
	}

	.contacts {
		margin: 0;
		padding: 0;

		li {
			line-height: 20px;
			display: flex;
			flex-wrap: wrap;
			justify-content: flex-start;
			align-items: center;
			margin-bottom: 10px;

			span {
				font-weight: 700;
				display: block;
				margin-right: 10px;
			}
		}
	}

	.church-avatar {
		width: 100%;
		position: relative;
		overflow: hidden;

		&:after {
			content: '';
			position: absolute;
			top: -150px;
			left: 70px;
			transform: translate(-50%, 0) rotate(-130deg);
			width: 270px;
			height: 270px;
			z-index: 100;
			background-image: url('https://firebasestorage.googleapis.com/v0/b/lessons-ksu.appspot.com/o/static%2Frise.png?alt=media&token=364431b2-8bb9-480f-a945-31ca01c9b764');
			background-size: contain;
			background-repeat: no-repeat;
		}

		.img {
			width: 100%;
			height: 400px;
			background-attachment: fixed;
			background-repeat: no-repeat;
			background-position: center center;
			background-repeat: no-repeat;
			background-size: cover;
			filter: brightness(0.7);
		}

		.full-screen {
			.img {
				height: 100vh;
				filter: none;
			}
		}
	}

	.content-block {
		margin-bottom: 40px;
	}

	.content-block-placeholder {
		margin-top: 20px;
		margin-bottom: 40px;
		border-radius: 30px;
		padding: 40px;
		height: 400px;
		border: 1px solid ${VEREM_GOLD};
		font-size: 30px;
		text-align: center;
		letter-spacing: 0.01em;
		color: #a39367;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.verem-church-title {
		position: relative;
		z-index: 0;
		top: 0;
		text-align: center;
		display: grid;
		grid-template-columns: 15% 1fr 60px;
		width: 60%;
		margin: auto;

		.title-info {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			padding: 20px;
		}

		.title {
			font-family: "Yeseva One", serif;
			font-size: 36px;
			margin: 0 !important;
			line-height: 1.5;
			letter-spacing: 2px;
		}

		.subtitle {
			font-family: 'Comfortaa', sans-serif;
			font-size: 12px;
			font-style: normal;
			font-weight: 600;
			letter-spacing: 0.12em;
			text-transform: uppercase;
			white-space: nowrap;
			margin-bottom: 0;
		}

		.logo {
			padding: 20px;
			width: 160px;
			height: auto;
		}

		.actions {
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}

	@media screen and (max-width: 768px) {
		.collections-wrapper {
			grid-template-columns: 1fr;
		}
	}
`;
