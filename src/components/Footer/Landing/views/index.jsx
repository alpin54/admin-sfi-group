// -- libraries
import { Breadcrumb } from 'antd';
import Link from 'next/link';

// -- hooks
import useConfirmationModal from '@hooks/useConfirmationModal';
import useNotification from '@hooks/useNotification';

// -- elements
import CardUserLogWidget from '@components/Elements/CardUserLog/widgets/Default';

// -- components
import FormFooterSection1Widget from '@components/Footer/FormSection1/widgets/Default';
import FormFooterSection2Widget from '@components/Footer/FormSection2/widgets/Default';
import FormFooterSection3Widget from '@components/Footer/FormSection3/widgets/Default';
import FormFooterSection4Widget from '@components/Footer/FormSection4/widgets/Default';
import FormFooterSection5Widget from '@components/Footer/FormSection5/widgets/Default';

const FooterView = (props) => {
  const { method } = props;
  const { confirm, contextHolder: confirmHolder } = useConfirmationModal();
  const { notify, contextHolder: notificationHolder } = useNotification();

  return (
    <>
      {confirmHolder}
      {notificationHolder}
      <section>
        <div className='row-container'>
          <Breadcrumb items={[{ title: <Link href='/pages'>Pages</Link> }, { title: ' Detail Footer' }]} />
        </div>

        <div className='row-container'>
          <FormFooterSection1Widget method={method} confirm={confirm} notify={notify} />
        </div>
        <div className='row-container'>
          <FormFooterSection2Widget method={method} confirm={confirm} notify={notify} />
        </div>
        <div className='row-container'>
          <FormFooterSection3Widget method={method} confirm={confirm} notify={notify} />
        </div>
        <div className='row-container'>
          <FormFooterSection4Widget method={method} confirm={confirm} notify={notify} />
        </div>
        <div className='row-container'>
          <FormFooterSection5Widget method={method} confirm={confirm} notify={notify} />
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

export default FooterView;
