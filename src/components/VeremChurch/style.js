import styled from '@emotion/styled';
import { BOX_SHADOW, BOX_SHADOW_GOLD, CHOCO, CREAM, VEREM_GOLD } from '../../constants/colors'

export const VeremContentChurchItem = styled('div')`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 20px;
    
    h4 {
       text-align: left;
    }
    
  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    display: block;
    margin-right: 20px;
  }
`;


export const GroupItemStyled = styled('div')`
     border: 1px solid ${VEREM_GOLD};
     padding: 20px 30px 20px;
     margin: 40px 0;
     background: #fff;
     border-radius: 30px;
	
	a {
		text-decoration: none;
		transition: color 0.3s ease;
		
		&:hover {
			color: ${CHOCO};
		}
	}
     
     .teacher-item {
        line-height: 40px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        
        &.empty {
          justify-content: center;
        }
        
        button {
          margin-right: 20px;
        }
     }
     
     .group-link {
          font-size: 1em;
          line-height: 20px;
          font-family: 'Comfortaa', sans-serif;
          color: ${VEREM_GOLD};
          font-weight: 600;
          text-align: center;
          display: block;
          width: 70%;
          padding: 10px;
          border-bottom: 1px solid ${VEREM_GOLD};
          transition: color 0.3s ease;

        &:hover {
          color: ${CHOCO}
             border-bottom: 1px solid ${CHOCO};
        }
     }
   
    .group-title {
        text-align: center;
        font-family: "Yeseva One", serif;
        font-size: 24px;
        font-weight: 400;
        line-height: 1.5;
        letter-spacing: 1px;
        margin-top: 0 !important;
    }
  `;
export const InviteStyled = styled('div')`
	text-align: center;
	
	p {
		text-align: center;
		font-weight: 600;
		margin-bottom: 20px;
	}
	
	button {
		background: linear-gradient(90deg, #f0c674, ${VEREM_GOLD}, ${VEREM_GOLD}, #f0c674);
		background-size: 200%;
		transition: background 3s ease, box-shadow 0.3s ease;
		color: ${CREAM};
		margin-left: 2px !important;
		padding: 3px;
		width: 28px;
		height: 28px;
	}
	
	.invite-panel {
		width: 84%;
		margin: auto;
		background: ${CREAM};
		box-shadow: ${BOX_SHADOW_GOLD};
		border-radius: 30px;
		padding: 8px 8px 8px 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-family: 'Comfortaa', sans-serif;
		
		span {
			font-size: 16px;
			font-weight: 700;
		}
	}
	`;

export const ContentListStyled = styled('div')`
	display: flex;
	gap: 20px;
	margin: 30px 0;
	position: relative;
	padding-right: 30px;
	
	ul {
		list-style-type: none;
		padding: 0;
		margin: 0;
		overflow: hidden;
	}
	
	li {
		text-overflow: ellipsis;
		white-space: nowrap;
		line-height: 1.5rem;
		overflow: hidden;
	}
	
	h3 {
		width: 100%;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
	
	.delete-button {
		position: absolute;
		right: 0;
		top: 0;
	}
	
	img {
		width: 100px;
		height: 100px;
		object-fit: cover;
		border-radius: 0;
	}
	`;

export const ChurchItemStyled = styled('div')`
  font-size: 1em;
  line-height: 20px;
  font-family: 'Comfortaa', sans-serif;
  color: #000;
  margin: 40px 0;
  
   .avatar-placeholder {
      object-fit: contain;
      width: 60%;
      object-position: center center;
      display: block;
      margin: auto;
   }

  ul {
    list-style-type: none;
    padding: 0;
    margin-top: 20px;
    text-align: left;
    
    li {
      margin-bottom: 10px;
    }
    
    span {
      font-weight: 700;
    }
  }
  
  h3 {
    margin: 0 !important;
  }

  img {
    width: 100%;
    height: 350px;
    object-fit: cover;
    border-radius: 0;
  }
`;