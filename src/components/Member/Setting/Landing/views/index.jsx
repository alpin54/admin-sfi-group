// -- libraries
import { Button, Space } from 'antd';

// -- hooks
import useNotification from '@hooks/useNotification';

// -- states
import useStateMenu from '@components/Sidebar/states';

// -- elements
import CardUserLogWidget from '@components/Elements/CardUserLog/widgets/Default';

// -- components
import RewardPointWidget from '@components/Member/Setting/RewardPoint/widgets/Default';
import ReviewRewardWidget from '@components/Member/Setting/ReviewReward/widgets/Default';

const SettingView = (props) => {
  const { method } = props;
  const { notify, contextHolder: notificationHolder } = useNotification();
  const { menu } = useStateMenu();

  return (
    <>
      {notificationHolder}
      <section>
        <div className='row-container'>
          <Space size={20}>
            <Button color={menu === 'member-rewards' ? 'primary' : ``} variant='outlined' href='/member-rewards'>
              Setting Points
            </Button>
            <Button color={menu === 'member-setting' ? 'primary' : ``} variant='outlined' href='/member-setting'>
              Setting Points
            </Button>
          </Space>
        </div>
        <div className='row-container'>
          <RewardPointWidget method={method} notify={notify} />
        </div>
        <div className='row-container'>
          <ReviewRewardWidget method={method} notify={notify} />
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

export default SettingView;
