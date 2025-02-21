import { KsuCard } from '../../KsuCard';
import { ButtonIconMiniStyled } from '../../ButtonStyled';
import { Controller } from 'react-hook-form';
import { Empty } from 'antd';
import { DynamicList } from '../../DynamicList/DynamicList';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { SaveIcon } from '../../../assets/SaveIcon.jsx';

import PropTypes from 'prop-types';
import { EditIcon } from '../../../assets/EditIcon.jsx';
import { useTranslation } from 'react-i18next';
import { CheckboxStyled } from '../../CheckboxStyled.js';

export const StaffList = ({
    lesson,
    onEdit,
    control,
    setValue,
}) => {
    const { t } = useTranslation('tr');
    const { t: tLesson } = useTranslation('lessons');
    const [isMaterialEdit, setIsMaterialEdit] = useState(false);
    const { user } = useSelector((state) => state.auth);
    return (
            <KsuCard
                    title={tLesson('lessonMaterials')}
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
                    {lesson?.material?.length <= 0 && <Empty description={t('empty')}/>}
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
                                                    <CheckboxStyled />
                                                    <p>{el.value}</p>
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
    control: PropTypes.object.isRequired,
    setValue: PropTypes.func.isRequired,
};
