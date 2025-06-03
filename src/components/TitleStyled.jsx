import styled from '@emotion/styled';
import {
    CHOCO,
    VEREM_GOLD,
} from '../constants/colors';

export const TitleSmall = styled.h2`
    margin: 0;
    padding: 0;
    font-family: Comfortaa, sans-serif;
    font-size: 22px;
    line-height: 1.2;
    font-weight: 700;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    column-gap: 20px;
`;
export const TitleMedium = styled(TitleSmall)`
    font-size: 30px;
`;

export const TitleLarge = styled(TitleSmall)`
    font-size: 36px;
    color: ${VEREM_GOLD};
    margin: 0 12px 20px;
    padding-bottom: 20px;
    border-bottom: 2px dotted ${VEREM_GOLD};
    
    & * {
        white-space: pre-wrap;
    }
    
    .action {
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .description {
        flex-basis: 100%;
        font-size: 14px;
        font-weight: 600;
        color: ${CHOCO};
        display: block;
        white-space: pre-wrap;
        max-width: 80%;
        line-height: 1.5;
        text-align: left;
    }


    @media screen and (max-width: 768px) {
        font-size: 24px;
    }
`;