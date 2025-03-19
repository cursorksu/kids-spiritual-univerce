import styled from '@emotion/styled';
import { CHOCO, VEREM_BORDER, VEREM_GOLD, VEREM_GOLD_BG } from '../../constants/colors';
import { PHOTO_PLACEHOLDER } from '../../constants/main';

export const DropzoneStyled = styled.div`
    width: 100%;
    height: 100px;
    border: 2px dashed #ccc;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    cursor: pointer;
    
    label {
        cursor: pointer;
        color: ${VEREM_GOLD};
    }
`;
export const MultiDropzoneStyled = styled(DropzoneStyled)`
    height: 200px;
`;

export const Content = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    justify-content: space-between;
    gap: 20px;
    
    .button-wrapper {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
    
    .delete-button,
    .btn-delete {
       position: absolute;
       top: 8px;
       right: 8px;
       z-index: 1;
    }
`;

export const ImageListStyled = styled.div`
    position: relative;
    margin: 20px 0;
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    max-height: 40vh;
    overflow-y: auto;
    
    & > div:not(.drop-input) {
      flex-basis: 48%;
      max-width: 48%;
      text-align: left;
    }
    
    p {
      padding-top: 30px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      max-width: 100%;
    }
    
    .delete-button,
    .btn-delete {
       position: absolute;
       top: 8px;
       right: 8px;
       z-index: 1;
    }
       
    .image-holder {
        width: 200px !important;
        height: 100px !important;
        display: flex;
        justify-content: center;
        
        &.empty {
          background-image: url(${PHOTO_PLACEHOLDER});
          background-repeat: no-repeat;
          background-size: cover;
        }
        
        img {
          border-radius: 4px;
          overflow: hidden;
          width: 200px !important;
          height: 100px !important;
          object-fit: cover;
        }
    }
    .image-holder,
    .image-area {
        border-radius: 4px;
        overflow: hidden;
    }
    
    .drop-input {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
    }
`;

export const DropArea = styled.div`
    border: 2px  dashed ${VEREM_BORDER};
    border-radius: 20px;
    padding: 20px;
    text-align: center;
    margin-bottom: 16px;
    color: ${VEREM_GOLD};
    font-weight: 600;
    p {
        text-align: center;
    }
    
    &.hide {
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 0;
      opacity: 0;
      z-index: -1;
    }
`;

export const ImageArea = styled.div`
    position: relative;
    min-width: 200px;
    
    .hide {
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 0;
      opacity: 0;
      z-index: -1;
    }
    
    .image-holder {
      width: 316px;
      height: 316px;
      overflow: hidden;
      
      img {
          width: 100%;
          height: 316px;
          object-fit: cover;
      }
    }
`;

export const Metadata = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;    
    gap: 10px;
    font-family: Comfortaa, sans-serif;
    font-size: 12px;
    font-weight: 400;
    color: ${CHOCO};
    width: 100%;
    
    .hide {
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 0;
      opacity: 0;
    }
`;