import styled from '@emotion/styled';
import {Swiper} from 'swiper/react';
import {ERROR_MAIN} from '../../constants/colors';

export const FullScreenButton = styled('div')`
    position: absolute;
    top: 10px;
    left: 40px;
    z-index: 1100;

    svg {
        width: 24px !important;
        height: 24px !important;
    }
`;
export const SwiperPresentation = styled(Swiper)`
    &.swiper {
        display: none;
        position: relative;
        width: 100%;

        &.full-screen {
            z-index: 10;
            position: fixed;
            width: 100%;
            height: 100vh;
            top: 0;
            left: 80px;
            right: 0;
            bottom: 0;
            display: block;
            
            .text-wrapper {
                z-index: 1 !important;
                border-radius: 0;
            }


            .slide-container {
                width: 100%;
                height: 100vh;

                .img-wrapper {
                    height: 100vh;
                    border-radius: 0;
                }

                img {
                    height: 100vh;
                    width: 100%;
                    object-fit: cover;
                }
            }

            .description {
                font-size: 2rem;
                margin-bottom: -10rem;
                padding: 2rem 2rem 4rem;

                p {
                    line-height: 3.6rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    max-width: 100%;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                }
            }
        }

        img {
            display: block;
            width: 100%;
            height: 400px;
            object-fit: cover;
            scale: 1;
            transition: scale 0.6s cubic-bezier(0.455, 0.03, 0.515, 0.955);
        }

        .description {
            font-family: Comfortaa, sans-serif;
            font-weight: 300;
            font-size: 1.2rem;
            color: white;
            background-color: rgba(0, 0, 0, 0.7);
            padding: 1rem 1rem 2rem;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            text-align: center;
            margin-bottom: -5rem;
            transition: margin-bottom 1.2s cubic-bezier(0.455, 0.03, 0.515, 0.955);
            z-index: 1;
            min-height: 6rem;

            p {
                line-height: 2rem;
                overflow: hidden;
                text-overflow: ellipsis;
                max-width: 100%;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
            }
        }

        .swiper-slide > div {
            border-radius: 0;
        }

        .swiper-slide-active {
            .description {
                margin-bottom: 0;
            }

            img {
                scale: 1.3;
            }
        }

        .swiper-pagination {
            z-index: 1000 !important;
            bottom: 30px;
        }

        svg {
            width: 40px;
            height: 40px;
        }

        .button-next {
            position: absolute;
            top: 50%;
            width: 60px;
            height: 60px;
            display: flex;
            justify-content: center;
            align-items: center;
            transform: translateY(-50%);
            left: 0;
            z-index: 1;
        }

        .swiper-button-prev {
            position: absolute;
            top: 50%;
            border-radius: 50%;
            transform: translateY(-50%);
            width: 60px;
            height: 60px;
            left: 0;
            z-index: 1000;
        }

        .button-prev {
            position: absolute;
            top: 50%;
            width: 60px;
            height: 60px;
            display: flex;
            justify-content: center;
            align-items: center;
            transform: translateY(-50%);
            right: 0;
            z-index: 1;
        }

        .swiper-button-next {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            border-radius: 50%;
            width: 60px;
            height: 60px;
            right: 0;
            z-index: 1000;
        }

        .swiper-pagination-bullet {
            background-color: white !important;
            width: 15px;
            height: 15px;
        }

        .swiper-pagination-bullet-active {
            background: ${ERROR_MAIN};
        }
    }

    .trigger-button {
        position: absolute;
        top: 20px;
        right: 50px;
        z-index: 10;
    }
`;
