import {
    useState,
    useEffect,
    useMemo,
} from 'react';
import {
    ButtonIconMiniStyled,
} from '../ButtonStyled';
import { AddIcon } from '../../assets/AddIcon.jsx';
import { DeleteIcon } from '../../assets/DeleteIcon.jsx';
import { MinusIcon as RemoveIcon } from '../../assets/MinusIcon.jsx';
import { InputStyled } from '../InputStyled';
import { DndItemStyled } from './DndItemStyled';
import { generateId } from '../../utils/generateId';
import PropTypes from 'prop-types';

export const DynamicList = ({ list, onChangeList }) => {
    const initialItem = useMemo(() => ({
        id: generateId(),
        value: '',
    }), []);

    const handleAdd = () => {
        const newItem = { id: generateId(), value: '' };
        onChangeList([...list, newItem]);
    };
    const handleRemove = (id) => {
        onChangeList(list?.filter((el) => el?.id !== id));
    };

    const handleReset = () => {
        onChangeList([initialItem]);
    };

    const onChange = ({target}, id) => {
        onChangeList(list.map((item) => (item?.id === id ? { ...item, value: target.value } : item)));
    };

    return (
            <div>
            <span className="btn-wrapper">
                <ButtonIconMiniStyled onClick={handleAdd}>
                    <AddIcon />
                </ButtonIconMiniStyled>
                <ButtonIconMiniStyled onClick={handleReset}>
                    <DeleteIcon />
                </ButtonIconMiniStyled>
            </span>
                <ul>
                    {list?.map((el, index) => (
                            <li key={index.toString()}>
                                <DndItemStyled>
                                    <InputStyled
                                            id={`${el?.id}`}
                                            name={`${el?.id}`}
                                            placeholder="Наступний елемент списку"
                                            value={el?.value}
                                            onChange={(e) => onChange(e, el?.id)}
                                    />
                                    <ButtonIconMiniStyled
                                            className="remove-handle"
                                            onClick={() => handleRemove(el?.id)}
                                    >
                                        <RemoveIcon />
                                    </ButtonIconMiniStyled>
                                </DndItemStyled>
                            </li>
                    ))}
                </ul>
            </div>
    );
};

DynamicList.propTypes = {
    list: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
        })
    ).isRequired,
    onChangeList: PropTypes.func.isRequired,
};
