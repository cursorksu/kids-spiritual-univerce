import styled from '@emotion/styled';
import {
  BG_GOLD,
  BOX_SHADOW_GOLD,
  DARK_GRAY,
  GOLD,
} from '../../constants/colors';
import { ScenarioStyled } from '../Scenario/styles';
export const EntityListStyled = styled(ScenarioStyled)`
  h1 {
    margin-top: 10px !important;
    color: ${GOLD};
    font-family: 'Yeseva One', sans-serif;
    font-size: 40px;
    font-weight: 400;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .text {
    padding: 40px 0;
  }
  .item-content {
    display: grid;
    grid-template-columns: 200px 1fr;
    grid-gap: 40px;

    .item-title {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .image {
      width: 200px;
      height: auto;
      text-align: center;

      img {
        width: 200px;
        height: 200px;
        object-fit: cover;
        overflow: hidden;
        border-radius: 100px;
        box-shadow: ${BOX_SHADOW_GOLD};
      }
    }
  }
  .content-wrapper {
    .content-list {
      display: block;
    }
  }
`;
export const EntityItemStyled = styled('div')`
  color: ${DARK_GRAY};
  position: relative;
  min-height: 100px;
  font-family: 'Comfortaa', sans-serif;
  font-weight: 300;
  border-bottom: 1px solid ${GOLD};
  padding: 20px 40px 20px 0;
  cursor: pointer;

  &:after {
    content: '\\002B';
    font-size: 4rem;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 20px;
    right: 0;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background: ${BG_GOLD};
    color: ${GOLD};
    z-index: 0;
  }

  &.expanded {
    &:after {
      content: '\\2212';
    }
  }

  .light {
    margin: 0;
    padding: 0;
    color: ${BG_GOLD};
    font-family: 'Yeseva One', sans-serif;
    font-size: 40px !important;
  }
  .btn-block {
    display: grid;
    grid-template-columns: 40px 40px 40px 1fr 40px;
    grid-gap: 2px;
    max-width: calc(100% - 60px);
  }

  .lessons-dropdown {
    .dropdown.selection {
      height: 40px;
      padding: 0;
    }
  }
`;
