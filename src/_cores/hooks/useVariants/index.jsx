// -- libraries
import { useState, useCallback } from 'react';

const useVariants = () => {
  const [variantRows, setVariantRows] = useState([]);
  const [variantData, setVariantData] = useState({});

  const generateCombinations = useCallback((attrs) => {
    const activeAttrs = (Array.isArray(attrs) ? attrs.filter((a) => a.active) : []).map((a) =>
      a.options.map((o) => o.value).filter((v) => v && String(v).trim() !== '')
    );
    if (activeAttrs.length === 0) return [];
    if (activeAttrs.some((arr) => arr.length === 0)) return [];

    const product = activeAttrs.reduce((acc, curr) => {
      if (!acc.length) return curr.map((c) => [c]);
      const res = [];
      acc.forEach((a) => {
        curr.forEach((c) => {
          res.push([...a, c]);
        });
      });
      return res;
    }, []);
    return product;
  }, []);

  const updateVariantField = useCallback((key, field, value) => {
    setVariantData((prev) => {
      const base = prev && prev[key] ? prev[key] : { sku: '', price: 0, stock: 0, variant_id: null };
      return { ...prev, [key]: { ...base, [field]: value } };
    });
  }, []);

  const updateVariantRows = useCallback(
    (attributes) => {
      const combos = generateCombinations(attributes);
      const rowsFromCombos = combos.map((values) => {
        const key = values.join('||');
        return { key, values };
      });

      setVariantRows(rowsFromCombos);

      setVariantData((prevData) => {
        const next = {};
        const usedPrevKeys = new Set();

        const isPrefixMatch = (prevValues, newValues) => {
          if (!Array.isArray(prevValues) || prevValues.length === 0) return false;
          if (prevValues.length > newValues.length) return false;
          for (let i = 0; i < prevValues.length; i++) {
            const pv = prevValues[i] ?? '';
            const nv = newValues[i] ?? '';
            if (String(pv) !== String(nv)) return false;
          }
          return true;
        };

        const prevRows = (Array.isArray(variantRows) ? variantRows : []).map((r) => ({ key: r.key, values: r.values }));

        rowsFromCombos.forEach((r) => {
          if (prevData && prevData[r.key]) {
            next[r.key] = prevData[r.key];
            usedPrevKeys.add(r.key);
            return;
          }

          let foundKey = null;
          if (prevRows && prevRows.length) {
            for (let i = 0; i < prevRows.length; i++) {
              const pr = prevRows[i];
              if (usedPrevKeys.has(pr.key)) continue;
              if (isPrefixMatch(pr.values, r.values)) {
                if (prevData && prevData[pr.key]) {
                  foundKey = pr.key;
                  break;
                }
              }
            }
          }

          if (foundKey) {
            next[r.key] = prevData[foundKey];
            usedPrevKeys.add(foundKey);
          } else {
            next[r.key] = { sku: '', price: 0, stock: 0, variant_id: null };
          }
        });

        return next;
      });
    },
    [generateCombinations, variantRows]
  );

  return {
    variantRows,
    setVariantRows,
    variantData,
    setVariantData,
    updateVariantField,
    updateVariantRows,
    generateCombinations
  };
};

export { useVariants };
