const TransformTree = (() => {
  // Helper key generator (bikin slug dari nama)
  const generateKey = (...names) => {
    return names
      .map((n) =>
        n
          .toLowerCase()
          .replace(/ /g, '-')
          .replace(/[^\w-]+/g, '')
      )
      .join('-');
  };

  // Transform raw data to tree structure
  const transformCatList = (rawData) => {
    return rawData.map((category) => ({
      ...category,
      type: 'category',
      title: category.name,
      id: category.id,
      image: category.image,
      name: category.name,
      status: category.status,
      key: generateKey(category.name),
      children: category.subcategories
        ? category.subcategories.map((sub) => ({
            ...sub,
            type: 'sub_category',
            title: sub.name,
            id: sub.id,
            category_id: category.id,
            image: sub.image,
            name: sub.name,
            key: generateKey(category.name, sub.name),
            main_category: generateKey(category.name),
            status: sub.status
          }))
        : undefined
    }));
  };

  // Transform raw data to tree structure
  const transformCatSelect = (rawData) => {
    return rawData.map((category, showSub = true) => ({
      ...category,
      type: 'category',
      title: category.name,
      image: category.image,
      name: category.name,
      value: `category-${category.id}`,
      key: `category-${category.id}`,
      status: true,
      children: category.subcategories
        ? category.subcategories.map((sub) => ({
            ...sub,
            type: 'sub_category',
            title: sub.name,
            image: category.image,
            name: sub.name,
            value: `sub_category-${sub.id}`,
            key: `sub_category-${sub.id}`,
            category_id: category.id,
            main_category: `sub_category-${category.id}`,
            status: true
          }))
        : []
    }));
  };

  // TreeSelect structure for collection tree
  const transformCollectSelect = (rawData) => {
    return rawData.map((collection) => ({
      ...collection,
      type: 'collection',
      title: collection.name,
      name: collection.name,
      value: `collection-${collection.id}`,
      key: `collection-${collection.id}`,
      status: collection.status
    }));
  };

  const transformValuesTree = (data) => {
    if (!data) return {};

    // Category nesting
    const categories = Array.isArray(data.categories) ? data.categories : [];
    const subcategories = Array.isArray(data.subcategories) ? data.subcategories : [];

    const categoryTree = categories.map((category) => {
      const subcatChildren = subcategories
        .filter((subcat) => subcat.category_id === category.id)
        .map((subcat) => ({
          title: subcat.name,
          value: `sub_category-${subcat.id}`,
          key: `sub_category-${subcat.id}`
        }));

      return {
        title: category.name,
        value: `category-${category.id}`,
        key: `category-${category.id}`,
        children: subcatChildren
      };
    });

    // collection: flat
    const collectionTree = Array.isArray(data.collections)
      ? data.collections.map((item) => ({
          title: item.name,
          value: `collection-${item.id}`,
          key: `collection-${item.id}`
        }))
      : [];

    return {
      category_ids: categoryTree,
      collection_ids: collectionTree
    };
  };

  // Flatten tree nodes into flat array of {value,label,key,title}
  // NOTE: updated to be more tolerant: if node missing `value`, try to build one from `type`+`id` or fallback to `key`.
  const flattenTreeNodes = (nodes) => {
    const result = [];
    const walk = (arr) => {
      if (!Array.isArray(arr)) return;
      arr.forEach((n) => {
        if (!n) return;

        const title = n.title ?? n.label ?? n.name ?? '';
        // derive value: prefer explicit value, otherwise try type-id or key
        let value = n.value !== undefined ? n.value : undefined;
        if (value === undefined || value === null) {
          if (n.id !== undefined && n.id !== null) {
            const prefix = typeof n.type === 'string' && n.type.length > 0 ? n.type : 'node';
            value = `${prefix}-${n.id}`;
          } else if (n.key !== undefined) {
            value = n.key;
          } else {
            // last resort: use title slug
            value = title
              ? title
                  .toString()
                  .toLowerCase()
                  .replace(/ /g, '-')
                  .replace(/[^\w-]+/g, '')
              : undefined;
          }
        }

        const key = n.key !== undefined && n.key !== null ? n.key : value;
        const label = n.label ?? title; // keep label for compatibility with TreeSelect

        if (value !== undefined) {
          result.push({ value, label, title, key });
        }

        // recurse into children if any (support empty arrays as leaf)
        const children = Array.isArray(n.children) ? n.children : [];
        if (children.length > 0) {
          walk(children);
        }
      });
    };
    walk(nodes);
    return result;
  };

  // Given the data object (API response), produce flattened initial values map
  // e.g. { category_ids: [{value,label,..}, ...], specification_ids: [...], ... }
  const flattenValuesTree = (data) => {
    const trees = transformValuesTree(data) || {};
    const flattened = {};
    // ensure all expected keys exist (avoid missing keys)
    const keys = ['category_ids', 'collection_ids'];
    keys.forEach((k) => {
      flattened[k] = flattenTreeNodes(trees[k] || []);
    });
    return flattened;
  };

  return {
    catList: transformCatList,
    catSelect: transformCatSelect,
    collectSelect: transformCollectSelect,
    valuesTree: transformValuesTree,
    // exported flatten helpers
    flattenTreeNodes,
    flattenValuesTree
  };
})();

export default TransformTree;
