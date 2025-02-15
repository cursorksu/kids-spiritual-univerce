import { ButtonIconMiniStyled } from '../ButtonStyled';
import { InviteStyled } from './style';
import { useCallback } from 'react';
import { TelegramIcon } from '../../assets/TelegramIcon.jsx';
import { LinkIcon } from '../../assets/LinkIcon';
import { EmailIcon } from '../../assets/EmailIcon.jsx';
import { CommentIcon as WatsUpIcon } from '../../assets/CommentIcon.jsx';
import { setMessage } from '../../store/notificationReducer';
import { useDispatch } from 'react-redux';
import { useInvite } from '../../api/invite/createInvite';
import { useTranslation } from 'react-i18next';
import { Tooltip } from 'antd';

import PropTypes from 'prop-types';

export const Invite = ({ church }) => {
    const { t } = useTranslation('tr');
    const dispatch = useDispatch();
    const { createInvite } = useInvite();
    const onCopyUrl = useCallback(async () => {
        const url = await createInvite(church?.id);
        try {
            await navigator.clipboard.writeText(url);
            dispatch(setMessage({
                type: 'success',
                message: {
                    title: t('Посилання успішно скопійоване'),
                    description: `${url} відправте це посилання поштою або зручним вам меседжером`,
                },
            }));
        } catch (error) {
            dispatch(setMessage({
                type: 'success',
                message: {
                    title: t('Посилання не було створене'),
                    description: `Перевірте інтернет з'єднання або спробуйте пізніше. ${error.message}`,
                },
            }));
        }
    }, [church]);
    return (
            <InviteStyled>
                <p>{t('church.invite')}</p>
                <div className="invite-panel">
                    <span>Запросити друзів</span>
                    <div>
                        <Tooltip placement="Копіювати посилання" arrow={true}>
                            <ButtonIconMiniStyled onClick={onCopyUrl}><LinkIcon/></ButtonIconMiniStyled>
                        </Tooltip>
                        <Tooltip placement="Відправити імейл" arrow={true}>
                            <ButtonIconMiniStyled onClick={onCopyUrl}><EmailIcon/></ButtonIconMiniStyled>
                        </Tooltip>
                        <Tooltip placement="Запросити через Tелеграм" arrow={true}>
                            <ButtonIconMiniStyled onClick={onCopyUrl}><TelegramIcon/></ButtonIconMiniStyled>
                        </Tooltip>
                        <Tooltip placement="Запросити через Watsapp" arrow={true}>
                            <ButtonIconMiniStyled onClick={onCopyUrl}><WatsUpIcon/></ButtonIconMiniStyled>
                        </Tooltip>
                    </div>
                </div>
            </InviteStyled>
    );
};

Invite.propTypes = {
    church: PropTypes.shape({
        id: PropTypes.string.isRequired,
    }).isRequired,
};