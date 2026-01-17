import { useState, useCallback } from 'react';
import { generateId } from '@utils/productHelpers';

const useAttributes = (notify, getSelectOptionsForName) => {
  const [attributes, setAttributes] = useState([]);

  const activateAttribute = useCallback(
    (attrId) => {
      setAttributes((prev) =>
        prev.map((a) =>
          a.id === attrId
            ? {
                ...a,
                active: true,
                options: a.options && a.options.length ? a.options : [{ id: generateId(), value: '' }],
                selectOptions:
                  a.selectOptions && a.selectOptions.length ? a.selectOptions : getSelectOptionsForName(a.name)
              }
            : a
        )
      );
    },
    [getSelectOptionsForName]
  );

  const addAttribute = useCallback(() => {
    setAttributes((prev) => {
      const inactivePresetIdx = prev.findIndex((a) => a.preset && !a.active);
      if (inactivePresetIdx !== -1) {
        return prev.map((a, idx) =>
          idx === inactivePresetIdx
            ? {
                ...a,
                active: true,
                options: a.options && a.options.length ? a.options : [{ id: generateId(), value: '' }],
                selectOptions:
                  a.selectOptions && a.selectOptions.length ? a.selectOptions : getSelectOptionsForName(a.name)
              }
            : a
        );
      }

      const activeCount = prev.filter((p) => p.active).length;
      if (activeCount >= 3) {
        notify({ type: 'warning', message: 'Max 3 variations allowed' });
        return prev;
      }

      const newAttr = {
        id: generateId(),
        name: '',
        options: [{ id: generateId(), value: '' }],
        preset: false,
        selectOptions: [],
        active: true
      };
      return [...prev, newAttr];
    });
  }, [notify, getSelectOptionsForName]);

  const removeAttribute = useCallback((attrId) => {
    setAttributes((prev) => {
      const found = prev.find((a) => a.id === attrId);
      if (!found) return prev;
      if (found.preset) {
        return prev.map((a) => (a.id === attrId ? { ...a, active: false, options: [] } : a));
      }
      return prev.filter((a) => a.id !== attrId);
    });
  }, []);

  const updateAttributeName = useCallback((attrId, name) => {
    setAttributes((prev) => prev.map((a) => (a.id === attrId ? { ...a, name } : a)));
  }, []);

  const updateOptionValue = useCallback(
    (attrId, optionId, value) => {
      const normalizedNew = value === undefined || value === null ? '' : String(value).trim().toLowerCase();

      setAttributes((prev) => {
        const attr = prev.find((a) => a.id === attrId);
        if (!attr) return prev;

        const otherValues = attr.options
          .filter((o) => String(o.id) !== String(optionId))
          .map((o) => (o.value === undefined || o.value === null ? '' : String(o.value).trim().toLowerCase()))
          .filter((v) => v !== '');

        if (normalizedNew !== '' && otherValues.includes(normalizedNew)) {
          notify({
            type: 'warning',
            message: 'Duplicate option',
            description: 'This option value already exists for this variation.'
          });
          return prev;
        }

        return prev.map((a) => {
          if (a.id !== attrId) return a;
          const options = a.options.map((opt) => (String(opt.id) === String(optionId) ? { ...opt, value } : opt));
          const lastOpt = options[options.length - 1];
          if (lastOpt && String(lastOpt.id) === String(optionId) && String(value).trim() !== '') {
            return { ...a, options: [...options, { id: generateId(), value: '' }] };
          }
          return { ...a, options };
        });
      });
    },
    [notify]
  );

  const removeOption = useCallback((attrId, optionId) => {
    setAttributes((prev) =>
      prev.map((a) => {
        if (a.id !== attrId) return a;
        const newOptions = a.options.filter((opt) => opt.id !== optionId);
        return { ...a, options: newOptions.length ? newOptions : [{ id: generateId(), value: '' }] };
      })
    );
  }, []);

  return {
    attributes,
    setAttributes,
    activateAttribute,
    addAttribute,
    removeAttribute,
    updateAttributeName,
    updateOptionValue,
    removeOption
  };
};

export { useAttributes };
