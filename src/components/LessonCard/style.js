import styled from '@emotion/styled';
import { BOX_SHADOW_GOLD, CREAM, VEREM_GOLD } from '../../constants/colors'
import { Card } from 'antd';

export const LessonCardStyled = styled(Card)`
    color: white !important;
    font-family: 'Comfortaa', sans-serif;
    font-size: 1.5rem;
    font-weight: 300;
    box-sizing: border-box;
    cursor: pointer;
    position: relative;
    background-size: cover;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    box-shadow: none;
    transition: all 0.6s ease;

    &:hover {
        box-shadow: ${BOX_SHADOW_GOLD};
    }

    .ant-card-body {
        padding: 0;
    }

    .card-img-wrapper {
        width: 100%;
        min-height: 260px;
        object-fit: cover;
        display: flex;
        justify-content: center;
        align-items: center;
        color: ${CREAM};
        background: rgba(0, 0, 0, 0.3);

        img {
            transform: none;
            height: 260px;
            width: 100%;
            object-fit: cover;
            position: static;
            max-width: initial;
            max-height: initial;
        }

        svg {
            opacity: 0.3;
            width: 60px;
            height: 60px;
        }
    }

    .card-content {
        padding: 15px;
        display: block;
        font-size: 18px;
    }

    .card-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px;
        background: dimgrey;

        div {
            flex-basis: calc(100% - 40px);
        }
        button {
            flex-basis: 40px;
        }

        p {
            font-size: 0.7em;
            color: #fff;
            margin: 0;
        }
    }

    .card-title {
        font-family: 'Comfortaa', sans-serif;
        font-weight: 700;
        text-align: center;
        color: ${VEREM_GOLD};
        font-size: 24px;
        line-height: 1.3;
        min-height: 60px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.3);
        padding-bottom: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .description {
        display: -webkit-box;
        min-height: 60px;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .quote {
        font-style: italic;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        line-height: 1.2;
        min-height: 62px;
        text-overflow: ellipsis;
    }
`;
