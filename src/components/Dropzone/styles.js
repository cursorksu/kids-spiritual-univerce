import styled from '@emotion/styled';
import { PRIMARY_MAIN, BG_GOLD, CHOCO } from '../../constants/colors';

export const StyledDropzoneBody = styled.div`
  padding-top: 12px;
  display: grid;
  grid-template-columns: 1fr 6fr;
  gap: 8px;

  .dz-row {
    padding-top: 5px !important;
    padding-bottom: 5px !important;
  }

  &.ui.grid {
    margin: -5px !important;
  }
  .column {
    padding-left: 5px !important;
    padding-right: 5px !important;
  }

  .size-box {
    margin-left: 15px !important;
    text-align: center;
  }
  .image {
    color: #abaaa8;

    &.active {
      color: ${PRIMARY_MAIN};
    }
  }

  label {
    padding-left: 5px !important;
    background: transparent;
    font-family: Comfortaa, sans-serif;
    font-weight: 300;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.6) !important;
    display: inline-block;

    &:before {
      content: none !important;
    }
    &:after {
      content: none !important;
    }
  }
`;

export const UvDropzoneStyled = styled('section')`
  background: ${BG_GOLD};
  border: 1px dashed ${PRIMARY_MAIN};
  border-radius: 4px;
  height: 200px;
  width: 200px;
  position: relative;
  cursor: pointer;
  overflow: hidden;

  [role='presentation'],
  .accent {
    height: 200px;
    width: 200px;
    cursor: pointer;
    background: transparent;
    display: flex;
    font-size: 1.2rem;
    font-family: Comfortaa, sans-serif;
    font-weight: 300;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: ${PRIMARY_MAIN};
  }

  &.user-avatar {
    border: 1px dashed white;
	  border-radius: 4px;
    display: block;
	  overflow: visible;
    width: 160px;
    height: 160px;

    [role='presentation'],
    .accent {
      height: 160px;
      width: 160px;
      color: ${CHOCO};
      font-size: 1.3rem;
      line-height: 1.5;
    }
  }

  img {
    width: 160px;
    height: 160px;
    object-fit: contain;
	  object-position: center center;
  }
	
	.delete-button {
		position: absolute;
		top: 6px;
		right: -30px;
	}
`;

export const FileItemStyled = styled('div')`
  display: grid;
  grid-template-columns: 5fr 1fr 1fr 37px;
  align-items: center;
  grid-gap: 10px;
  line-height: 40px;
  margin-bottom: 10px;

  span {
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
export const KsuDropzoneStyled = styled('section')`
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-gap: 20px;

  img {
    width: 100%;
    height: 200px;
    object-fit: contain;
    object-position: center;
    margin: 0;
    border: none;
  }
`;
