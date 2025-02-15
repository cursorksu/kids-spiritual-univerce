import React, { useCallback, useState } from 'react';
import { ButtonIconMiniStyled, ButtonStyled } from '../ButtonStyled';
import { useAssignTeacherChurch } from '../../api/refs/useAssignTeacherChurch';
import { TeacherItem } from './TeacherItem';
import { KsuTeachersDropdown } from '../KsuDropdown/KsuTeachersDropdown';
import { useTranslation } from 'react-i18next';
import { VeremChips } from './VeremChurchContent';
import { AddIcon } from '../../assets/AddIcon.jsx';
import { MinusIcon as RemoveIcon } from '../../assets/MinusIcon.jsx';
import clsx from 'clsx';
import { Invite } from './Invite';

export const TeachersList = ({
    isAuth,
    church,
    onEdit
}) => {
    const { t } = useTranslation('tr');
    const {
              addTeacherToChurch,
              removeTeacherFromChurch
          } = useAssignTeacherChurch();
    const [isFormShown, setIsFormShown] = useState(false);
    
    const handleRemoveTeacher = useCallback(async (teacherId) => {
        await removeTeacherFromChurch(church.id, teacherId);
        onEdit();
    }, [church]);
    
    const [teacherIdxList, setTeacherIdxList] = useState([]);
    const handleChangeTeacherList = async (data) => {
        setTeacherIdxList(data.value);
    };
    
    const handleAddTeachers = useCallback(async () => {
        for (const teacherId of teacherIdxList) {
            await addTeacherToChurch(church.id, teacherId);
        }
        
        setIsFormShown(false);
        onEdit();
    }, [
        church,
        addTeacherToChurch,
        onEdit,
        teacherIdxList
    ]);
    
    return (<>
                <div className={clsx({
                    'd-flex-between': isAuth,
                    'd-flex-center': !isAuth
                })}
                    >
                    <VeremChips>{`${t('church.labels.teachers')}`}</VeremChips>
                    {isAuth && (<ButtonIconMiniStyled onClick={() => setIsFormShown((prev) => !prev)}>
                                {!isFormShown ? <AddIcon/> : <RemoveIcon/>}
                            </ButtonIconMiniStyled>)}
                </div>
                <div>
                    {isFormShown ? (<div>
                                <KsuTeachersDropdown
                                        value={teacherIdxList}
                                        placeholder={'Select teacher'}
                                        multiple
                                        search
                                        selection
                                        pointing={'top right'}
                                        onChange={handleChangeTeacherList}
                                />
                                <div className="button-wrapper">
                                    <ButtonStyled
                                            className="secondary"
                                            onClick={() => setIsFormShown(false)}>
                                        {t('button.cancel')}
                                    </ButtonStyled>
                                    <ButtonStyled onClick={handleAddTeachers}>
                                        {t('button.add')}
                                    </ButtonStyled>
                                </div>
                            </div>) : null}
                    <>
                        {church?.teachers?.length > 0 && church.teachers.map((teacherId) => (<TeacherItem
                                        key={teacherId}
                                        entityName={'users'}
                                        id={teacherId}
                                        removeEntity={handleRemoveTeacher}
                                        isAuth={isAuth}
                                />))}
                        {isAuth && <Invite church={church} />}
                    </>
                </div>
            </>);
};
