import { KsuCard } from '../../KsuCard';
import { ButtonIconMiniStyled } from '../../ButtonStyled';
import {
    FormFieldStyled,
    InputStyled,
} from '../../InputStyled';
import { EditIcon } from '../../../assets/EditIcon.jsx';
import { SaveIcon } from '../../../assets/SaveIcon.jsx';
import React, {
    useEffect,
    useState,
} from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useEditEntity } from '../../../api/entity/useEditEntity.js';
import { CloseIcon } from '../../../assets/CloseIcon.jsx';

export const BibleText = ({ lesson, onConfirm }) => {
    const { editEntity } = useEditEntity('lessons');
    const [isEdit, setIsEdit] = React.useState(false);
    const { user } = useSelector((state) => state.auth);
    const [text, setText] = useState({});

    useEffect(() => {
        if (lesson?.id) {
            setText({
                bibleText: lesson.bibleText,
                bibleQuote: lesson.bibleQuote,
            });
        }
    }, [lesson]);

    const handleChange = ({ target }) => {
        setText(prev => (
                { ...prev, [target.name]: target.value }
        ));
    };

    const onSave = async () => {
        await editEntity({ ...lesson, ...text });
        setIsEdit(false);
        onConfirm();
    }
    return lesson?.bibleText
            ? (
                    <KsuCard
                            className={'bible'}
                            title={lesson?.bibleQuote}
                            action={user?.uid && lesson?.createdBy?.uid === user?.uid && (
                                    <>
                                        {!isEdit
                                                ? (
                                                        <ButtonIconMiniStyled onClick={() => setIsEdit(true)}>
                                                            <EditIcon/>
                                                        </ButtonIconMiniStyled>
                                                )
                                                : (
                                                        <>
                                                            <ButtonIconMiniStyled
                                                                    onClick={onSave}>
                                                                <SaveIcon/>
                                                            </ButtonIconMiniStyled>
                                                            <ButtonIconMiniStyled
                                                                    onClick={() => setIsEdit(false)}>
                                                                <CloseIcon/>
                                                            </ButtonIconMiniStyled>
                                                        </>

                                                )}
                                    </>
                            )}>
                        <div>
                            {isEdit
                                    ? (
                                            <div className="print-hide">
                                                <FormFieldStyled>
                                                    <InputStyled
                                                            name="bibleText"
                                                            value={text.bibleText}
                                                            placeholder={'Біблійний текст'}
                                                            onChange={handleChange}
                                                    />
                                                </FormFieldStyled>
                                                <FormFieldStyled>
                                                    <InputStyled
                                                            name="bibleQuote"
                                                            value={text.bibleQuote}
                                                            placeholder={'Де написаний'}
                                                            onChange={handleChange}
                                                    />
                                                </FormFieldStyled>
                                            </div>
                                    )
                                    : <p>{lesson?.bibleText}</p>}
                        </div>
                    </KsuCard>
            )
            : null;
};

BibleText.propTypes = {
    lesson: PropTypes.shape({
        id: PropTypes.string,
        bibleQuote: PropTypes.string,
        bibleText: PropTypes.string,
        createdBy: PropTypes.shape({
            uid: PropTypes.string,
        }),
    }).isRequired,
    onConfirm: PropTypes.func.isRequired,
};