// -- libraries
import { Breadcrumb } from 'antd';
import Link from 'next/link';

// -- styles
import style from '@components/Pages/AboutUs/Landing/styles/style.module.scss';

// -- hooks
import useConfirmationModal from '@hooks/useConfirmationModal';
import useNotification from '@hooks/useNotification';

// -- elements
import CardUserLogWidget from '@components/Elements/CardUserLog/widgets/Default';

// -- components
import FormAboutUsSection1Widget from '@components/Pages/AboutUs/FormSection1/widgets/Default';
import FormAboutUsSection2Widget from '@components/Pages/AboutUs/FormSection2/widgets/Default';
import FormAboutUsSection3Widget from '@components/Pages/AboutUs/FormSection3/widgets/Default';
import FormAboutUsSection4Widget from '@components/Pages/AboutUs/FormSection4/widgets/Default';
import FormAboutUsSection5Widget from '@components/Pages/AboutUs/FormSection5/widgets/Default';
import FormAboutUsSection6Widget from '@components/Pages/AboutUs/FormSection6/widgets/Default';
import FormAboutUsSection7Widget from '@components/Pages/AboutUs/FormSection7/widgets/Default';
import FormAboutUsSection8Widget from '@components/Pages/AboutUs/FormSection8/widgets/Default';

const AboutUsView = (props) => {
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
              { title: method === 'edit' ? 'Edit Detail About Us' : 'Detail About Us' }
            ]}
          />
        </div>

        <div className='row-container'>
          <FormAboutUsSection1Widget method={method} confirm={confirm} notify={notify} />
        </div>
        <div className='row-container'>
          <FormAboutUsSection2Widget method={method} confirm={confirm} notify={notify} />
        </div>
        <div className='row-container'>
          <FormAboutUsSection3Widget method={method} confirm={confirm} notify={notify} />
        </div>
        <div className='row-container'>
          <FormAboutUsSection4Widget method={method} confirm={confirm} notify={notify} />
        </div>
        <div className='row-container'>
          <FormAboutUsSection5Widget method={method} confirm={confirm} notify={notify} />
        </div>
        <div className='row-container'>
          <FormAboutUsSection6Widget method={method} confirm={confirm} notify={notify} />
        </div>
        <div className='row-container'>
          <FormAboutUsSection7Widget method={method} confirm={confirm} notify={notify} />
        </div>
        <div className='row-container'>
          <FormAboutUsSection8Widget method={method} confirm={confirm} notify={notify} />
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

export default AboutUsView;
