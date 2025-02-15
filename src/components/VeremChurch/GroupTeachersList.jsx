import { useGetEntityListByIds } from '../../api/entity/useGetEntityListByIds';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const GroupTeachersList = ({ idsList }) => {
    const { t } = useTranslation('tr');
    const { getEntities: getTeachers, entities: teachersList } =
        useGetEntityListByIds('users');
    useEffect(() => {
       getTeachers (idsList);
    }, [idsList]);

    return (
        <div className="content-block">
            <h3>{t('group.label.teachers')}:</h3>
            {teachersList?.length && teachersList.map((el, idx) => (
                <div className={'teacher-item'} key={idx}>
                    {el.fullName}
                </div>
            ))}
        </div>
    );
}