import styled from '@emotion/styled';
import { GOLD, PRIMARY_MAIN, ERROR_MAIN } from '../../constants/colors';

export const TopicStyled = styled.div`
  h3 {
    border-bottom: none;
  }

  .hr {
    width: calc(100% - 40px);
    height: 1px;
    background-color: ${ERROR_MAIN};
    margin: 20px;
  }

  .dictionary {
    position: relative;
    padding-bottom: 12px;
    margin-bottom: 12px;

    &:after {
      content: '';
      width: 70%;
      height: 1px;
      background: ${GOLD};
      position: absolute;
      right: 0;
      bottom: 0;
      display: block;
    }
    .declaration {
      font-weight: 700;
      color: ${GOLD};

      &:after {
        content: '\\2015';
        display: inline-block;
        margin-left: 12px;
      }
    }
    .text {
      font-weight: 300;
      padding-left: 80px;
    }
  }

  .date-holder {
    width: auto;
    display: inline-block;
    background: ${ERROR_MAIN};
    padding: 8px;
    color: white;
    font-style: italic;
    border-radius: 4px;
  }

  .link-holder {
    color: ${PRIMARY_MAIN};
    font-weight: 300;
    text-decoration: none;
    font-style: italic;
  }

  .image-holder {
    margin-top: 20px;
    margin-bottom: 20px;
    border-radius: 4px;
    border: 1px solid ${GOLD};
    color: ${GOLD};
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
      padding: 5px;
      display: block;
      object-fit: cover;
      width: 100%;
      height: 320px;
    }

    label {
      display: block;
      padding: 5px;
    }
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;

    li {
      padding: 0;
      margin: 0 0 8px 0;

      &:before {
        content: '\\2015';
        display: inline-block;
        margin-right: 12px;
      }
    }
  }
`;
