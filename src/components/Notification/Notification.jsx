import { useEffect } from 'react';
import { notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMessage } from '../../store/notificationReducer';
import clsx from 'clsx';

export const Notification = () => {
    const notificationText = useSelector((state) => state.notification);
    const dispatch = useDispatch();
    const duration = 10000;
    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        if (notificationText?.type) {
            api.open({
                type: notificationText.type,
                message: notificationText.message.title,
                description: notificationText.message.description,
                duration: duration / 1000,
                onClose: () => {
                    dispatch(deleteMessage());
                },
            });
        }
    }, [notificationText, api, dispatch, duration]);

    return notificationText?.type ? (
        <div className={clsx(notificationText.type, { open: notificationText.type })}>
            {contextHolder}
        </div>
    ) : null;
};