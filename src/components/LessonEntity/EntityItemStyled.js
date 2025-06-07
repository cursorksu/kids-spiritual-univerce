import styled from '@emotion/styled';
import {
    BG_GOLD,
    BOX_SHADOW_GOLD, CHOCO, CREAM,
    DARK_GRAY,
    GOLD, YELLOW_LIGHT,
} from '../../constants/colors';
import {ScenarioStyled} from '../Scenario/styles';

export const EntityListStyled = styled(ScenarioStyled)`
    padding: 0 10px 40px;
    
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
        padding: 10px;
        p, li, a {
            font-size: 16px !important;
            line-height: 1.5;
            margin: 4px;
        }
        
    }

    .item-content {
        display: grid;
        grid-template-columns: 200px 1fr;
        grid-gap: 20px;

        .item-title {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .image {
            width: 200px;
            height: 200px;
            text-align: center;

            img {
                width: 200px;
                height: 200px;
                object-fit: cover;
                overflow: hidden;
                border-radius: 20px 0 0 20px;
                box-shadow: ${BOX_SHADOW_GOLD};
            }
        }
    }

    .content-wrapper {
        .content-list {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-gap: 20px;
        }
    }
`;
export const EntityItemStyled = styled('div')`
    color: ${DARK_GRAY};
    position: relative;
    min-height: 100px;
    font-family: 'Comfortaa', sans-serif;
    font-weight: 300;
    background: ${YELLOW_LIGHT};
    box-shadow: ${BOX_SHADOW_GOLD};
    border-radius: 20px;
    cursor: pointer;
    
    .meta {
        p {
            margin: 0;
            font-size: 12px !important;
            color: ${CHOCO};
        }
    }

    &:after {
        content: '\\002B';
        font-size: 2.4rem;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 10px;
        right: 10px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: ${BG_GOLD};
        color: ${GOLD};
        z-index: 0;
    }

    .item-title {
        padding: 10px 40px 10px 0;
    }

    &.expanded {
        position: fixed;
        top: 80px;
        left: 180px;
        right: 80px;
        bottom: 80px;
        z-index: 10;
        overflow-y: auto;
        background: ${CREAM};
        box-shadow: 0 0 120px rgba(0, 0, 0, 2);

        &:after {
            content: '\\2212';
        }
        
        .image {
            img {
                border-radius: 20px 0 0 0 !important;
            }
        }
        
        .item-content {
            background: ${YELLOW_LIGHT};;
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
`;
export const GameListStyled = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: 30px;
    margin-bottom: 30px;
    `;
export const MemoryItemStyled = styled.div`
    .img-wrapper {
        width: 100px;
        height: 100px;
        border-radius: 20px;
        overflow: hidden;
        
        img {
            width: 100px;
            height: 100px;
            object-fit: cover;
        }
    }
`
