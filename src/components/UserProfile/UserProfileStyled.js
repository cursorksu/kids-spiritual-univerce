import styled from '@emotion/styled';
import { CREAM, CHOCO, DARK_BG, PRIMARY_MAIN } from '../../constants/colors';

export const UserProfileStyled = styled.div`
  background-position: center -80px;
  background-size: cover;
  background-repeat: no-repeat;
  text-align: left;
	
	.group-top-container-btns {
		position: absolute;
		top: 20px;
		right: 20px;
	}
	
	.group-top-container-info {
		font-family: Comfortaa, sans-serif;
		font-size: 1.2rem;
		font-weight: 600;
		display: flex;
		gap: 140px;
		color: ${CREAM};
	}
	
	.group-top-teachers {
		font-family: Comfortaa, sans-serif;
		font-size: 1.2rem;
		color: ${CREAM};
		line-height: 1.8rem;
		list-style-type: none;
		padding: 0;
		margin: 0;
		
		li:first-of-type {
			font-size: 1.5rem;
			font-weight: 700;
			margin-bottom: 10px;
		}
	}
	

  .action-wrapper {
    padding: 16px;
  }
  
  .tab-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      button {
         display: inline-block;
         margin-left: 20px;
      }
  }

  .user-title {
    background: transparent;
    border: none;
    border-bottom: 1px solid ${CREAM};
    color: ${CREAM};
    font-family: Comfortaa, sans-serif;

    &:active,
    &:focus {
      outline: none;
    }
  }

  .title {
    color: ${CREAM};
    font-family: 'Yeseva One', sans-serif;
    font-size: 4rem;
    font-weight: 500;
    margin: 0 !important;
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
      margin-left: 20px;
    }
  }
  .subtitle {
    color: ${CREAM};
    font-family: 'Yeseva One', sans-serif;
    font-size: 2rem;
    font-weight: 500;
	  padding: 0;
	  margin: 0 0 30px 0 !important;
    position: relative;
    overflow: visible;
  }

  .info {
    width: 60%;
    margin: auto;
    color: #000;
    font-family: Comfortaa, sans-serif;
    font-size: 1.2rem;
    text-align: center;
    font-weight: 400;
    text-transform: uppercase;
  }

  .tabular.menu {
    padding: 40px 40px 0;
    border-bottom: none;
    max-width: calc(100% - 80px);
    overflow-y: hidden;
    overflow-x: auto;

    .item {
      background: white;
      font-family: Comfortaa, sans-serif;
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
      font-size: 1.5em;
      font-weight: 300;
      margin-right: 5px;
      box-shadow: 2px 0 2px 0 rgba(0, 0, 0, 0.4);
      opacity: 0.8;
      transition: opacity 0.3s ease-in-out;

      &.active {
        color: ${CHOCO};
        background: ${CREAM};
        box-shadow: 2px 0 2px 0 rgba(0, 0, 0, 0.4);
        opacity: 1;
      }

      &:hover {
        background: ${CREAM};
      }
    }
  }

  .avatar-wrapper {
    position: relative;
    margin-right: 40px;

    button {
      position: absolute;
      top: 5px;
      left: 5px;
      z-index: 2;
    }

    .image {
      margin-right: 0;
      object-fit: cover;
      object-position: center center;
      position: relative;
      width: 160px;
      height: 160px;
      display: flex;
      border-radius: 4px;
      overflow: hidden;
    }
  }
  .group-top-container {
    margin-bottom: 40px;
    position: relative;
    padding: 20px;
    overflow: hidden;
    background: ${CHOCO};
  }
  .top-container {
    position: relative;
    padding: 20px;
    overflow: hidden;
    background: ${CHOCO};

    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: -1;
      background-color: ${DARK_BG};
    }
  }

  .score {
    min-width: 60px;
    font-family: 'Comfortaa', sans-serif;
    font-size: 18px;
    color: rgb(96, 81, 71);
    margin: 0 !important;
    line-height: 40px;
  }

  .d-flex {
    display: flex;
    align-items: center;
  }

  img {
    margin-right: 40px;
    border: 1px solid ${CREAM};
  }

  .meta {
    font-family: Comfortaa, sans-serif;
    font-size: 20px;
    color: ${PRIMARY_MAIN};
    font-weight: 400;
    line-height: 2;
    display: block;
  }

  .estimation {
    cursor: pointer;
    border: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    h4 {
      margin: 0;
    }
    img {
      margin: 0;
      border: none;
      width: 46px;
      height: 46px;
      object-fit: contain;
    }
  }
`;
export const ChurchHeroStyled = styled.div`
  .avatar {
    position: absolute;
    left: 0;
    top: 0;
    width: 60%;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    img {
      margin-right: 0 !important;
      width: 100%;
      height: 300px;
      object-fit: cover;
      object-position: center;
    }
  }

  .top-container {
    padding: 40px;
    overflow: hidden;
    background-image: url('https://firebasestorage.googleapis.com/v0/b/lessons-ksu.appspot.com/o/static%2Fpreview%20(10).webp?alt=media&token=a22a2da8-1821-4366-805a-6fce2bf456f8');
    height: 300px;
    position: relative;

    &:after {
      content: '';
      width: 1000px;
      height: 300px;
      border-radius: 50%;
      background-color: ${DARK_BG};
      position: absolute;
      top: -80px;
      right: 8%;
      z-index: 1;
    }

    &:before {
      content: '';
      width: 1000px;
      height: 800px;
      border-radius: 50%;
      background-color: ${CREAM};
      position: absolute;
      top: -60px;
      right: 10%;
      z-index: 1;
    }

    .title {
      text-align: right;
      position: relative;
      white-space: nowrap;
      text-overflow: ellipsis;
      z-index: 2;
      color: ${CREAM};

      &:after {
        content: '';
        width: 500px;
        height: 1px;
        position: absolute;
        bottom: 0;
        right: 0;
        background-image: linear-gradient(
          to right,
          transparent 0%,
          ${CREAM} 100%
        );
      }
    }
    .actions {
      width: 600px;
      padding: 10px;
      position: absolute;
      bottom: 0;
      right: 0;
      min-height: 50px;

      .button-wrapper {
        right: 10px;
        bottom: 10px;
        position: absolute;
      }
    }
    &.scenario {
      .meta {
        font-family: Comfortaa, sans-serif;
        font-size: 1.5em;
        font-weight: 300;
        position: relative;
        z-index: 2;
        margin: 20px 0;
        color: ${CREAM};

        p {
          margin: 0;
          text-align: right;
        }
      }
    }
  }
`;
