import styled from '@emotion/styled';
import { CREAM, DARK_GRAY } from '../../constants/colors';

export const ScenarioStyled = styled('div')`
    color: ${DARK_GRAY};
    position: relative;
    min-height: 100px;
    font-family: 'Monospaced', sans-serif;
    font-weight: 400;

    .content-wrapper .content-list {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 20px;
    }

    .ksu-content .title,
    .ksu-content .meta {
        color: ${CREAM};
    }
`;
