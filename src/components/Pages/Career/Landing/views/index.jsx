// -- libraries
import { Breadcrumb } from 'antd';
import Link from 'next/link';

// -- styles
import style from '@components/Pages/Career/Landing/styles/style.module.scss';

// -- hooks
import useConfirmationModal from '@hooks/useConfirmationModal';
import useNotification from '@hooks/useNotification';

// -- elements
import CardUserLogWidget from '@components/Elements/CardUserLog/widgets/Default';

// -- components
import FormCareerSection1Widget from '@components/Pages/Career/FormSection1/widgets/Default';
import FormCareerSection2Widget from '@components/Pages/Career/FormSection2/widgets/Default';
import FormCareerSection3Widget from '@components/Pages/Career/FormSection3/widgets/Default';
import FormCareerSection4Widget from '@components/Pages/Career/FormSection4/widgets/Default';

const CareerView = (props) => {
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
              { title: method === 'edit' ? 'Edit Detail Career' : 'Detail Career' }
            ]}
          />
        </div>

        <div className='row-container'>
          <FormCareerSection1Widget method={method} confirm={confirm} notify={notify} />
        </div>
        <div className='row-container'>
          <FormCareerSection2Widget method={method} confirm={confirm} notify={notify} />
        </div>
        <div className='row-container'>
          <FormCareerSection3Widget method={method} confirm={confirm} notify={notify} />
        </div>
        <div className='row-container'>
          <FormCareerSection4Widget method={method} confirm={confirm} notify={notify} />
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

export default CareerView;
