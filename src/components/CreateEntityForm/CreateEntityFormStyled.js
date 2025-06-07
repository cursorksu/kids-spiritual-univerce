import styled from '@emotion/styled';
import { BOX_SHADOW, PRIMARY_MAIN, VEREM_CREAM_BG, VEREM_GOLD } from '../../constants/colors';

export const CreateEntityFormStyled = styled('div')`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 20px;
  padding: 30px;
	max-height: 63vh;
  overflow: auto;
  
  .imagePicker {
    grid-column: 1 / -1;
  }
  
  label {
    color: ${VEREM_GOLD};
  }
  }
.text {
    grid-column: 1 / -1;

`;
