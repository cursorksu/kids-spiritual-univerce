import {
    KsuStatusStyled,
    StatusListStyled,
} from './KsuStatusStyled';
import { clsx } from 'clsx';
import { publicStatuses } from '../../constants/statuses/publicStatuses';
import { useTranslation } from 'react-i18next';
import { Popover } from 'antd';
import { useEditEntity } from '../../api/entity/useEditEntity';
import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';

export const KsuStatus = ({ status, entityName, onStatusChange, entityId, className }) => {
    const { t } = useTranslation('tr');
    const { user } = useSelector((state) => state.auth);
    // TODO: не давать править урок в статусе ожидания аппрува или давать
    //  править тольк уроки в статусе драфт!!!
    const { editEntity } = useEditEntity(entityName);

    const publicList = [
        { id: 4, text: 'status.labels.draft', description: 'status.draft' },
    ];
    const activeList = [
        { id: 1, text: 'status.labels.published', description: 'status.published' },
        { id: 4, text: 'status.labels.draft', description: 'status.draft' },
    ];
    const draftList = [
        { id: 1, text: 'status.labels.published', description: 'status.published' },
        { id: 3, text: 'status.labels.active', description: 'status.active' },
    ];
    const handleChange = (statusId) => {
        user?.uid &&
        editEntity({
            id: entityId,
            status: statusId,
        }).then(() => onStatusChange(statusId));
    };

    const content = (
            <StatusListStyled>
                {status === publicStatuses.draft &&
                 draftList.map((el) => (
                         <li key={el.text} onClick={() => handleChange(el.id)}>
                             <div className="title">{t(el.text)}</div>
                             <div className="description">{t(el.description)}</div>
                         </li>
                 ))}

                {status === publicStatuses.active &&
                 activeList.map((el) => (
                         <li key={el.text} onClick={() => handleChange(el.id)}>
                             <div className="title">{t(el.text)}</div>
                             <div className="description">{t(el.description)}</div>
                         </li>
                 ))}

                {status === publicStatuses.published &&
                 publicList.map((el) => (
                         <li key={el.text} onClick={() => handleChange(el.id)}>
                             <div className="title">{t(el.text)}</div>
                             <div className="description">{t(el.description)}</div>
                         </li>
                 ))}
            </StatusListStyled>
    );

    return status !== publicStatuses.waiting
            ? (
                    <Popover content={content} title="Status: ">
                        <KsuStatusStyled
                                className={clsx(className, {
                                    public: status === publicStatuses.published,
                                    waiting: status === publicStatuses.waiting,
                                    active: status === publicStatuses.active,
                                    draft: status === publicStatuses.draft,
                                })}>
                            {status === publicStatuses.published && t('status.labels.published')}
                            {status === publicStatuses.waiting && t('status.labels.waiting')}
                            {status === publicStatuses.active && t('status.labels.active')}
                            {status === publicStatuses.draft && t('status.labels.draft')}
                        </KsuStatusStyled>
                    </Popover>
            )
            : (
                    <KsuStatusStyled
                            className={clsx(className, {
                                waiting: status === publicStatuses.waiting,
                            })}>
                        {status === publicStatuses.waiting && t('status.labels.waiting')}
                    </KsuStatusStyled>
            );
};

KsuStatus.propTypes = {
    status: PropTypes.oneOf([1, 2, 3, 4]).isRequired,
    entityName: PropTypes.string.isRequired,
    onStatusChange: PropTypes.func.isRequired,
    entityId: PropTypes.string.isRequired,
    className: PropTypes.string,
};
