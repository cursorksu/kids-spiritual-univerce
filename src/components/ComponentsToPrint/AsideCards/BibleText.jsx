import {KsuCard} from '../../KsuCard';
import {ButtonIconMiniStyled} from '../../ButtonStyled';
import {Controller} from 'react-hook-form';
import {InputStyled} from '../../InputStyled';
import {EditIcon} from '../../../assets/EditIcon.jsx';
import {SaveIcon} from '../../../assets/SaveIcon.jsx';
import React from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';

export const BibleText = ({lesson, onEdit, control, setValue}) => {
    const [isEdit, setIsEdit] = React.useState(false);
    const {user} = useSelector((state) => state.auth);
    return lesson?.bibleText ? (
            <KsuCard
                    className={'bible'}
                    title={lesson?.bibleQuote}
                    action={user?.uid && lesson?.createdBy?.uid === user?.uid && (<>
                        {!isEdit ? (
                                <ButtonIconMiniStyled onClick={() => setIsEdit(true)}>
                                    <EditIcon/>
                                </ButtonIconMiniStyled>
                        ) : (
                                <ButtonIconMiniStyled onClick={() => onEdit('bible')}>
                                    <SaveIcon/>
                                </ButtonIconMiniStyled>
                        )}
                    </>)}>
                <div>
                    {isEdit ? (<div className="print-hide">
                        <Controller
                                name="bibleText"
                                control={control}
                                render={({field}) => (<div>
                                    <InputStyled
                                            placeholder={'Біблійний текст'}
                                            onChange={({target}) => setValue('bibleText', target.value)}
                                            {...field}
                                    />
                                </div>)}
                        />
                        <Controller
                                name="bibleQuote"
                                control={control}
                                render={({field}) => (<div>
                                    <InputStyled
                                            placeholder={'Де написаний'}
                                            onChange={({target}) => setValue('bibleQuote', target.value)}
                                            {...field}
                                    />
                                </div>)}
                        />
                    </div>) : <p>{lesson?.bibleText}</p>}
                </div>
            </KsuCard>
    ) : null;
};

BibleText.propTypes = {
    lesson: PropTypes.shape({
        bibleQuote: PropTypes.string,
        bibleText: PropTypes.string,
        createdBy: PropTypes.shape({
            uid: PropTypes.string,
        }),
    }).isRequired,
    onEdit: PropTypes.func.isRequired,
    control: PropTypes.object.isRequired,
    setValue: PropTypes.func.isRequired,
};