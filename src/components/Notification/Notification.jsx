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

    const openNotification = (pauseOnHover) => () => {
        api.open({
            type: notificationText?.type,
            message: notificationText?.message.title,
            description: notificationText?.message.description,
            showProgress: true,
            pauseOnHover,
        });
    };


    useEffect(() => {
        let timout = setTimeout(() => {
            dispatch(deleteMessage());
            openNotification(true)();
        }, duration);

        return () => clearTimeout(timout);
    }, [dispatch, openNotification]);

  return (
      <div  className={clsx(notificationText?.type, { open: notificationText?.type })}>
          {contextHolder}
      </div>
  );
};
