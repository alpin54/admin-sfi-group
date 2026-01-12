const isFileLike = (item) =>
  item && (item instanceof File || item instanceof Blob || (typeof item === 'object' && item.originFileObj));

const appendFormData = (formData, key, value) => {
  // Jika array file, dan hanya 1 file, append langsung tanpa [0]
  if (Array.isArray(value)) {
    // Cek jika semua item file-like dan hanya satu file (AntD Upload biasanya array file)
    if (value.length === 1 && isFileLike(value[0])) {
      formData.append(key, value[0].originFileObj ? value[0].originFileObj : value[0]);
    } else {
      // Untuk array non-file, flatten seperti biasa
      value.forEach((item, i) => {
        appendFormData(formData, `${key}[${i}]`, item);
      });
    }
  } else if (isFileLike(value)) {
    formData.append(key, value.originFileObj ? value.originFileObj : value);
  } else if (value !== null && typeof value === 'object') {
    Object.entries(value).forEach(([subKey, subValue]) => {
      appendFormData(formData, `${key}[${subKey}]`, subValue);
    });
  } else if (value !== undefined && value !== null) {
    formData.append(key, typeof value === 'number' ? value : value.toString());
  }
};

const FormData = (obj, type = 'form') => {
  const formData = new window.FormData();

  if (type === 'form') {
    Object.entries(obj).forEach(([key, value]) => {
      appendFormData(formData, key, value);
    });
  } else {
    Object.entries(obj).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });
  }

  return formData;
};

export default FormData;
