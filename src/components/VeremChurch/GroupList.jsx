import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { useAssignGroupToChurch } from '../../api/refs/useAssignGroupToChurch';
import { useAssignGroupTeacher } from '../../api/refs/useAssignGroupTeacherю';
import { useParams } from 'react-router';
import { useGetEntityListByIds } from '../../api/entity/useGetEntityListByIds';
import { VeremChips } from './VeremChurchContent';
import { GroupTeachersList } from './GroupTeachersList';
import { GroupItemStyled } from './style';
import clsx from 'clsx';
import { DeleteConfirmationModal } from '../Modal/DeleteConfirmationModal';
import { EditGroupModal } from './EditGroupModal';


export const GroupList = ({ isAuth, church, onEdit }) => {
    const { t } = useTranslation('tr');
    const { churchId } = useParams();
    const [ shouldUpdate, forceUpdate ] = useState(false);
    const { getEntities: getGroups, entities: groups } =
        useGetEntityListByIds('group');

    const { removeGroupFromChurch } = useAssignGroupToChurch();
    const { removeTeacherFromGroup } = useAssignGroupTeacher();

    useEffect(() => {
        church?.groups && getGroups(church?.groups);
    }, [ church, getGroups, shouldUpdate ]);

    const deleteGroup = useCallback(
        async (group) => {
            try {
                for (const teacherId of group.teachers) {
                    await removeTeacherFromGroup(group.id, teacherId);
                }

                await removeGroupFromChurch(churchId, group.id);
                onEdit();
                if (church?.groups?.length < 1) {
                    await getGroups([]);
                }
            } catch (e) {
                throw new Error(e);
            }
        },
        [
            removeTeacherFromGroup,
            removeGroupFromChurch,
            onEdit,
            getGroups,
            church,
            churchId,
        ]
    );

    return (
        <div>
            <div className={clsx({ 'd-flex-between': isAuth, 'd-flex-center': !isAuth })}>
                <VeremChips>{t('church.labels.groups')}</VeremChips>
                {isAuth && (
                    <EditGroupModal
                        forceUpdate={forceUpdate}
                        churchId={churchId}
                        onEdit={onEdit}
                        churchTeachersList={church?.teachers}
                    />
                )}
            </div>
            {church && church?.groups?.length ? (
                groups?.map((el) => (
                    <GroupItemStyled key={el.id}>
                        {isAuth && (
                            <div className={'d-flex-between'}>
                                <NavLink to={`/group/${el.id}`} className={'group-link'}>
                                    go to group
                                </NavLink>
                                <div>
                                    <EditGroupModal
                                        forceUpdate={forceUpdate}
                                        group={el}
                                        churchId={churchId}
                                        onEdit={onEdit}
                                        churchTeachersList={church?.teachers}
                                    />
                                    <DeleteConfirmationModal
                                        forceUpdate={forceUpdate}
                                        modalTitle={`${t('modal.title.deleteGroup')} ${el?.title.toString()}`}
                                        modalContent={`${t('modal.groupDelete')}`}
                                        onConfirm={() => deleteGroup(el)}
                                    />
                                </div>
                            </div>
                        )}
                        <div>
                            <img src={el?.avatar && el?.avatar} alt={el.firstName}/>
                            <h1 className={'group-title'}>{el.title}</h1>
                            <h3>{el.description}</h3>
                            {el?.teachers?.length
                             ? (
                                 <div>
                                     <GroupTeachersList idsList={el?.teachers}/>
                                     <div className="content-block">
                                         <h3>{t('group.label.studentsAmount')}: {el?.students?.length}</h3>
                                     </div>
                                 </div>
                             )
                             : (
                                 <div className={'teacher-item empty'}>
                                     {t('group.label.no-teachers')}
                                 </div>
                             )}
                        </div>
                    </GroupItemStyled>
                ))
            ) : <div className={'content-block-placeholder'}>{t('group.no-group')}</div>}
        </div>
    );
};
