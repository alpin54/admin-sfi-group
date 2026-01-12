// -- libraries
import { useState, useRef } from 'react';
import { Upload, Button, Progress, message } from 'antd';
import Image from 'next/image';

// -- icons
import { CloudUploadOutlined, EditOutlined, FileOutlined } from '@ant-design/icons';

// -- assets
import PDFImage from '@assets/image/illustration/pdf.png';

// -- styles
import style from '@components/Elements/UploadFile/styles/style.module.scss';

const UploadFile = ({
  value,
  onChange,
  disabled = false,
  accept = '.pdf,. doc,.docx,.xls,.xlsx,.csv,.txt',
  maxSize = 5 * 1024 * 1024 // Default 5MB in bytes
}) => {
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileList, setFileList] = useState(value ? [value].filter(Boolean) : []);
  const wrapperRef = useRef(null);

  // Helper function to get accepted file extensions
  const getAcceptedExtensions = () => {
    return accept.split(',').map((ext) => ext.trim().toLowerCase());
  };

  // Helper function to format file size
  const formatFileSize = (bytes) => {
    if (bytes >= 1024 * 1024) {
      return `${(bytes / (1024 * 1024)).toFixed(0)}MB`;
    }
    return `${(bytes / 1024).toFixed(0)}KB`;
  };

  // Helper function to get file extension
  const getFileExtension = (filename) => {
    return '.' + filename.split('.').pop().toLowerCase();
  };

  // Helper function to check if file type is accepted
  const isFileTypeAccepted = (file) => {
    const acceptedExts = getAcceptedExtensions();
    const fileExt = getFileExtension(file.name);
    return acceptedExts.some((ext) => ext === fileExt);
  };

  const beforeUpload = (file) => {
    // Check file type
    const isAccepted = isFileTypeAccepted(file);
    if (!isAccepted) {
      const acceptedTypes = getAcceptedExtensions().join(', ');
      message.error(`You can only upload ${acceptedTypes} files!`);
      return false;
    }

    // Check file size
    const isValidSize = file.size <= maxSize;
    if (!isValidSize) {
      message.error(`File must be smaller than ${formatFileSize(maxSize)}!`);
      return false;
    }

    return true;
  };

  const handleCustomUpload = async (options) => {
    const { file, onSuccess, onError, onProgress } = options;

    try {
      setLoading(true);

      // Simulasi upload
      let percent = 0;
      const interval = setInterval(() => {
        percent += 10;
        onProgress?.({ percent }, file);
        setUploadProgress(percent);
        if (percent >= 100) {
          clearInterval(interval);
          setLoading(false);

          const newFile = {
            uid: file.uid,
            name: file.name,
            status: 'done',
            url: URL.createObjectURL(file),
            originFileObj: file
          };

          // Hanya simpan satu file terbaru
          setFileList([newFile]);
          onChange?.([newFile]);

          onSuccess?.('ok');
        }
      }, 100);
    } catch (error) {
      message.error('Upload failed.');
      onError?.(error);
      setLoading(false);
    }
  };

  const handleEdit = (file) => {
    const inputEl = wrapperRef.current?.querySelector("input[type='file']");
    if (inputEl) {
      inputEl.value = '';
      inputEl.click();
    }
  };

  // Get file icon based on extension
  const getFileIcon = (filename) => {
    const ext = getFileExtension(filename);
    // You can add more specific icons for different file types
    if (['.pdf'].includes(ext)) {
      return <Image className={style.uploadFileImage} src={PDFImage} alt='File Preview' />;
    }
    // Default icon for other document types
    return <FileOutlined className={style.uploadFileImage} style={{ fontSize: '48px' }} />;
  };

  return (
    <div className={style.upload} ref={wrapperRef}>
      <Upload.Dragger
        name='file'
        customRequest={handleCustomUpload}
        maxCount={1}
        showUploadList={false}
        beforeUpload={beforeUpload}
        disabled={disabled}
        accept={accept}
        multiple={false}>
        <div className={style.uploadIcon}>
          <CloudUploadOutlined />
        </div>
        <p className={style.uploadText}>Drag & Drop File to Upload</p>
        <p className={style.uploadHint}>
          {getAcceptedExtensions().join(', ')}, max {formatFileSize(maxSize)}
        </p>
        <Button variant='outlined' color='primary' className={style.uploadBtn}>
          Select File
        </Button>
      </Upload.Dragger>

      {fileList.length > 0 && !loading && (
        <div className={style.uploadFile}>
          {fileList.map((file, idx) => (
            <div key={`file-${idx}`} className={style.uploadFileItem}>
              {getFileIcon(file.name)}
              <p className={style.uploadFileName}>{file.name}</p>
              <Button
                type='primary'
                icon={<EditOutlined />}
                onClick={() => handleEdit(file)}
                size='small'
                disabled={disabled}
                className={style.uploadEdit}
              />
            </div>
          ))}
        </div>
      )}

      {loading && (
        <div className={style.uploadUploading}>
          <div className={style.uploadProgress}>
            <Progress type='circle' percent={uploadProgress} size={64} />
          </div>
          <p className={style.uploadText}>Uploading {uploadProgress}%</p>
        </div>
      )}
    </div>
  );
};

export default UploadFile;
