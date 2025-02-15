import styled from '@emotion/styled';

export const DndItemStyled = styled.div`
  background: transparent;
  overflow: visible;
  margin: 0 0 12px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  position: relative;
  padding: 2px;

  .MuiOutlinedInput-notchedOutline.MuiOutlinedInput-notchedOutline {
    display: none !important;
  }

  .remove-handle {
    right: 30px !important;
  }

  .dnd-handle {
    right: 20px;
  }

  input {
    padding-right: 40px;
  }
`;
