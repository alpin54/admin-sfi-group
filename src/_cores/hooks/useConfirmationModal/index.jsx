// -- libraries
import { Modal } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';

const useConfirmationModal = () => {
  const [modal, contextHolder] = Modal.useModal();

  const confirm = ({
    title,
    icon = <ExclamationCircleFilled />,
    content = 'This action cannot be undone.',
    okText = 'Yes',
    okType = 'danger',
    cancelText = 'No',
    onSuccess,
    onFailed,
    autoClose = false,
    footer,
    autoCloseTime = 1000,
    className
  }) => {
    const instance = modal.confirm({
      title,
      icon,
      content,
      okText,
      okType,
      cancelText,
      footer,
      className: autoClose ? 'ant-modal-confirm-custom' : className ? className : '',
      okButtonProps: { color: 'primary', variant: 'solid' },
      cancelButtonProps: { color: 'primary', variant: 'outlined' },
      onOk: () => {
        onSuccess?.();
        if (autoClose) {
          setTimeout(() => {
            instance.destroy();
          }, autoCloseTime);
        }
      },
      onCancel: () => {
        onFailed?.();
      }
    });

    if (autoClose) {
      setTimeout(() => {
        instance.destroy();
      }, autoCloseTime);
    }
  };

  return { confirm, contextHolder };
};

export default useConfirmationModal;
