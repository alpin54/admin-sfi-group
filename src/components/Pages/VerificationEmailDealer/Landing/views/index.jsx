// -- libraries
import { Breadcrumb } from 'antd';
import Link from 'next/link';

// -- styles
import style from '@components/Pages/VerificationEmailDealer/Landing/styles/style.module.scss';

// -- hooks
import useConfirmationModal from '@hooks/useConfirmationModal';
import useNotification from '@hooks/useNotification';

// -- elements
import CardUserLogWidget from '@components/Elements/CardUserLog/views';

// -- components
import BannerWidget from '@components/Pages/VerificationEmailDealer/Banner/widgets/Default';
import FormVerificationEmailDealerWidget from '@components/Pages/VerificationEmailDealer/Form/widgets/Default';

const VerificationEmailDealerView = (props) => {
  const { method } = props;
  const { confirm, contextHolder: confirmHolder } = useConfirmationModal();
  const { notify, contextHolder: notificationHolder } = useNotification();

  return (
    <>
      {confirmHolder}
      {notificationHolder}
      <section>
        <div className='row-container'>
          <Breadcrumb
            items={[
              { title: <Link href='/pages'>Pages</Link> },
              { title: method === 'edit' ? 'Edit Verification Email Dealer' : 'Detail Verification Email Dealer' }
            ]}
          />
        </div>
        <div className='row-container'>
          <BannerWidget method={method} confirm={confirm} notify={notify} />
        </div>
        <div className='row-container'>
          <FormVerificationEmailDealerWidget method={method} confirm={confirm} notify={notify} />
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

export default VerificationEmailDealerView;
