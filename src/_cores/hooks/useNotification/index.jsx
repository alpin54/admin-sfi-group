// -- libraries
import { notification } from 'antd';

const useNotification = () => {
  const [api, contextHolder] = notification.useNotification();

  const notify = ({
    type = 'info',
    message = 'Notification',
    description,
    icon,
    duration = 3,
    placement = 'topRight',
    ...rest
  }) => {
    api[type]({
      message,
      description,
      icon,
      duration,
      placement,
      ...rest
    });
  };

  return { notify, contextHolder };
};

export default useNotification;
