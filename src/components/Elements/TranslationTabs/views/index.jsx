// -- libraries
import { Tabs } from 'antd';
import Image from 'next/image';

// -- assets
import FlagEN from '@assets/image/logo/flag-en.png';
import FlagID from '@assets/image/logo/flag-id.png';

// -- styles
import style from '@components/Elements/TranslationTabs/styles/style.module.scss';

const TranslationTabs = (props) => {
  const { children, ...rest } = props;

  const items = [
    {
      key: 'en',
      label: (
        <div className={style.tabLabel}>
          <Image src={FlagEN} alt='English' width={18} height={18} className={style.tabImage} />
          <span>EN</span>
        </div>
      ),
      children: typeof children === 'function' ? children('en') : children
    },
    {
      key: 'id',
      label: (
        <div className={style.tabLabel}>
          <Image src={FlagID} alt='Bahasa Indonesia' width={18} height={18} className={style.tabImage} />
          <span>ID</span>
        </div>
      ),
      children: typeof children === 'function' ? children('id') : children
    }
  ];

  return <Tabs defaultActiveKey='en' items={items} {...rest} className={style.antTabs} />;
};

export default TranslationTabs;
