// --library
import { useMemo } from 'react';
import { Modal, Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import 'dayjs/locale/id';

// --styles
import style from '@components/Career/ModalApplication/styles/style.module.scss';

// --link
import Link from 'next/link';

dayjs.locale('id');

const formatDateForDisplay = (d) => {
  if (!d) return '—';
  try {
    // match example "12 Aug 2025, 10.00"
    return dayjs(d).format('DD MMM YYYY, HH.mm');
  } catch (e) {
    return String(d);
  }
};

const resolveFile = (data) => {
  if (!data) return null;
  const file = data.file ?? data.resume ?? null;
  if (!file) return null;
  if (typeof file === 'string') return { url: file, name: null };
  return { url: file.url ?? null, name: file.name ?? null };
};

const DetailRow = ({ label, children }) => (
  <div style={{ display: 'flex', padding: '14px 18px', borderBottom: '1px solid #f0f0f0', alignItems: 'center' }}>
    <div style={{ width: 160, color: '#666', fontSize: 13 }}>{label}</div>
    <div style={{ flex: 1 }}>{children}</div>
  </div>
);

const ModalApplicationView = ({ open, onClose, data = {} }) => {
  const { created_at, full_name, phone, email } = data || {};
  const file = useMemo(() => resolveFile(data), [data]);

  const fileHref = file?.url ?? null;
  const fileName =
    file?.name ??
    (fileHref
      ? (() => {
          try {
            const clean = fileHref.split('?')[0].split('#')[0];
            return decodeURIComponent(clean.split('/').pop() || 'resume');
          } catch (e) {
            return 'resume';
          }
        })()
      : null);

  const handleDownload = () => {
    if (!fileHref) return;
    // create programmatic download to ensure correct behavior
    const a = document.createElement('a');
    a.href = fileHref;
    a.target = '_blank';
    // set download attribute only when filename available and same-origin or blob
    if (fileName) a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <Modal
      title='Detail Applicants'
      width={560}
      open={!!open}
      onCancel={onClose}
      footer={[
        <Button key='cancel' onClick={onClose} style={{ borderRadius: 6 }}>
          Cancel
        </Button>,
        <Button key='download' type='primary' icon={<DownloadOutlined />} onClick={handleDownload} disabled={!fileHref}>
          Download Resume
        </Button>
      ]}
      closable
      className={`modal-form ${style.modal}`}
      destroyOnHidden>
      <div style={{ border: '1px solid #f0f0f0', borderRadius: 8, overflow: 'hidden' }}>
        <DetailRow label='Date'>
          <div>{formatDateForDisplay(created_at)}</div>
        </DetailRow>

        <DetailRow label='Full Name'>
          <div>{full_name ?? '—'}</div>
        </DetailRow>

        <DetailRow label='Phone Number'>
          <div>{phone ?? '—'}</div>
        </DetailRow>

        <DetailRow label='Email'>
          <div>{email ?? '—'}</div>
        </DetailRow>

        <DetailRow label='Resume / CV'>
          {fileHref ? (
            <div>
              <Link href={fileHref} target='_blank' download style={{ textDecoration: 'underline' }}>
                {fileName ?? 'resume'}
              </Link>
            </div>
          ) : (
            <div style={{ color: '#999' }}>-</div>
          )}
        </DetailRow>
      </div>
    </Modal>
  );
};

export default ModalApplicationView;
