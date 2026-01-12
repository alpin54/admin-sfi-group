// -- libraries
import { Breadcrumb } from 'antd';
import Link from 'next/link';

// -- styles
import style from '@components/Pages/Faq/Landing/styles/style.module.scss';

// -- hooks
import useConfirmationModal from '@hooks/useConfirmationModal';
import useNotification from '@hooks/useNotification';

// -- elements
import CardUserLogWidget from '@components/Elements/CardUserLog/views';

// -- components
import FormFaqSection1Widget from '@components/Pages/Faq/FormSection1/widgets/Default';
import FormFaqSection2Widget from '@components/Pages/Faq/FormSection2/widgets/Default';
import FormFaqSection3Widget from '@components/Pages/Faq/FormSection3/widgets/Default';

const FaqView = (props) => {
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
              { title: method === 'edit' ? 'Edit Detail Faq' : 'Detail Faq' }
            ]}
          />
        </div>

        <div className='row-container'>
          <FormFaqSection1Widget method={method} confirm={confirm} notify={notify} />
        </div>
        <div className='row-container'>
          <FormFaqSection2Widget method={method} confirm={confirm} notify={notify} />
        </div>
        <div className='row-container'>
          <FormFaqSection3Widget method={method} confirm={confirm} notify={notify} />
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

export default FaqView;
