export const generateId = () => `${Date.now()}${Math.floor(Math.random() * 1000)}`;

export const transformImageApiToUploadInitialValue = (dataObj, type) => {
  if (!dataObj) return [];
  const coverImage = ['image1', 'image2', 'image3', 'image4'];
  return (type === 'cover' ? coverImage : coverImage)
    .map((key) => {
      const url = dataObj[key];
      if (!url) return null;
      return {
        uid: key,
        name: key,
        status: 'done',
        url
      };
    })
    .filter(Boolean);
};

export const transformImagesToObject = (images, type) => {
  if (!Array.isArray(images)) return {};
  const result = {};
  const key = type === 'cover' ? 'image' : 'image';
  images.forEach((img, idx) => {
    let url = '';
    if (!img) url = '';
    else if (typeof img === 'string') url = img;
    else url = img.url || img.thumbUrl || (img.response && img.response.url) || '';
    result[`${key}${idx + 1}`] = img || url;
  });
  return result;
};

export const normalizeOptions = (opts) => {
  if (!Array.isArray(opts)) return [];
  return opts.map((o) => {
    if (typeof o === 'string' || typeof o === 'number') {
      return { label: String(o), value: String(o) };
    } else if (o && typeof o === 'object') {
      const label = o.label ?? o.name ?? o.value ?? o.title ?? String(o.id ?? '');
      const value = o.value ?? o.id ?? label;
      return { label: String(label), value: String(value) };
    } else {
      return { label: String(o), value: String(o) };
    }
  });
};

export const parseTreeSelectIds = (items) => {
  const ids = [];
  if (!Array.isArray(items)) return ids;
  items.forEach((it) => {
    if (typeof it === 'number') {
      ids.push(it);
    } else if (typeof it === 'string') {
      const match = it.match(/(\d+)$/);
      if (match) ids.push(Number(match[1]));
      else {
        const n = Number(it);
        if (!Number.isNaN(n)) ids.push(n);
      }
    } else if (it && typeof it === 'object') {
      const val = it.value ?? it.key ?? it;
      if (typeof val === 'number') ids.push(val);
      else if (typeof val === 'string') {
        const match = String(val).match(/(\d+)$/);
        if (match) ids.push(Number(match[1]));
        else {
          const n = Number(val);
          if (!Number.isNaN(n)) ids.push(n);
        }
      }
    }
  });
  return Array.from(new Set(ids.filter((v) => !Number.isNaN(v))));
};

export const coerceToString = (val) => {
  if (val === undefined || val === null) return '';
  if (Array.isArray(val)) {
    const first = val.find((v) => v !== undefined && v !== null && String(v).trim() !== '');
    if (first !== undefined) return String(first);
    return val.map((v) => String(v)).join(', ');
  }
  return String(val);
};

export const chooseImageAttrIndex = (activeAttrs) => {
  if (!Array.isArray(activeAttrs) || activeAttrs.length === 0) return 0;
  const names = activeAttrs.map((a) => String(a.name || '').toLowerCase());
  const hasMaterial = names.includes('material');
  const hasColor = names.includes('color');
  const hasSize = names.includes('size');

  if (hasColor && hasMaterial && hasSize) return names.indexOf('color');
  if (hasColor && hasMaterial) return names.indexOf('color');
  if (hasColor && hasSize) return names.indexOf('color');
  if (hasMaterial && hasSize) return names.indexOf('material');
  if (hasMaterial) return names.indexOf('material');
  if (hasColor) return names.indexOf('color');
  if (hasSize) return names.indexOf('size');

  return 0;
};

export const getChildIdsFromCategoryTree = (selectedCategoryIds, categoryTreeOptions) => {
  const childIds = new Set();
  if (!Array.isArray(categoryTreeOptions) || categoryTreeOptions.length === 0) return [];
  if (!Array.isArray(selectedCategoryIds) || selectedCategoryIds.length === 0) return [];

  const parseNodeId = (node) => {
    const val = node?.value ?? node?.key ?? node;
    if (typeof val === 'number') return val;
    if (typeof val === 'string') {
      const match = String(val).match(/(\d+)$/);
      if (match) return Number(match[1]);
      const n = Number(val);
      if (!Number.isNaN(n)) return n;
    }
    return null;
  };

  const traverse = (nodes) => {
    if (!Array.isArray(nodes)) return;
    nodes.forEach((n) => {
      const nid = parseNodeId(n);
      if (nid !== null && selectedCategoryIds.includes(nid)) {
        if (Array.isArray(n.children)) {
          n.children.forEach((c) => {
            const cid = parseNodeId(c);
            if (cid !== null) childIds.add(cid);
          });
        }
      }
      if (Array.isArray(n.children) && n.children.length) traverse(n.children);
    });
  };

  traverse(categoryTreeOptions);
  return Array.from(childIds);
};
