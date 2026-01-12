import React, { useState, useRef, useEffect } from 'react';
import { message, Upload, Button, Image, Progress } from 'antd';
import { EditOutlined, CloudUploadOutlined, PlusOutlined, FileImageOutlined } from '@ant-design/icons';

// -- styles
import style from '@components/Elements/UploadImage/styles/style.module.scss';

/**
 * Custom UploadImage component supporting single and multi (maxCount) image upload with gallery grid style.
 * If maxCount is given, shows gallery grid with add ("+") slots, matching design in image3.
 */
const UploadImage = ({ variant = 'default', value, onChange, disabled = false, maxCount = 1 }) => {
  // Always ensure fileList is array
  const [fileList, setFileList] = useState(Array.isArray(value) ? value : value ? [value] : []);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);
  const [uploadSlotIdx, setUploadSlotIdx] = useState(null); // for multi slot add

  // Sync fileList with value from parent
  useEffect(() => {
    if (Array.isArray(value)) {
      setFileList(value);
    } else if (value) {
      setFileList([value]);
    } else {
      setFileList([]);
    }
  }, [value]);

  // Image file validation
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) message.error('You can only upload JPG/PNG file!');
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) message.error('Image must be smaller than 2MB!');
    return isJpgOrPng && isLt2M;
  };

  // Custom upload handler, supports adding in specific slot (for multi)
  const handleCustomUpload = async ({ file, onSuccess, onError, onProgress }) => {
    setLoading(true);
    setUploadProgress(0);

    const reader = new FileReader();
    reader.onload = () => {
      const newFile = {
        uid: file.uid || `${Date.now()}`,
        url: reader.result,
        originFileObj: file,
        name: file.name,
        type: file.type
      };
      let updatedFileList;
      if (maxCount > 1) {
        updatedFileList = [...fileList];
        // If user clicked on "+" slot, replace that idx, else push new (no more than maxCount)
        if (uploadSlotIdx !== null && uploadSlotIdx >= 0 && uploadSlotIdx < maxCount) {
          updatedFileList[uploadSlotIdx] = newFile;
        } else if (updatedFileList.length < maxCount) {
          updatedFileList.push(newFile);
        } else {
          // Overwrite last if already full
          updatedFileList[maxCount - 1] = newFile;
        }
        updatedFileList = updatedFileList.slice(0, maxCount);
      } else {
        updatedFileList = [newFile];
      }
      setFileList(updatedFileList);
      setUploadSlotIdx(null);
      onChange?.(updatedFileList);
    };
    reader.readAsDataURL(file);

    let percent = 0;
    const interval = setInterval(() => {
      percent += 10;
      setUploadProgress(percent);
      onProgress?.({ percent }, file);
      if (percent >= 100) {
        clearInterval(interval);
        setLoading(false);
        onSuccess?.('ok');
      }
    }, 100);
  };

  // When clicking edit, open file dialog and set slot index for multi
  const handleEdit = (idx) => {
    setUploadSlotIdx(idx);
    const inputEl = wrapperRef.current?.querySelector("input[type='file']");
    if (inputEl) {
      setUploadProgress(0);
      // For multi: remove file from that slot so new file will fill it
      if (typeof idx === 'number' && maxCount > 1) {
        // Remove only the selected item in the fileList visually (not actually remove, but allow overwrite)
      } else {
        setFileList([]);
        onChange?.([]);
      }
      inputEl.value = '';
      inputEl.click();
    }
  };

  // When clicking "+" slot, open file dialog and set slot index for multi
  const handleAdd = (idx) => {
    setUploadSlotIdx(idx);
    const inputEl = wrapperRef.current?.querySelector("input[type='file']");
    if (inputEl) {
      setUploadProgress(0);
      inputEl.value = '';
      inputEl.click();
    }
  };

  // Single mode: show first image from fileList or value prop or default
  const imageToShow = fileList.length > 0 ? fileList[0]?.url : value && typeof value === 'string' ? value : value?.url;

  // Multi mode: build grid like image3
  const renderMultiGrid = () => {
    const slots = [];
    for (let i = 0; i < maxCount; i++) {
      if (fileList[i]) {
        slots.push(
          <div className={style.slotItem} key={fileList[i].uid || i}>
            <Image
              src={fileList[i].url}
              alt={fileList[i].name || 'uploaded'}
              className={style.slotImage}
              preview={false}
            />
            {!disabled && <Button icon={<EditOutlined />} className={style.slotEdit} onClick={() => handleEdit(i)} />}
          </div>
        );
      } else {
        slots.push(
          <div className={style.slotItem} key={`empty-${i}`} onClick={() => !disabled && handleAdd(i)}>
            <PlusOutlined className={style.slotIcon} />
          </div>
        );
      }
    }
    return <div className={`${style.slot} ${disabled && style.disabled}`}>{slots}</div>;
  };

  return (
    <>
      <div
        className={`${style.upload} ${disabled && style.disabled} ${variant === 'simple' && style.simple}`}
        ref={wrapperRef}>
        <Upload.Dragger
          name='image'
          customRequest={handleCustomUpload}
          maxCount={maxCount}
          showUploadList={false}
          beforeUpload={beforeUpload}
          disabled={disabled}
          accept='image/jpeg,image/png'
          style={{ display: loading ? 'none' : undefined }}
          multiple={false} // always false, we only allow one file at a time
        >
          <div className={style.uploadIcon}>
            {variant !== 'simple' ? <CloudUploadOutlined /> : <FileImageOutlined />}
          </div>
          {variant !== 'simple' && (
            <>
              <p className={style.uploadText}>Drag & Drop Files to Upload Profile Photo</p>
              <p className={style.uploadHint}>jpeg, jpg, png, max 2MB</p>
              <Button variant='outlined' color='primary' className={style.uploadBtn} disabled={disabled}>
                Select File
              </Button>
            </>
          )}
        </Upload.Dragger>

        {/* Single preview if maxCount === 1 */}
        {maxCount === 1 && imageToShow && !loading && (
          <div className={style.uploadPreview}>
            <Image src={imageToShow} alt='avatar' preview={false} />
            {!disabled && (
              <Button
                type='primary'
                icon={<EditOutlined />}
                className={style.uploadEdit}
                onClick={() => handleEdit(0)}
              />
            )}
          </div>
        )}

        {loading && (
          <div className={style.uploadUploading}>
            <div className={style.uploadProgress}>
              <Progress type='circle' percent={uploadProgress} size={variant === 'simple' ? 32 : 64} />
            </div>
            {variant !== 'simple' && <p className={style.uploadText}>Uploading {uploadProgress}%</p>}
          </div>
        )}
      </div>
      {/* Multi grid preview if maxCount > 1 */}
      {maxCount > 1 && !loading && renderMultiGrid()}
    </>
  );
};

export default UploadImage;
