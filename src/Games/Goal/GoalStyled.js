import styled from "@emotion/styled";
import { DARK_GRAY } from "../../constants/colors.js";

export const GoalStyled = styled.div`
    width: 1000px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: ${DARK_GRAY} !important;
    padding: 100px 40px;
    color: #FFF !important;
    min-height: 100vh;

    .ant-steps-item-active {
        .ant-steps-item-title {
            color: #fff !important;
        }
    }
    
    .ant-slider-rail,
    &:not(.ant-steps-item-finish) .ant-steps-item-tail:after {
        background-color: rgba(255, 255, 255, 0.3) !important;
    }

    .ant-steps .ant-steps-item-finish > .ant-steps-item-container > .ant-steps-item-tail::after {
        background-color: #1677ff !important;
    }
    .ant-steps .ant-steps-item-finish .ant-steps-item-title {
        color: #1677ff !important;
    }
    .ant-steps-item-title {
        color: rgba(255, 255, 255, 0.3) !important;
        font-size: 2.4rem;
        font-weight: bold;
    }

    h1 {
        font-size: 3rem;
        text-transform: uppercase;
        text-align: center;
        margin: 30px auto 10px !important;
    }

    p {
        font-size: 1.5rem;
        margin: 0 auto 10px !important;
        text-align: center;

        &.start-message {
            text-transform: uppercase;
            margin-bottom: 40px !important;
        }
    }

    .block-slider {
        width: 100%;
        margin: 60px auto;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    button {
        font-size: 1.5rem;
        padding: 24px 40px;
        font-weight: bold;
    }

    .ant-input-number .ant-input-number-input {
        font-size: 1.5rem;
        text-align: center;
        font-weight: bold;
    }
    
    .mobile-buttons {
        button {
            flex-basis: 40px;
            margin: auto 20px;
            width: 40px;
            height: 40px;
        }
    }
    

    @media only screen and (max-width: 460px) {
        width: 100%;
        max-width: 100%;
        padding: 40px 20px;
        
        .ant-row {
            display: block;
           .ant-col-4,
           .ant-col-8 {
               max-width: 100% !important;
           }
            .block-slider {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                text-align: center;
                margin: 20px auto;
                
                button {
                    margin: 20px auto;
                }
                
                
            }
        }
        
        p {
            font-size: 1.2rem;
            margin: 0 auto 20px !important;
            white-space: pre-wrap;
            max-width: 100%;
            
            &.start-message {
                font-size: 1rem;
            }
        }

        h1 {
            font-size: 1.4rem;
            margin: 18px auto 60px !important;
        }

        .ant-slider {
            min-width: 300px!important;
            margin: 40px 0;
        }
    }
`;