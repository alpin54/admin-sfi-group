// -- libraries
import { useState, useCallback } from 'react';

const useVariants = () => {
  const [variantRows, setVariantRows] = useState([]);
  const [variantData, setVariantData] = useState({});

  const generateCombinations = useCallback((attrs) => {
    const filteredAttrs = Array.isArray(attrs) ? attrs.filter((a) => a.active) : [];

    // Cek apakah ada variation yang belum punya option valid
    // Boleh skip variation TERAKHIR kalau option-nya kosong semua
    let activeAttrs = [];
    if (filteredAttrs.length) {
      activeAttrs = filteredAttrs.map((a) => a.options.map((o) => o.value).filter((v) => v && String(v).trim() !== ''));

      // Jika variation terakhir opsi-nya kosong, abaikan dari kombinasi
      const lastIdx = activeAttrs.length - 1;
      if (activeAttrs[lastIdx] && activeAttrs[lastIdx].length === 0 && activeAttrs.length > 1) {
        activeAttrs = activeAttrs.slice(0, -1);
      }
    }

    // Jika setelah filter tidak ada attribute valid, hasilkan kosong
    if (activeAttrs.length === 0) return [];
    if (activeAttrs.some((arr) => arr.length === 0)) return [];

    // Generate product kombinasi
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
      const base =
        prev && prev[key]
          ? prev[key]
          : {
              sku: '',
              price_member: 0,
              discount_member_number: 0,
              discount_member_percentage: 0,
              price_dealer: 0,
              discount_dealer_number: 0,
              discount_dealer_percentage: 0,
              stock: 0,
              variant_id: null
            };
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

      // Batched state update: gunakan setState callback dari React agar sinkron!
      setVariantRows((prevRows) => {
        // Gunakan prevRows sebagai referensi untuk pencocokan keys lama
        // (supaya data tidak pernah "blank" antara update kombinasi)
        const prevRowsArr = (Array.isArray(prevRows) ? prevRows : []).map((r) => ({
          key: r.key,
          values: r.values
        }));

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

          rowsFromCombos.forEach((r) => {
            if (prevData && prevData[r.key]) {
              next[r.key] = prevData[r.key];
              usedPrevKeys.add(r.key);
              return;
            }

            let foundKey = null;
            if (prevRowsArr && prevRowsArr.length) {
              for (let i = 0; i < prevRowsArr.length; i++) {
                const pr = prevRowsArr[i];
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
              next[r.key] = {
                sku: '',
                price_member: 0,
                discount_member_number: 0,
                discount_member_percentage: 0,
                price_dealer: 0,
                discount_dealer_number: 0,
                discount_dealer_percentage: 0,
                stock: 0,
                variant_id: null
              };
            }
          });

          return next;
        });
        return rowsFromCombos;
      });
    },
    [generateCombinations]
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
