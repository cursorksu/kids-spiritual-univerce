import styled from '@emotion/styled'
import {
	BG_GOLD, CHOCO,
	CREAM,
	STATUS_DRAFT,
	STATUS_PUBLIC,
	VEREM_GOLD
} from '../../../constants/colors'
import { Progress } from 'antd'

export const LessonGalleryStyled = styled.div`
	&.lesson-gallery-container {
		position: relative;
		
		.no-image {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			text-align: center;
			margin: 0;
			color: ${ VEREM_GOLD };
		}
		.admin-board {
			background: ${CHOCO};
			position: absolute;
			top: 0;
			right: 0;
			padding: 10px;
			z-index: 10;
			border-bottom-left-radius: 20px;
		}
		.swiper {
			height: 290px;
			background: ${BG_GOLD};
			border-bottom: 1px solid ${VEREM_GOLD};
			box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
		}
		.button-prev {
			margin-right: 10px !important;
		}
		.button-next,
		.button-prev {
			width: 40px !important;
			height: 40px !important;
			svg {
				width: 22px;
				height: 22px;
			}
		}
		.swiper-slide,
		.swiper-slide-active {
			height: 250px;
			padding: 20px 15px;
			
			.img-wrapper {
				width: 100%;
				height: auto;
				background: ${BG_GOLD};
				border-radius: 20px;
				overflow: hidden;
				box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
			}

			img {
				width: 100% !important;
				max-width: 100% !important;
				height: 250px;
				object-fit: cover;
				
			}
		}
	}

	@media screen and (max-width: 768px) {
		&.lesson-gallery-container {
			.swiper {
				height: 270px;
			}
			.button-next,
			.button-prev {
				display: none !important;
			}
            .swiper-slide,
            .swiper-slide-active {
                height: 260px;
                padding: 5px;

                .img-wrapper {
                    width: 100%;
                    height: auto;
                    border-radius: 4px;
                    box-shadow: none;
                }
                img {
                    height: 260px;
                }
            }
        }
	}
`;

export const ProgressStyled = styled(Progress)`
	.ant-progress-text {
		color: ${ CREAM } !important;
		font-weight: 700;
		font-family: 'Comfortaa', sans-serif;
	}
	`;

export const MediaButtonWrapperStyled = styled.div`
	display: grid !important;
	place-items: center;
	width: 100%;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-gap: 2px;
	padding-top: 10px;

	@media screen and (max-width: 768px) {
		padding-top: 0;
		grid-template-columns: repeat(6, 1fr);
	}
`
export const MediaButtonStyled = styled.button`
	padding: 0;
	margin: 2px !important;
	width: 60px;
	height: 60px;
	background: linear-gradient(to bottom, ${ CREAM }, ${ STATUS_DRAFT });
	border-radius: 16px !important;
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

	@media screen and (max-width: 768px) {
		width: 54px;
		height: 54px;

		svg {
			width: 30px;
			height: 30px;
		}
	}
`