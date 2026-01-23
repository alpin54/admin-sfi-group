// -- libraries
import { Breadcrumb } from 'antd';
import Link from 'next/link';

// -- styles
import style from '@components/Pages/PrivacyPolicy/Landing/styles/style.module.scss';

// -- hooks
import useConfirmationModal from '@hooks/useConfirmationModal';
import useNotification from '@hooks/useNotification';

// -- elements
import CardUserLogWidget from '@components/Elements/CardUserLog/widgets/Default';

// -- components
import FormPrivacyPolicySection1Widget from '@components/Pages/PrivacyPolicy/FormSection1/widgets/Default';
import FormPrivacyPolicySection2Widget from '@components/Pages/PrivacyPolicy/FormSection2/widgets/Default';

const PrivacyPolicyView = (props) => {
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
              { title: method === 'edit' ? 'Edit Detail Privacy Policy' : 'Detail Privacy Policy' }
            ]}
          />
        </div>

        <div className='row-container'>
          <FormPrivacyPolicySection1Widget method={method} confirm={confirm} notify={notify} />
        </div>
        <div className='row-container'>
          <FormPrivacyPolicySection2Widget method={method} confirm={confirm} notify={notify} />
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

export default PrivacyPolicyView;
