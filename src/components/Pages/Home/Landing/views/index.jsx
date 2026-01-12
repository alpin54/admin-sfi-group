// -- libraries
import { Breadcrumb } from 'antd';
import Link from 'next/link';

// -- styles
import style from '@components/Pages/Home/Landing/styles/style.module.scss';

// -- hooks
import useConfirmationModal from '@hooks/useConfirmationModal';
import useNotification from '@hooks/useNotification';

// -- elements
import CardUserLogWidget from '@components/Elements/CardUserLog/views';

// -- components
import FormHomeSection1Widget from '@components/Pages/Home/FormSection1/widgets/Default';
import FormHomeSection2Widget from '@components/Pages/Home/FormSection2/widgets/Default';
import FormHomeSection3Widget from '@components/Pages/Home/FormSection3/widgets/Default';
import FormHomeSection4Widget from '@components/Pages/Home/FormSection4/widgets/Default';
import FormHomeSection5Widget from '@components/Pages/Home/FormSection5/widgets/Default';
import FormHomeSection6Widget from '@components/Pages/Home/FormSection6/widgets/Default';

const HomeView = (props) => {
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
              { title: method === 'edit' ? 'Edit Detail Home' : 'Detail Home' }
            ]}
          />
        </div>

        <div className='row-container'>
          <FormHomeSection1Widget method={method} confirm={confirm} notify={notify} />
        </div>
        <div className='row-container'>
          <FormHomeSection2Widget method={method} confirm={confirm} notify={notify} />
        </div>
        <div className='row-container'>
          <FormHomeSection3Widget method={method} confirm={confirm} notify={notify} />
        </div>
        <div className='row-container'>
          <FormHomeSection4Widget method={method} confirm={confirm} notify={notify} />
        </div>
        <div className='row-container'>
          <FormHomeSection5Widget method={method} confirm={confirm} notify={notify} />
        </div>
        <div className='row-container'>
          <FormHomeSection6Widget method={method} confirm={confirm} notify={notify} />
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

export default HomeView;
