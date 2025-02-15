import styled from '@emotion/styled';

export const DialogStyled = styled('div')`
  padding: 20px;

  .title {
    font-weight: 600;
    font-size: 1.25rem;
    padding-right: 20px;
    margin: 0;
  }
  .btn-wrapper {
    width: auto;
    display: flex;
    justify-content: left;
  }

  .dynamic-list {
    & > div > div > div > .remove-handle {
      top: 8px;
      right: 40px;
    }

    & > div > div > div > .drag-handle {
      top: 8px;
      right: 10px;
    }
  }
`;
