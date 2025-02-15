import styled from '@emotion/styled';
import {VEREM_GOLD} from '../constants/colors';

export const TitleSmall = styled.h2`
    margin: 0;
    padding: 0;
    font-family: Comfortaa, sans-serif;
    font-size: 22px;
    line-height: 2;
    font-weight: 700;
    white-space: nowrap;
`;
export const TitleMedium = styled(TitleSmall)`
    font-size: 30px;
`;

export const TitleLarge = styled(TitleSmall)`
    font-size: 36px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${VEREM_GOLD};
    margin: 0 12px;
`;