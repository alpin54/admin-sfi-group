// -- libraries
import { useCallback, useMemo } from 'react';
import { Input, InputNumber } from 'antd';

// -- styles
import style from '@components/Product/Form/styles/style.module.scss';

// -- utils
import Currency from '@utils/currency';
import { chooseImageAttrIndex } from '@utils/productHelpers';

// -- elements
import UploadImage from '@elements/UploadImage/views';

const VariantTable = ({ viewOnly, attributes, data, variantsHook, groupImagesHook }) => {
  // Terima hooks dari parent, jangan buat di sini
  const { variantRows, variantData, updateVariantField } = variantsHook;
  const { groupImages, getUploadImageValue, handleGroupImageChange } = groupImagesHook;

  const activeAttrs = useMemo(() => {
    return attributes ? attributes.filter((a) => a.active) : [];
  }, [attributes]);

  const optionsCount = useMemo(() => {
    return activeAttrs.map((a) => a.options.filter((o) => o.value && String(o).trim() !== '').length || 0);
  }, [activeAttrs]);

  const productAfter = useCallback(
    (i) => {
      let p = 1;
      for (let k = i + 1; k < activeAttrs.length; k++) {
        const len = activeAttrs[k]?.options?.filter((o) => o.value && String(o).trim() !== '').length || 0;
        p *= Math.max(1, len);
      }
      return p;
    },
    [activeAttrs]
  );

  const getDisplayLabel = useCallback((attr, rawVal) => {
    if (!attr) return rawVal;
    if (Array.isArray(attr.selectOptions) && attr.selectOptions.length) {
      return attr.selectOptions.find((s) => String(s.value) === String(rawVal))?.label ?? rawVal;
    }
    return rawVal;
  }, []);

  if (!activeAttrs.length) return null;

  const imageAttrIndex = chooseImageAttrIndex(activeAttrs);

  return (
    <div className={style.variationTableWrapper}>
      <table className={style.variationTable}>
        <thead>
          <tr>
            {activeAttrs.map((a) => (
              <th key={a.id} width={120} align='center'>
                {a.name || 'Variant'}
              </th>
            ))}
            <th width={100}>SKU</th>
            <th width={120}>Price</th>
            <th width={100}>Stock</th>
          </tr>
        </thead>
        <tbody>
          {variantRows.length === 0 && (
            <tr>
              <td colSpan={activeAttrs.length + 3} align='center'>
                No variant combinations yet. Add options to generate rows.
              </td>
            </tr>
          )}
          {variantRows.map((row, rowIndex) => {
            return (
              <tr key={`vr-${row.key}`}>
                {activeAttrs.map((a, idx) => {
                  const countAtI = optionsCount[idx] || 0;
                  const blockSize = productAfter(idx) || 1;
                  const groupSize = blockSize * Math.max(1, countAtI);
                  const positionWithinGroup = groupSize === 0 ? 0 : rowIndex % groupSize;
                  const shouldRender = groupSize === 0 ? false : positionWithinGroup % blockSize === 0;
                  if (!shouldRender) return null;

                  const rs = blockSize || 1;
                  const rawVal = row.values[idx] ?? '';
                  const displayVal = getDisplayLabel(a, rawVal);

                  if (idx === imageAttrIndex) {
                    return (
                      <td key={`img-${a.id}-${rawVal}-${rowIndex}`} rowSpan={rs} align='center'>
                        <div className={style.variationUpload}>
                          <UploadImage
                            variant='simple'
                            maxCount={1}
                            disabled={viewOnly}
                            value={getUploadImageValue(groupImages[rawVal], rawVal)}
                            onChange={(files) => handleGroupImageChange(rawVal, files)}
                          />
                          <span className={style.help}>size: 1440 x 1078</span>
                        </div>
                        <span className={style.variationName}>{displayVal || 'Image'}</span>
                      </td>
                    );
                  }

                  return (
                    <td key={`${a.id}-${rawVal}-${rowIndex}`} rowSpan={rs} align='center'>
                      {displayVal}
                    </td>
                  );
                })}

                <td style={{ padding: 0 }}>
                  <Input
                    variant='borderless'
                    value={variantData[row.key]?.sku ?? ''}
                    disabled={viewOnly}
                    onChange={(e) => updateVariantField(row.key, 'sku', e.target.value)}
                    placeholder='SKU'
                  />
                </td>
                <td style={{ padding: 0 }}>
                  <InputNumber
                    variant='borderless'
                    min={0}
                    step={1000}
                    disabled={viewOnly}
                    value={typeof variantData[row.key]?.price === 'number' ? variantData[row.key].price : undefined}
                    onChange={(val) => updateVariantField(row.key, 'price', val ?? 0)}
                    formatter={(value) => {
                      if (value || value === 0) return Currency.formatRp(value);
                      return '';
                    }}
                    parser={(value) => {
                      const parsed = Currency.removeRp(value || '');
                      return parsed !== undefined && parsed !== null ? Number(parsed) : 0;
                    }}
                    placeholder='Rp'
                  />
                </td>
                <td style={{ padding: 0 }}>
                  <InputNumber
                    variant='borderless'
                    min={0}
                    disabled={viewOnly}
                    value={variantData[row.key]?.stock ?? undefined}
                    onChange={(val) => updateVariantField(row.key, 'stock', val ?? 0)}
                    placeholder='Stock'
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export { VariantTable };
