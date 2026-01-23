// -- libraries
import { Breadcrumb } from 'antd';
import Link from 'next/link';

// -- styles
import style from '@components/Pages/ReturnRefundPolicy/Landing/styles/style.module.scss';

// -- hooks
import useConfirmationModal from '@hooks/useConfirmationModal';
import useNotification from '@hooks/useNotification';

// -- elements
import CardUserLogWidget from '@components/Elements/CardUserLog/widgets/Default';

// -- components
import FormReturnRefundPolicySection1Widget from '@components/Pages/ReturnRefundPolicy/FormSection1/widgets/Default';
import FormReturnRefundPolicySection2Widget from '@components/Pages/ReturnRefundPolicy/FormSection2/widgets/Default';

const DashboardView = (props) => {
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
              { title: method === 'edit' ? 'Edit Detail Return & Refund Policy' : 'Detail Return & Refund Policy' }
            ]}
          />
        </div>

        <div className='row-container'>
          <FormReturnRefundPolicySection1Widget method={method} confirm={confirm} notify={notify} />
        </div>
        <div className='row-container'>
          <FormReturnRefundPolicySection2Widget method={method} confirm={confirm} notify={notify} />
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

export default DashboardView;
