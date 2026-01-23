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

  // TreeSelect structure for tag tree
  const transformTagSelect = (rawData) => {
    return rawData.map((tag) => ({
      ...tag,
      type: 'tag',
      title: tag.name,
      name: tag.name,
      value: `tag-${tag.id}`,
      key: `tag-${tag.id}`,
      status: tag.status
    }));
  };

  // TreeSelect structure for brand tree
  const transformBrandSelect = (rawData) => {
    return rawData.map((brand) => ({
      ...brand,
      type: 'brand',
      title: brand.name,
      name: brand.name,
      value: `brand-${brand.id}`,
      key: `brand-${brand.id}`,
      status: brand.status
    }));
  };

  // TreeSelect structure for color tree
  const transformColorSelect = (rawData) => {
    return rawData.map((color) => ({
      ...color,
      type: 'color',
      title: color.name,
      name: color.name,
      value: `color-${color.id}`,
      key: `color-${color.id}`,
      status: color.status
    }));
  };

  // TreeSelect structure for promotion tree
  const transformPromotionSelect = (rawData) => {
    return rawData.map((promotion) => ({
      ...promotion,
      type: 'promotion',
      title: promotion.name,
      name: promotion.name,
      value: `promotion-${promotion.id}`,
      key: `promotion-${promotion.id}`,
      status: promotion.status
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

    // tag: flat
    const tagTree = Array.isArray(data.tags)
      ? data.tags.map((item) => ({
          title: item,
          value: `tag-${item}`,
          key: `tag-${item}`
        }))
      : [];

    // brand: flat
    const brandTree = Array.isArray(data.brands)
      ? data.brands.map((item) => ({
          title: item.name,
          value: `brand-${item.id}`,
          key: `brand-${item.id}`
        }))
      : [];

    // color: flat
    const colorTree = Array.isArray(data.colors)
      ? data.colors.map((item) => ({
          title: item.name,
          value: `color-${item.id}`,
          key: `color-${item.id}`
        }))
      : [];

    // promotion: flat
    const promotionTree = Array.isArray(data.promotions)
      ? data.promotions.map((item) => ({
          title: item.name,
          value: `promotion-${item.id}`,
          key: `promotion-${item.id}`
        }))
      : [];

    return {
      category_ids: categoryTree,
      tags: tagTree,
      brand_ids: brandTree,
      color_ids: colorTree,
      promotion_ids: promotionTree
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
    const keys = ['category_ids', 'tags', 'brand_ids', 'color_ids', 'promotion_ids'];
    keys.forEach((k) => {
      flattened[k] = flattenTreeNodes(trees[k] || []);
    });
    return flattened;
  };

  return {
    catList: transformCatList,
    catSelect: transformCatSelect,
    tagSelect: transformTagSelect,
    brandSelect: transformBrandSelect,
    colorSelect: transformColorSelect,
    promotionSelect: transformPromotionSelect,
    valuesTree: transformValuesTree,
    // exported flatten helpers
    flattenTreeNodes,
    flattenValuesTree
  };
})();

export default TransformTree;
