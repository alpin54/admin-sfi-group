import React, { useState, useRef, useEffect } from 'react';
import { message, Upload, Button, Image, Progress } from 'antd';
import {
  EditOutlined,
  CloudUploadOutlined,
  PlusOutlined,
  FileImageOutlined,
  VideoCameraOutlined
} from '@ant-design/icons';

// -- styles
import style from '@components/Elements/UploadImage/styles/style.module.scss';

/**
 * Custom UploadImage component supporting single and multi (maxCount) image/video upload with gallery grid style.
 * If maxCount is given, shows gallery grid with add ("+") slots, matching design in image3.
 * Now supports images (jpg, png) and videos (mp4, webm, mov).
 */
const UploadImage = ({
  variant = 'default',
  value,
  onChange,
  disabled = false,
  maxCount = 1,
  type = 'image',
  size = 'default'
}) => {
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

  // Allowed types for upload
  const allowedTypes = ['image/jpeg', 'image/png', 'video/mp4', 'video/webm', 'video/quicktime'];
  // Map type to preview
  const isImage = (type) => type && type.startsWith('image/');
  const isVideo = (type) => type && type.startsWith('video/');

  // Media file validation
  const beforeUpload = (file) => {
    const isAllowed = allowedTypes.includes(file.type);
    if (!isAllowed) message.error('You can only upload JPG/PNG/MP4/WebM/MOV file!');
    const isLt20M = file.size / 1024 / 1024 < 20;
    if (!isLt20M) message.error('File must be smaller than 20MB!');
    return isAllowed && isLt20M;
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

  // Single mode: show first item from fileList or value prop or default
  const mediaToShow =
    fileList.length > 0 ? fileList[0] : value && typeof value === 'string' ? { url: value, type: 'image/jpeg' } : value;

  // Render media preview (image/video)
  const renderMediaPreview = (file, className = '', editable = false, editCallback = null) => {
    if (!file || !file.url) return null;
    if (isImage(file.type)) {
      return (
        <div className={className}>
          <Image src={file.url} alt={file.name || 'uploaded'} preview={false} className={style.slotImage} />
          {editable && <Button icon={<EditOutlined />} className={style.slotEdit} onClick={editCallback} />}
        </div>
      );
    } else if (isVideo(file.type)) {
      return (
        <div className={className}>
          <video
            src={file.url}
            controls
            width={180}
            height={100}
            className={style.slotVideo}
            style={{ borderRadius: 8, background: '#000' }}
          />
          {editable && <Button icon={<EditOutlined />} className={style.slotEdit} onClick={editCallback} />}
        </div>
      );
    }
    return null;
  };

  // Multi mode: build grid
  const renderMultiGrid = () => {
    const slots = [];
    for (let i = 0; i < maxCount; i++) {
      if (fileList[i]) {
        // Show image or video
        slots.push(
          <React.Fragment key={fileList[i].uid || i}>
            {renderMediaPreview(fileList[i], style.slotItem, !disabled, () => handleEdit(i))}
          </React.Fragment>
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

  // Accept images and videos
  const acceptTypes = ['image/jpeg', 'image/png', 'video/mp4', 'video/webm', 'video/quicktime'].join(',');

  return (
    <>
      <div
        className={`${style.upload} ${disabled && style.disabled} ${style[variant]} ${style[size]}`}
        ref={wrapperRef}>
        <Upload.Dragger
          name='media'
          customRequest={handleCustomUpload}
          maxCount={maxCount}
          showUploadList={false}
          beforeUpload={beforeUpload}
          disabled={disabled}
          accept={acceptTypes}
          style={{ display: loading ? 'none' : undefined }}
          multiple={false} // always false, we only allow one file at a time
        >
          <div className={style.uploadIcon}>
            {variant !== 'simple' ? (
              <CloudUploadOutlined />
            ) : type === 'video' ? (
              <VideoCameraOutlined />
            ) : (
              <FileImageOutlined />
            )}
          </div>
          {variant !== 'simple' && (
            <>
              <p className={style.uploadText}>Drag & Drop Files to Upload Media (Photo/Video)</p>
              <p className={style.uploadHint}>jpeg, jpg, png, mp4, webm, mov, max 20MB</p>
              <Button variant='outlined' color='primary' className={style.uploadBtn} disabled={disabled}>
                Select File
              </Button>
            </>
          )}
          {size === 'auto' && variant === 'simple' && <p className={style.uploadInfo}>{type === 'video' ? 'Video' : 'Photo'}</p>}
        </Upload.Dragger>

        {/* Single preview if maxCount === 1 */}
        {maxCount === 1 && mediaToShow && mediaToShow.url && !loading && (
          <div className={style.uploadPreview}>
            {renderMediaPreview(mediaToShow, '', !disabled, () => handleEdit(0))}
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
