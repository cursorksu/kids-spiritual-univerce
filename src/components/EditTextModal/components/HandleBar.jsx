import { Popover, Tooltip } from 'antd';
import { ButtonIconStyled } from '../../ButtonStyled';
import {
    useEffect,
    useState,
} from 'react';
import { AddIcon } from '../../../assets/AddIcon.jsx';
import { DeleteIcon } from '../../../assets/DeleteIcon.jsx';
import { AddImageIcon } from '../../../assets/AddImageIcon.jsx';

import PropTypes from 'prop-types';

const modeSettings = {
    craft: [
        200,
        700,
        900,
        1000,
    ],
    food: [
        200,
        700,
        900,
        1000,
    ],
    game: [
        200,
        700,
        900,
        1000,
    ],
    subject: [
        200,
        700,
        900,
        1000,
    ],
    memory: [
        200,
        700,
        900,
        1000,
    ],
};

const buttonList = [
    { id: 100, tooltip: 'Додати заголовок', type: 'title' },
    {
        id: 200,
        tooltip: 'Додати підзаголовок',
        type: 'subtitle',
    },
    {
        id: 300,
        icon: <AddIcon/>,
        tooltip: 'Додати абзац тексту',
        type: 'paragraph',
    },
    {
        id: 600,
        tooltip: 'Додати список визначеннь',
        type: 'dict',
    },
    { id: 800, tooltip: 'Додати посилання', type: 'link' },
    {
        id: 900,
        icon: <AddImageIcon/>,
        tooltip: 'Додати зображення',
        type: 'image',
    },
    { id: 1000, tooltip: 'Додати відео', type: 'media' },
];
export const HandleBar = ({ mode, addEntity, clearRenderList }) => {
    const [modeButtonList, setModeButtonList] = useState(buttonList);
    useEffect(() => {
        if (mode === 'topic') return;
        setModeButtonList(
                buttonList.filter(
                        (el) => modeSettings[mode] && modeSettings[mode].includes(el?.id),
                ),
        );
    }, [mode]);

    return (
            <div className="btn-wrapper">
                {modeButtonList.map(({ id, icon, tooltip, type }) => (
                        <Popover key={id} placement="top" content={tooltip}>
                            <ButtonIconStyled onClick={() => addEntity(type)}>
                                {icon}
                            </ButtonIconStyled>
                        </Popover>
                ))}
                <Tooltip title={'Скинути всі зміни'} arrow={true}>
                    <ButtonIconStyled onClick={clearRenderList}>
                        <DeleteIcon/>
                    </ButtonIconStyled>
                </Tooltip>
            </div>
    );
};

HandleBar.propTypes = {
    mode: PropTypes.string.isRequired,
    addEntity: PropTypes.func.isRequired,
    clearRenderList: PropTypes.func.isRequired,
};