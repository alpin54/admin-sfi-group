// -- libraries
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { App as AntdApp, ConfigProvider } from 'antd';

// -- configs
import DesignToken from '@configs/design-token';

// -- style
import '@styles/app.scss';

// -- utils
import metaTag, { MetaTagDefault } from '@utils/metaTag';
import { SchemaDefault } from '@utils/schema';

// -- metadata
const metadata = metaTag.data();

// -- viewport
const viewport = metaTag.viewport();

// -- RootLayout --
const RootLayout = (props) => {
  const { children } = props;

  return (
    <html lang='en'>
      {/* -- THE HEAD -- */}
      <head>
        <MetaTagDefault />
      </head>

      {/* -- THE HEAD -- */}
      <body>
        <AntdRegistry>
          <ConfigProvider theme={DesignToken}>
            <AntdApp>{children}</AntdApp>
          </ConfigProvider>
        </AntdRegistry>
        <SchemaDefault />
      </body>
    </html>
  );
};

export { metadata, viewport };
export default RootLayout;
