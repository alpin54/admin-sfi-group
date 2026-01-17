// -- libraries
import { useState, useCallback, useEffect } from 'react';

const useGroupImages = () => {
  const [groupImages, setGroupImages] = useState({});

  const getUploadImageValue = useCallback((stored, groupKey) => {
    if (!stored) return [];

    if (stored.file) {
      return [
        {
          uid: String(groupKey ?? stored.name ?? Date.now()),
          name: stored.name || `file-${Date.now()}`,
          status: 'done',
          url: stored.preview || stored.url || ''
        }
      ];
    }

    if (stored.url) {
      return [
        {
          uid: String(groupKey ?? stored.url),
          name: stored.name || `image-${Date.now()}`,
          status: 'done',
          url: stored.url
        }
      ];
    }

    if (typeof stored === 'string') {
      return [
        {
          uid: String(groupKey ?? stored),
          name: `image-${Date.now()}`,
          status: 'done',
          url: stored
        }
      ];
    }

    if ((stored.preview || stored.thumbUrl || stored.thumb) && (stored.preview || stored.url)) {
      return [
        {
          uid: String(groupKey ?? stored.name ?? Date.now()),
          name: stored.name || `image-${Date.now()}`,
          status: 'done',
          url: stored.preview || stored.url || stored.thumbUrl || ''
        }
      ];
    }

    return [];
  }, []);

  const handleGroupImageChange = useCallback((groupValue, files) => {
    const file = Array.isArray(files) ? files[files.length - 1] : files;
    if (!file) {
      setGroupImages((prev) => {
        const next = { ...(prev || {}) };
        const prevItem = next[groupValue];
        if (prevItem && prevItem.__createdPreviewUrl && prevItem.preview) {
          try {
            URL.revokeObjectURL(prevItem.preview);
          } catch (e) {}
        }
        delete next[groupValue];
        return next;
      });
      return;
    }

    setGroupImages((prev) => {
      const prevItem = prev ? prev[groupValue] : null;
      if (prevItem && prevItem.__createdPreviewUrl && prevItem.preview) {
        try {
          URL.revokeObjectURL(prevItem.preview);
        } catch (e) {}
      }

      let stored = null;
      if (file && file.originFileObj) {
        const f = file.originFileObj;
        const preview = URL.createObjectURL(f);
        stored = { file: f, preview, name: file.name || f.name, __createdPreviewUrl: true };
      } else if (file instanceof File) {
        const preview = URL.createObjectURL(file);
        stored = { file, preview, name: file.name || `file-${Date.now()}`, __createdPreviewUrl: true };
      } else if (file.response && file.response.url) {
        stored = { url: file.response.url };
      } else if (file.url) {
        stored = { url: file.url };
      } else if (typeof file === 'string') {
        stored = { url: file };
      } else {
        if (file && file.url) stored = { url: file.url };
        else stored = file;
      }

      return { ...(prev || {}), [groupValue]: stored };
    });
  }, []);

  useEffect(() => {
    return () => {
      Object.values(groupImages || {}).forEach((it) => {
        if (it && it.__createdPreviewUrl && it.preview) {
          try {
            URL.revokeObjectURL(it.preview);
          } catch (e) {}
        }
      });
    };
  }, [groupImages]);

  return {
    groupImages,
    setGroupImages,
    getUploadImageValue,
    handleGroupImageChange
  };
};

export { useGroupImages };
