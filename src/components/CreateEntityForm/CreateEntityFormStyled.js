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

  &.aside {
    padding: 0 0 0 0;
    border: none;
  }

  &.sticky {
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    z-index: 90;
    box-shadow: ${BOX_SHADOW};
  }

  .d-flex {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 10px 0;
  }

  .avatar {
    border: 1px solid ${PRIMARY_MAIN};
    border-radius: 50%;
    margin-right: 40px;
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      margin: 0;
    }
  }

  .aside-form {
    display: grid;
    grid-gap: 10px;
    margin: 20px 0;
    grid-template-columns: 160px 1fr;
    grid-template-areas:
      'o o o o o'
      'a b b b b'
      'a c c c c'
      'a d d d d'
      'e e e e e';

    [name='lesson'] {
      grid-area: o;
    }
    [name='image'] {
      grid-area: a;
    }
    [name='title'] {
      grid-area: b;
    }
    [name='tags'] {
      grid-area: c;
    }
    [name='imageUrl'] {
      grid-area: d;
    }
    [name='text'] {
      grid-area: e;
    }
  }
`;
