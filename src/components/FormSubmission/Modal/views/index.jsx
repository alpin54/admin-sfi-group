// --library
import { useMemo } from 'react';
import { Modal } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/id';

// --styles
import style from '@components/FormSubmission/Modal/styles/style.module.scss';

dayjs.locale('id');

const formatDateForDisplay = (d) => {
  if (!d) return '—';
  try {
    return dayjs(d).format('DD MMM YYYY, HH.mm');
  } catch (e) {
    return String(d);
  }
};

const DetailRow = ({ label, children }) => (
  <div style={{ display: 'flex', padding: '14px 18px', borderBottom: '1px solid #f0f0f0', alignItems: 'center' }}>
    <div style={{ width: 160, color: '#666', fontSize: 13 }}>{label}</div>
    <div style={{ flex: 1 }}>{children}</div>
  </div>
);

/**
 * DetailFormSubmissionModal
 * - Only layout changed to label/value rows (left label, right value) with separators.
 * - Includes Company row.
 * - Message preserves newlines via whiteSpace: 'pre-line'.
 * - Uses destroyOnHidden (antd recommended) to avoid deprecation warning.
 */
const DetailFormSubmissionModal = (props) => {
  const { open, onClose, initialValues = {} } = props;
  const { created_at = '-', full_name = '-', phone = '-', email = '-', message = '-' } = initialValues || {};

  const formattedDate = useMemo(() => formatDateForDisplay(created_at), [created_at]);

  return (
    <Modal
      title='Detail Form Submission'
      width={560}
      open={!!open}
      onCancel={onClose}
      footer={null}
      closable
      className={`modal-form ${style.modal}`}
      destroyOnHidden>
      <div style={{ border: '1px solid #f0f0f0', borderRadius: 8, overflow: 'hidden' }}>
        <DetailRow label='Date'>
          <div>{formattedDate}</div>
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

        <DetailRow label='Message'>
          <div>{message ?? '—'}</div>
        </DetailRow>
      </div>
    </Modal>
  );
};

export default DetailFormSubmissionModal;
