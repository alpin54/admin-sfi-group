// -- libraries
import { useEffect, useCallback } from 'react';
import { Input, Button } from 'antd';
import { DndContext } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';

// -- icons
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';

// -- styles
import style from '@components/Product/Form/styles/style.module.scss';

// -- utils
import { normalizeOptions, generateId } from '@utils/productHelpers';

// -- components
import { SortableOption } from '@components/Product/Form/views/SortableOption';

const AttributeVariation = ({
  viewOnly,
  materialOptions,
  sizeOptions,
  colorOptions,
  data,
  setTabKey,
  attributesHook
}) => {
  const {
    attributes,
    setAttributes,
    activateAttribute,
    removeAttribute,
    updateAttributeName,
    updateOptionValue,
    removeOption
  } = attributesHook;

  const getSelectOptionsForName = useCallback(
    (name) => {
      const n = String(name || '').toLowerCase();
      if (n === 'color') return normalizeOptions(colorOptions || []);
      if (n === 'material') return normalizeOptions(materialOptions || []);
      if (n === 'size') return normalizeOptions(sizeOptions || []);
      return [];
    },
    [colorOptions, materialOptions, sizeOptions]
  );

  const getPresetByIndex = useCallback(
    (index) => {
      if (index === 0) {
        return { name: 'Color', selectOptions: normalizeOptions(colorOptions || []) };
      }
      if (index === 1) {
        return { name: 'Material', selectOptions: normalizeOptions(materialOptions || []) };
      }
      if (index === 2) {
        return { name: 'Size', selectOptions: normalizeOptions(sizeOptions || []) };
      }
      return null;
    },
    [materialOptions, sizeOptions, colorOptions]
  );

  // Initialize three preset attributes when creating new product
  useEffect(() => {
    if (!data && attributes.length === 0) {
      const presets = [0, 1, 2]
        .map((i) => getPresetByIndex(i))
        .filter(Boolean)
        .map((p) => ({
          id: generateId(),
          name: p.name,
          options: [{ id: generateId(), value: '' }],
          preset: true,
          selectOptions: p.selectOptions && p.selectOptions.length ? p.selectOptions : getSelectOptionsForName(p.name),
          active: false
        }));
      setAttributes(presets);
    }
  }, [data, attributes.length, getPresetByIndex, getSelectOptionsForName, setAttributes]);

  // Initialize attributes from API data when editing
  useEffect(() => {
    if (!data) return;
    if (attributes.length > 0) return; // Prevent re-initialization

    const presetNames = ['Color', 'Material', 'Size'];

    const createPresetSkeleton = (name) => ({
      id: generateId(),
      name,
      options: [{ id: generateId(), value: '' }],
      preset: true,
      selectOptions: getSelectOptionsForName(name),
      active: false
    });

    if (Array.isArray(data.attributes) && data.attributes.length) {
      const incoming = data.attributes.map((attr, idx) => ({
        id: generateId(),
        name: attr.name || (getPresetByIndex(idx) ? getPresetByIndex(idx).name : ''),
        options:
          Array.isArray(attr.options) && attr.options.length
            ? attr.options.map((opt) => ({ id: generateId(), value: String(opt) }))
            : [{ id: generateId(), value: '' }],
        preset: Boolean(getPresetByIndex(idx)),
        selectOptions: getPresetByIndex(idx)?.selectOptions ?? getSelectOptionsForName(attr.name),
        active: true
      }));

      const finalAttrs = presetNames.map((pName) => {
        const found = incoming.find((inc) => String(inc.name || '').toLowerCase() === pName.toLowerCase());
        if (found) {
          return { ...found, preset: true };
        }
        return createPresetSkeleton(pName);
      });

      const extras = incoming.filter(
        (inc) =>
          !presetNames.includes(
            String(inc.name || '')
              .charAt(0)
              .toUpperCase() + String(inc.name || '').slice(1)
          )
      );

      setAttributes([...finalAttrs, ...extras]);
    } else if (Array.isArray(data.variants) && data.variants.length) {
      const presetOrder = ['color', 'material', 'size'];
      const derivedAttributes = [];
      const uniquePer = {
        material: new Map(),
        size: new Map(),
        color: new Map()
      };

      data.variants.forEach((v) => {
        if (v.material && v.material.id !== undefined)
          uniquePer.material.set(String(v.material.id), v.material.name ?? '');
        if (v.size && v.size.id !== undefined) uniquePer.size.set(String(v.size.id), v.size.name ?? '');
        if (v.color && v.color.id !== undefined) uniquePer.color.set(String(v.color.id), v.color.name ?? '');
      });

      presetOrder.forEach((key) => {
        const map = uniquePer[key];
        if (map && map.size > 0) {
          let selectOptions = [];
          if (key === 'material') {
            selectOptions = normalizeOptions(materialOptions || []);
            if (!selectOptions.length) {
              selectOptions = Array.from(map.entries()).map(([val, lbl]) => ({
                label: String(lbl),
                value: String(val)
              }));
            }
          } else if (key === 'size') {
            selectOptions = normalizeOptions(sizeOptions || []);
            if (!selectOptions.length) {
              selectOptions = Array.from(map.entries()).map(([val, lbl]) => ({
                label: String(lbl),
                value: String(val)
              }));
            }
          } else if (key === 'color') {
            selectOptions = normalizeOptions(colorOptions || []);
            if (!selectOptions.length) {
              selectOptions = Array.from(map.entries()).map(([val, lbl]) => ({
                label: String(lbl),
                value: String(val)
              }));
            }
          }

          const options = Array.from(map.keys()).map((val) => ({ id: generateId(), value: String(val) }));
          derivedAttributes.push({
            id: generateId(),
            name: key.charAt(0).toUpperCase() + key.slice(1),
            options: options.length ? [...options, { id: generateId(), value: '' }] : [{ id: generateId(), value: '' }],
            preset: true,
            selectOptions: selectOptions.length ? selectOptions : getSelectOptionsForName(key),
            active: true
          });
        }
      });

      const finalDerived = presetNames.map((pName) => {
        const found = derivedAttributes.find((d) => String(d.name || '').toLowerCase() === pName.toLowerCase());
        if (found) return { ...found, preset: true };
        return createPresetSkeleton(pName);
      });

      const derivedExtras = derivedAttributes.filter(
        (d) =>
          !presetNames.includes(
            String(d.name || '')
              .charAt(0)
              .toUpperCase() + String(d.name || '').slice(1)
          )
      );

      setAttributes([...finalDerived, ...derivedExtras]);
    }
  }, [
    data,
    attributes.length,
    getPresetByIndex,
    getSelectOptionsForName,
    setAttributes,
    materialOptions,
    sizeOptions,
    colorOptions
  ]);

  const onDragEnd = useCallback(
    ({ active, over }) => {
      if (!active?.id || !over?.id) return;
      const [activeAttrId, activeOptId] = String(active.id).split('-');
      const [overAttrId, overOptId] = String(over.id).split('-');
      if (activeAttrId !== overAttrId) return;
      setAttributes((prev) =>
        prev.map((a) => {
          if (a.id !== activeAttrId) return a;
          const currentOptions = Array.from(a.options);
          const oldIndex = currentOptions.findIndex((o) => String(o.id) === String(activeOptId));
          const newIndex = currentOptions.findIndex((o) => String(o.id) === String(overOptId));
          if (oldIndex === -1 || newIndex === -1) return a;
          const moved = arrayMove(currentOptions, oldIndex, newIndex);
          return { ...a, options: moved };
        })
      );
    },
    [setAttributes]
  );

  const handleActivateAttribute = useCallback(
    (attrId) => {
      activateAttribute(attrId);
      if (setTabKey) setTabKey('variant');
    },
    [activateAttribute, setTabKey]
  );

  return (
    <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
      <div className={style.variation}>
        {attributes.map((attr) => (
          <div key={attr.id} className={style.variationItem}>
            <div className={style.variationHeader}>
              <Input
                variant='borderless'
                placeholder='Enter Variation'
                value={attr.name}
                onChange={(e) => updateAttributeName(attr.id, e.target.value)}
                disabled={viewOnly}
                readOnly
              />
              {!viewOnly && (
                <>
                  {!attr.active ? (
                    <Button
                      className={style.delete}
                      variant='text'
                      color='default'
                      onClick={() => handleActivateAttribute(attr.id)}
                      icon={<PlusOutlined />}
                    />
                  ) : (
                    <Button
                      className={style.delete}
                      variant='text'
                      color='default'
                      onClick={() => removeAttribute(attr.id)}
                      icon={<DeleteOutlined />}
                    />
                  )}
                </>
              )}
            </div>

            {attr.active && (
              <SortableContext
                items={attr.options.map((o) => `${attr.id}-${o.id}`)}
                strategy={verticalListSortingStrategy}>
                <div className={style.option}>
                  {attr.options.map((opt) => (
                    <SortableOption
                      key={opt.id}
                      option={opt}
                      attrId={attr.id}
                      onChangeValue={(optId, val) => updateOptionValue(attr.id, optId, val)}
                      onRemove={(optId) => removeOption(attr.id, optId)}
                      disabled={viewOnly}
                      isSelect={!!attr.preset}
                      selectOptions={attr.selectOptions}
                    />
                  ))}
                </div>
              </SortableContext>
            )}
          </div>
        ))}
      </div>
    </DndContext>
  );
};

export { AttributeVariation };
