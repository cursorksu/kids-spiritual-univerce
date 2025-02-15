import { KsuCard } from '../../KsuCard';
import { ButtonIconMiniStyled } from '../../ButtonStyled';
import { Controller } from 'react-hook-form';
import { Checkbox } from 'antd';
import { DynamicList } from '../../DynamicList/DynamicList';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { SaveIcon } from '../../../assets/SaveIcon.jsx';

import PropTypes from 'prop-types';
import { EditIcon } from '../../../assets/EditIcon.jsx';

export const StaffList = ({
    lesson,
    onEdit,
}) => {
    const [isMaterialEdit, setIsMaterialEdit] = useState(false);
    const { user } = useSelector((state) => state.auth);
    return (
            <KsuCard
                    title={'Що треба взяти'}
                    action={user?.uid && lesson?.createdBy?.uid === user?.uid && (
                            !isMaterialEdit
                                    ? (
                                            <ButtonIconMiniStyled onClick={() => setIsMaterialEdit(true)}>
                                                <EditIcon/>
                                            </ButtonIconMiniStyled>
                                    )
                                    : (
                                            <ButtonIconMiniStyled onClick={() => onEdit('material')}>
                                                <SaveIcon/>
                                            </ButtonIconMiniStyled>
                                    )
                    )}>
                <div>
                    {isMaterialEdit
                            ? (
                                    <Controller
                                            name="material"
                                            control={control}
                                            render={({ field }) => (
                                                    <>
                                                        <DynamicList
                                                                field={field}
                                                                initialField={field.value}
                                                                onChangeField={(data) => setValue('material',
                                                                        data.value)}
                                                        />
                                                    </>
                                            )}
                                    />
                            )
                            : (
                                    <ul className="material-list">
                                        {lesson?.material?.map((el) => (
                                                <li key={el.key}>
                                                    <Checkbox label={{ children: el.value }}/>
                                                </li>
                                        ))}
                                    </ul>
                            )}
                </div>
            </KsuCard>
    );
};

StaffList.propTypes = {
    lesson: PropTypes.shape({
        material: PropTypes.arrayOf(
                PropTypes.shape({
                    key: PropTypes.string.isRequired,
                    value: PropTypes.string.isRequired,
                }),
        ),
        createdBy: PropTypes.shape({
            uid: PropTypes.string,
        }),
    }),
    onEdit: PropTypes.func.isRequired,
};
