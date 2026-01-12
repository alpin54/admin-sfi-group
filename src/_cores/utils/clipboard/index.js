import { message } from 'antd';

const Clipboard = (() => {
  const handleCopy = async (text) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (e) {
        return false;
      }
    }
    // Fallback for older browsers
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'absolute';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      return true;
    } catch (e) {
      return false;
    }
  };

  const copyTextWithMessage = async (text, successMsg = 'Berhasil copy', errorMsg = 'Gagal copy') => {
    const success = await handleCopy(text);
    if (success) {
      message.success(successMsg);
    } else {
      message.error(errorMsg);
    }
    return success;
  };

  return {
    copy: handleCopy,
    copyWithMessage: copyTextWithMessage
  };
})();

export default Clipboard;
