import { KsuCard } from '../../KsuCard';
import { ButtonIconMiniStyled } from '../../ButtonStyled';
import { Empty } from 'antd';
import { DynamicList } from '../../DynamicList/DynamicList';
import { useEffect, useState, } from 'react';
import { useSelector } from 'react-redux';
import { SaveIcon } from '../../../assets/SaveIcon.jsx';
import PropTypes from 'prop-types';
import { EditIcon } from '../../../assets/EditIcon.jsx';
import { useTranslation } from 'react-i18next';
import { CheckboxStyled } from '../../CheckboxStyled.js';
import { useEditEntity } from '../../../api/entity/useEditEntity.js';
import { CloseIcon } from '../../../assets/CloseIcon.jsx';

export const StaffList = ({
    lesson,
    onConfirm,
}) => {
    const { editEntity } = useEditEntity('lessons');
    const { t } = useTranslation('tr');
    const { t: tLesson } = useTranslation('lessons');
    const [isMaterialEdit, setIsMaterialEdit] = useState(false);
    const { user } = useSelector((state) => state.auth);
    const [material, setMaterial] = useState([]);

    useEffect(() => {
        if (lesson?.id && lesson?.material?.length > 0) {
            setMaterial(lesson.material);
        }
    }, [lesson]);

    const onSave = async () => {
        await editEntity({ ...lesson, material });
        setIsMaterialEdit(false);
        onConfirm();
    };

    const [checked, setChecked] = useState([]);

    useEffect(() => {
        const savedLesson = localStorage.getItem(lesson?.id);
        if (savedLesson) {
            const parsedLesson = JSON.parse(savedLesson);
            setChecked(parsedLesson[lesson?.id]?.materials || []);
        }
    }, [lesson?.id]);

    const saveMaterialsInLocalStorage = ({ target }) => {
        setChecked(prev => target.checked
                ? [
                    ...prev,
                    target.id,
                ]
                : prev.filter(el => el !== target.id));
        localStorage.setItem(lesson?.id, JSON.stringify({
            [lesson?.id]: {
                materials: target.checked
                        ? [
                            ...checked,
                            target.id,
                        ]
                        : checked.filter(el => el !== target.id),
            },
        }));
    };
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
                                            <>
                                                <ButtonIconMiniStyled onClick={onSave}>
                                                    <SaveIcon/>
                                                </ButtonIconMiniStyled>
                                                <ButtonIconMiniStyled
                                                        onClick={() => setIsMaterialEdit(false)}>
                                                    <CloseIcon/>
                                                </ButtonIconMiniStyled>
                                            </>
                                    )
                    )}>
                <div>
                    {!isMaterialEdit
                     && lesson?.material?.length < 1
                     && <Empty description={t('empty')}/>
                    }
                    {isMaterialEdit
                            ? (
                                    <DynamicList
                                            list={material}
                                            onChangeList={setMaterial}
                                    />
                            )
                            : (
                                    <ul className="material-list">
                                        {lesson?.material?.map((el) => (
                                                <li key={el.id}>
                                                    <CheckboxStyled
                                                            checked={checked?.includes(el.id)}
                                                            id={el.id}
                                                            onChange={saveMaterialsInLocalStorage}/>
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
        id: PropTypes.string.isRequired,
        createdBy: PropTypes.shape({
            uid: PropTypes.string,
        }),
    }),
    onConfirm: PropTypes.func.isRequired,
};
