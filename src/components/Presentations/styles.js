import styled from '@emotion/styled';
import {BG_GOLD, CREAM, DARK_GRAY, VEREM_GOLD} from '../../constants/colors.js';
import { TEMPLATES } from '../../constants/presentationTemplates.js'

export const ButtonsWrapperStyled = styled('div')`
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px;
    display: flex;
    gap: 5px;
    `;

export const SlideFormStyled = styled('div')`
    width: 70%;
    padding: 12px;
    display: flex;
    justify-content: space-between;
    gap: 10px;
    
    textarea {
        min-height: 100px;
    }
    
    .right-side {
        flex-basis: 76%;
        .image-holder {
            height: 100px;
            width: 220px;
            img {
                width: 220px;
                height: 100px;
                object-fit: cover;
            }
        }
    }
    
    .buttons-wrapper {
       padding-bottom: 20px;
    }
    
    .image-wrapper {
        display: flex;
        justify-content: stretch;
        gap: 6px;
        width: 100%;
        
        img {
            width: 112px;
            height: 70px;
            object-fit: cover;
            background: ${BG_GOLD};
            border-radius: 20px;
            border: 1px solid ${VEREM_GOLD};
            
            &.active {
                outline: 2px solid ${VEREM_GOLD};
                outline-offset: -4px;
            }
        }
    }
    `;

export const MainSlideStyled = styled('div')`
    width: 100%;
    background: ${DARK_GRAY};
    border-radius: 20px;
    position: relative;
    overflow: hidden;

    .img-wrapper {
        width: 100%;
        height: 70vh;
        overflow: hidden;
        border-radius: 20px;
    }

    .text-wrapper {
        position: absolute;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        background: rgba(0, 0, 0, 0.8);
        text-align: center;
        width: 100%;
        padding: 20px !important;
        color: ${CREAM};

        p {
            text-align: center;
            font-size: 26px;
            font-weight: 600;
            margin: 0;
        }

        h3 {
            font-size: 34px;
        }
    }

    &.${TEMPLATES.TEXT_RIGHT} {
        .text-wrapper {
            width: 50%;
            top: 0;
            right: 0 !important;
            bottom: 0;
            left: initial !important;
            border-radius: 0 20px 20px 0 !important;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        .img-wrapper {
            width: 50%;
            border-radius: 20px 0 0 20px !important;
        }
    }

    &.${TEMPLATES.TEXT_LEFT} {
        .text-wrapper {
            width: 50%;
            top: 0;
            left: 0;
            bottom: 0;
            right: initial;
            border-radius: 20px 0 0 20px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        .img-wrapper {
            width: 50%;
            border-radius: 0 20px 20px 0 !important;
        }
    }

    &.${TEMPLATES.TEXT_BOTTOM} {
        .text-wrapper {
            width: 100%;
            left: 0 !important;
            bottom: 0 !important;
            top: initial !important;
            border-radius: 0 0 20px 20px !important;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
    }

    &.${TEMPLATES.NO_TEXT} {
        .text-wrapper {
            display: none;
        }
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
        box-shadow: 0 2px 0 0 ${VEREM_GOLD},
        0 6px 0 0 ${VEREM_GOLD},
        0 10px 0 0 ${VEREM_GOLD},
        0 14px 0 0 ${VEREM_GOLD};
        border-radius: 4px;
    }

    .drag-handle:hover::after {
        box-shadow: 0 2px 0 0 #333,
        0 6px 0 0 #333,
        0 10px 0 0 #333,
        0 14px 0 0 #333;
    }

`
export const SlideStyled = styled('div')`
    width: 90%;
    background: ${BG_GOLD};
    margin-bottom: 20px;
    border-radius: 20px;
    margin-left: 30px;
    position: relative;
    overflow: visible;

    &.active {
        outline: 2px solid ${VEREM_GOLD};
        outline-offset: 4px;
    }

    &.aside {
        .slide-container {
            overflow: hidden;
            border-radius: 20px;
        }

        .img-wrapper {
            position: relative;
            min-height: 130px !important;
            max-height: 130px !important;
            overflow: hidden;
        }
        
        .text-wrapper {
            position: absolute;
            z-index: 1;
            border-top-left-radius: 20px;
            border-top-right-radius: 20px;
            background: rgba(0, 0, 0, 0.8);
            text-align: center;
            width: 100%;
            padding: 5px !important;
            color: ${CREAM};
            p {
                text-align: center;
                font-size: 8px;
                margin: 0;
            }
            
            h4 {
                text-align: center;
                font-size: 10px;
            }
            
        }
        &.${TEMPLATES.TEXT_RIGHT} {
            .text-wrapper {
                width: 50%;
                top: 0;
                right: 0 !important;
                bottom: 0;
                left: initial !important;
                border-radius: 0 20px 20px 0 !important;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }

            .img-wrapper {
                width: 50%;
                border-radius: 20px 0 0 20px !important;
            }
        }
        &.${TEMPLATES.TEXT_LEFT} {
            .text-wrapper {
                width: 50%;
                top: 0;
                left: 0;
                bottom: 0;
                right: initial;
                border-radius: 20px 0 0 20px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }

            .img-wrapper {
                width: 50%;
                border-radius: 0 20px 20px 0 !important;
            }
        }
        &.${TEMPLATES.TEXT_BOTTOM} {
            .text-wrapper {
                width: 100%;
                left: 0 !important;
                bottom: 0 !important;
                top: initial !important;
                border-radius: 0 0 20px 20px !important;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
        }
        &.${TEMPLATES.NO_TEXT} {
            .text-wrapper {
               display: none;
            }
        }

        button {
            position: absolute;
            top: 35px;
            left: -38px;
        }
        .text-wrapper {
            font-size: 12px;
            padding: 10px;
        }


        img {
            width: 100%;
            height: 130px;
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
            box-shadow: 0 2px 0 0 ${VEREM_GOLD},
            0 6px 0 0 ${VEREM_GOLD},
            0 10px 0 0 ${VEREM_GOLD},
            0 14px 0 0 ${VEREM_GOLD};
            border-radius: 4px;
        }

        .drag-handle:hover::after {
            box-shadow: 0 2px 0 0 #333,
            0 6px 0 0 #333,
            0 10px 0 0 #333,
            0 14px 0 0 #333;
        }
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