import styled from '@emotion/styled';
import { CREAM, PERPLE_MAIN, PRIMARY_MAIN, SUCCESS } from '../../constants/colors';

export const PlanerContainerStyled = styled('div')`
  margin: 0 40px;
  padding: 20px;
  background: ${CREAM};
  .rbc-event {
      font-family: Comfortaa, sans-serif;
      color: #1b171c;
      font-weight: 500;
      
      strong {
        color: #fff
      }
      
      &.lesson {
        background: ${PRIMARY_MAIN};
      }
      &.event {
        background: ${SUCCESS};
      }
      &.manage {
        background: ${PERPLE_MAIN};
      }
  }
`;