// -- libraries
import { Button, Space } from 'antd';

// -- hooks
import useConfirmationModal from '@hooks/useConfirmationModal';
import useNotification from '@hooks/useNotification';

// -- states
import useStateMenu from '@components/Sidebar/states';

// -- elements
import CardUserLogWidget from '@components/Elements/CardUserLog/widgets/Default';

// -- components
import FeatureWidget from '@components/Dealer/Reward/Feature/widgets/Default';
import FormRewardWidget from '@components/Dealer/Reward/Form/widgets/Default';

const RewardView = (props) => {
  const { method } = props;
  const { confirm, contextHolder: confirmHolder } = useConfirmationModal();
  const { notify, contextHolder: notificationHolder } = useNotification();
  const { menu } = useStateMenu();

  return (
    <>
      {confirmHolder}
      {notificationHolder}
      <section>
        <div className='row-container'>
          <Space size={20}>
            <Button color={menu === 'dealer-rewards' ? 'primary' : ``} variant='outlined' href='/dealer-rewards'>
              Reward Points
            </Button>
            <Button color={menu === 'dealer-setting' ? 'primary' : ``} variant='outlined' href='/dealer-setting'>
              Setting Points
            </Button>
          </Space>
        </div>
        <div className='row-container'>
          <FormRewardWidget method={method} confirm={confirm} notify={notify} />
        </div>
        <div className='row-container'>
          <FeatureWidget method={method} confirm={confirm} notify={notify} />
        </div>
      </section>
      <CardUserLogWidget
        created_by={1}
        updated_by={1}
        created_at={'2025-08-15T06:06:51.338Z'}
        updated_at={'2025-08-15T06:06:51.338Z'}
      />
    </>
  );
};

export default RewardView;
