// -- libraries
import { useEffect, useState, useCallback, useMemo } from 'react';
import {
  Breadcrumb,
  Form,
  Button,
  Input,
  InputNumber,
  Collapse,
  Col,
  Row,
  Switch,
  Tabs,
  TreeSelect,
  Select,
  DatePicker,
  Space,
  Checkbox
} from 'antd';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/id';

dayjs.extend(customParseFormat);
dayjs.extend(localizedFormat);
dayjs.locale('id');

// -- icons
import { DownOutlined, DeleteOutlined, HolderOutlined, PlusOutlined } from '@ant-design/icons';

// dnd-kit (Antd docs pattern)
import { DndContext } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// -- styles
import style from '@components/Product/Form/styles/style.module.scss';

// -- hooks
import useNotification from '@hooks/useNotification';

// -- utils
import LocalStorage from '@utils/localStorage';
import FormDataUtil from '@utils/formdata';
import Currency from '@utils/currency';
import TransformTree from '@utils/transformTree';

// -- elements
import CardUserLog from '@components/Elements/CardUserLog/widgets/Default';
import UploadImage from '@components/Elements/UploadImage/views';
import TextEditor from '@components/Elements/TextEditor/views';
import TranslationTabs from '@components/Elements/TranslationTabs/views';

const generateId = () => `${Date.now()}${Math.floor(Math.random() * 1000)}`;

const DragHandle = ({ attributes, listeners }) => {
  return (
    <Button
      className={style.optionDrag}
      size='small'
      variant='text'
      color='default'
      icon={<HolderOutlined />}
      style={{ cursor: 'grab', padding: '0 8px' }}
      {...attributes}
      {...listeners}
    />
  );
};

const SortableOption = ({ option, attrId, onChangeValue, onRemove, disabled, isSelect, selectOptions }) => {
  const sortableId = `${attrId}-${option.id}`;
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: sortableId });

  const styles = {
    transform: CSS.Translate.toString(transform),
    transition,
    ...(isDragging ? { position: 'relative', zIndex: 9999 } : {})
  };

  return (
    <div ref={setNodeRef} style={{ ...styles }} className={style.optionItem}>
      <DragHandle attributes={attributes} listeners={listeners} />
      {isSelect ? (
        <Select
          variant='borderless'
          placeholder='Select Option'
          value={option.value || undefined}
          onChange={(val) => onChangeValue(option.id, val)}
          disabled={disabled}
          options={selectOptions}
          allowClear
          showSearch
        />
      ) : (
        <Input
          variant='borderless'
          placeholder='Enter Option'
          value={option.value}
          onChange={(e) => onChangeValue(option.id, e.target.value)}
          disabled={disabled}
        />
      )}
      {!disabled && (
        <Button
          className={style.delete}
          size='small'
          variant='text'
          color='default'
          onClick={() => onRemove(option.id)}
          icon={<DeleteOutlined />}
        />
      )}
    </div>
  );
};

const ProductFormView = (props) => {
  const {
    slug,
    action,
    data,
    loading,
    message,
    categoryOptions,
    brandOptions,
    materialOptions = [],
    colorOptions,
    promotionOptions,
    sizeOptions = [],
    onSubmit
  } = props;
  const { RangePicker } = DatePicker;
  const { notify, contextHolder: notificationHolder } = useNotification();
  const [formInstance] = Form.useForm();
  const router = useRouter();

  const [viewOnly, setViewOnly] = useState(action === 'detail');
  const [tabKey, setTabKey] = useState('simple');
  const [memberDiscountEnabled, setMemberDiscountEnabled] = useState(false);
  const [memberScheduleEnabled, setMemberScheduleEnabled] = useState(false);
  const [memberScheduleDateRange, setMemberScheduleDateRange] = useState([null, null]);
  const [memberDiscountNumber, setMemberDiscountNumber] = useState(0);
  const [memberDiscountPercentage, setMemberDiscountPercentage] = useState(0);
  const [dealerDiscountEnabled, setDealerDiscountEnabled] = useState(false);
  const [dealerScheduleEnabled, setDealerScheduleEnabled] = useState(false);
  const [dealerScheduleDateRange, setDealerScheduleDateRange] = useState([null, null]);
  const [dealerDiscountNumber, setDealerDiscountNumber] = useState(0);
  const [dealerDiscountPercentage, setDealerDiscountPercentage] = useState(0);
  const [featureEnabled, setFeatureEnabled] = useState(false);
  const [manageStockEnabled, setManageStockEnabled] = useState(false);

  const title = slug ? action : 'Add';
  const method = slug ? 'put' : 'post';

  const rangePresets = [
    { label: 'Today', value: [dayjs(), dayjs().endOf('day')] },
    { label: 'Last 7 Days', value: [dayjs().subtract(6, 'day'), dayjs()] },
    { label: 'Last 14 Days', value: [dayjs().subtract(13, 'day'), dayjs()] },
    { label: 'Last 30 Days', value: [dayjs().subtract(29, 'day'), dayjs()] },
    { label: 'Last 90 Days', value: [dayjs().subtract(89, 'day'), dayjs()] }
  ];

  const user = useMemo(() => LocalStorage.get('user'), []);
  const categoryTreeOptions = useMemo(() => TransformTree.catSelect(categoryOptions), [categoryOptions]);
  const brandTreeOptions = useMemo(() => TransformTree.collectSelect(brandOptions), [brandOptions]);
  const colorTreeOptions = useMemo(() => TransformTree.collectSelect(colorOptions), [colorOptions]);
  const promotionTreeOptions = useMemo(() => TransformTree.collectSelect(promotionOptions), [promotionOptions]);

  // attributes: [{ id, name, options: [{id, value}], preset: bool, selectOptions: [{label,value}], active: bool }]
  const [attributes, setAttributes] = useState([]);

  // variantRows: array of combination arrays (strings), used to render table
  const [variantRows, setVariantRows] = useState([]); // each row: { key, values: [v0,v1,...] }
  // variantData: map key -> { sku, price, stock, variant_id }
  const [variantData, setVariantData] = useState({});
  // groupImages: map groupKey(for imageAttr option value) -> { url } OR { file, preview, name, __createdPreviewUrl }
  const [groupImages, setGroupImages] = useState({});

  // utility: transform existing API image object to UploadImage initial list
  const transformImageApiToUploadInitialValue = useCallback((dataObj, type) => {
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
  }, []);

  const normalizeOptions = useCallback((opts) => {
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
  }, []);

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
    [materialOptions, sizeOptions, colorOptions, normalizeOptions]
  );

  // helper to get selectOptions by attribute name (used when activating preset attributes)
  const getSelectOptionsForName = useCallback(
    (name) => {
      const n = String(name || '').toLowerCase();
      if (n === 'color') return normalizeOptions(colorOptions || []);
      if (n === 'material') return normalizeOptions(materialOptions || []);
      if (n === 'size') return normalizeOptions(sizeOptions || []);
      return [];
    },
    [colorOptions, materialOptions, sizeOptions, normalizeOptions]
  );

  // Initialize three preset attributes (Color, Material, Size) when creating new product (no data)
  useEffect(() => {
    if (!data && attributes.length === 0) {
      const presets = [0, 1, 2]
        .map((i) => getPresetByIndex(i))
        .filter(Boolean)
        .map((p) => ({
          id: generateId(),
          name: p.name,
          // set one empty option so input shows when activated
          options: [{ id: generateId(), value: '' }],
          preset: true,
          // ensure selectOptions are sourced from props
          selectOptions: p.selectOptions && p.selectOptions.length ? p.selectOptions : getSelectOptionsForName(p.name),
          active: false // NOT active until user clicks add
        }));
      setAttributes(presets);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (data && formInstance) {
      const initialValues = { ...data };
      const valuesTreeOptions = TransformTree.valuesTree(data);
      const flattenedValues = TransformTree.flattenValuesTree(data);
      const imageInitialValue = transformImageApiToUploadInitialValue(data, 'cover');
      const datas = {
        ...initialValues,
        ...valuesTreeOptions,
        ...flattenedValues,
        image: imageInitialValue
      };
      // set form values defensively
      formInstance.setFieldsValue(datas);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, formInstance, transformImageApiToUploadInitialValue]);

  // Initialize attributes/variants from API data when editing/viewing
  useEffect(() => {
    if (!data) return;

    setMemberDiscountEnabled(Boolean(data.is_discount_member));
    setMemberScheduleEnabled(Boolean(data.is_schedule_discount_member));
    setDealerDiscountEnabled(Boolean(data.is_discount_dealer));
    setDealerScheduleEnabled(Boolean(data.is_schedule_discount_dealer));
    setFeatureEnabled(Boolean(data.is_features));
    setManageStockEnabled(Boolean(data.is_stock));
    setTabKey(data.is_variant ? 'variant' : 'simple');

    // Ensure the three preset names always exist in attributes UI when editing:
    const presetNames = ['Color', 'Material', 'Size'];

    // Helper to create a preset skeleton
    const createPresetSkeleton = (name) => ({
      id: generateId(),
      name,
      options: [{ id: generateId(), value: '' }],
      preset: true,
      selectOptions: getSelectOptionsForName(name),
      active: false
    });

    // If API provides attributes array, use it (existing behavior) but merge with preset skeletons
    if (Array.isArray(data.attributes) && data.attributes.length) {
      const incoming = data.attributes.map((attr, idx) => ({
        id: generateId(),
        name: attr.name || (getPresetByIndex(idx) ? getPresetByIndex(idx).name : ''),
        options:
          Array.isArray(attr.options) && attr.options.length
            ? attr.options.map((opt) => ({ id: generateId(), value: String(opt) }))
            : [{ id: generateId(), value: '' }],
        preset: Boolean(getPresetByIndex(idx)),
        // ensure selectOptions populated from props when possible
        selectOptions: getPresetByIndex(idx)?.selectOptions ?? getSelectOptionsForName(attr.name),
        active: true
      }));

      // Merge incoming with preset skeletons so UI always shows three presets in order
      const finalAttrs = presetNames.map((pName) => {
        const found = incoming.find((inc) => String(inc.name || '').toLowerCase() === pName.toLowerCase());
        if (found) {
          // ensure it's marked as preset
          return { ...found, preset: true };
        }
        // if not found, create inactive preset skeleton
        return createPresetSkeleton(pName);
      });

      // Append any incoming attributes that are custom / non-preset (preserve their order)
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
      // FALLBACK: derive attributes from variants when data.attributes is not provided
      // Prefer order: Color, Material, Size (matches requested UI order)
      const presetOrder = ['color', 'material', 'size']; // lowercase keys to match variant fields

      const derivedAttributes = [];
      const variantMap = {}; // key -> { sku, price, stock, variant_id }
      const gImages = {};

      // collect unique values per preset
      const uniquePer = {
        material: new Map(), // id -> name
        size: new Map(),
        color: new Map()
      };

      data.variants.forEach((v) => {
        if (v.material && v.material.id !== undefined)
          uniquePer.material.set(String(v.material.id), v.material.name ?? '');
        if (v.size && v.size.id !== undefined) uniquePer.size.set(String(v.size.id), v.size.name ?? '');
        if (v.color && v.color.id !== undefined) uniquePer.color.set(String(v.color.id), v.color.name ?? '');
      });

      // build derived attributes in the preferred order, only if there are values
      presetOrder.forEach((key, idx) => {
        const map = uniquePer[key];
        if (map && map.size > 0) {
          // build selectOptions from material/color/size options passed via props when available,
          // otherwise fall back to values discovered in variants
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

      // Merge derivedAttributes with preset skeletons so we always show three presets
      const finalDerived = presetNames.map((pName) => {
        const found = derivedAttributes.find((d) => String(d.name || '').toLowerCase() === pName.toLowerCase());
        if (found) return { ...found, preset: true };
        return createPresetSkeleton(pName);
      });

      // append any derived attributes that are non-preset (unlikely here but safe)
      const derivedExtras = derivedAttributes.filter(
        (d) =>
          !presetNames.includes(
            String(d.name || '')
              .charAt(0)
              .toUpperCase() + String(d.name || '').slice(1)
          )
      );

      // IMPORTANT: use only active attributes when building keys so they match generateCombinations output
      const activeDerived = finalDerived.filter((a) => a.active);

      // Build variantData and groupImages from variants using activeDerived (fix key mismatch)
      data.variants.forEach((v) => {
        const values = activeDerived.map((a) => {
          const key = String(a.name || '').toLowerCase();
          if (key === 'material' && v.material && v.material.id !== undefined) return String(v.material.id);
          if (key === 'size' && v.size && v.size.id !== undefined) return String(v.size.id);
          if (key === 'color' && v.color && v.color.id !== undefined) return String(v.color.id);
          // fallback to attributes object if present
          if (v.attributes && v.attributes[a.name]) return String(v.attributes[a.name]);
          return '';
        });

        const key = values.join('||') || generateId();
        // include variant_id here so we can send it back on submit if present
        variantMap[key] = {
          sku: v.sku ?? '',
          price: v.price ?? 0,
          stock: v.stock ?? 0,
          variant_id: v.id ?? null
        };

        // map group image best-effort (use first active attribute value or material id)
        const firstVal = values[0];
        if (firstVal && v.image) gImages[firstVal] = v.image;
        if (v.material && v.material.id && v.image) gImages[String(v.material.id)] = v.image;
      });

      // set derived values into state (presets always present)
      setAttributes([...finalDerived, ...derivedExtras]);

      // Normalize gImages values to { url: string } for server-provided images
      const normalizedG = {};
      Object.keys(gImages).forEach((k) => {
        const v = gImages[k];
        if (typeof v === 'string') normalizedG[k] = { url: v };
        else if (v && typeof v === 'object' && (v.url || (v.response && v.response.url))) {
          normalizedG[k] = { url: v.url || v.response.url };
        } else {
          normalizedG[k] = v;
        }
      });

      setVariantData(variantMap);
      setGroupImages(normalizedG);
    }

    // existing variants mapping when API provided attributes *and* variants (keep previous behavior)
    if (Array.isArray(data.variants) && Array.isArray(data.attributes) && data.variants.length) {
      const existing = {};
      const gImages = {};
      data.variants.forEach((v) => {
        const values = [];
        if (Array.isArray(data.attributes)) {
          data.attributes.forEach((attr) => {
            values.push(v.attributes?.[attr.name] ?? '');
          });
        }
        const key = values.join('||') || generateId();
        existing[key] = {
          sku: v.sku ?? '',
          price: v.price ?? 0,
          stock: v.stock ?? 0,
          variant_id: v.id ?? null
        };

        // map group image best-effort: prefer first attribute value, then try Material
        const firstAttrValue = values[0];
        if (firstAttrValue && v.image) {
          gImages[firstAttrValue] = v.image;
        }
        const materialVal = v.attributes?.Material ?? v.attributes?.material;
        if (materialVal && v.image) {
          gImages[materialVal] = v.image;
        }
      });
      // merge with any existing variantData (prefer derived mapping already set above)
      // Normalize gImages before merging
      const normalizedG = {};
      Object.keys(gImages).forEach((k) => {
        const v = gImages[k];
        if (typeof v === 'string') normalizedG[k] = { url: v };
        else if (v && typeof v === 'object' && (v.url || (v.response && v.response.url))) {
          normalizedG[k] = { url: v.url || v.response.url };
        } else {
          normalizedG[k] = v;
        }
      });

      setVariantData((prev) => ({ ...(prev || {}), ...existing }));
      setGroupImages((prev) => ({ ...(prev || {}), ...normalizedG }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // ---------- Attribute CRUD ----------
  const activateAttribute = useCallback(
    (attrId) => {
      // activate preset attribute (and ensure it has at least one empty option)
      setAttributes((prev) =>
        prev.map((a) =>
          a.id === attrId
            ? {
                ...a,
                active: true,
                options: a.options && a.options.length ? a.options : [{ id: generateId(), value: '' }],
                // ensure selectOptions are present when activating a preset
                selectOptions:
                  a.selectOptions && a.selectOptions.length ? a.selectOptions : getSelectOptionsForName(a.name)
              }
            : a
        )
      );
      setTabKey('variant');
    },
    [getSelectOptionsForName]
  );

  const addAttribute = useCallback(() => {
    // If there is an inactive preset, activate the first one
    setAttributes((prev) => {
      // find first inactive preset
      const inactivePresetIdx = prev.findIndex((a) => a.preset && !a.active);
      if (inactivePresetIdx !== -1) {
        const updated = prev.map((a, idx) =>
          idx === inactivePresetIdx
            ? {
                ...a,
                active: true,
                options: a.options && a.options.length ? a.options : [{ id: generateId(), value: '' }],
                // ensure selectOptions are populated from props when activating
                selectOptions:
                  a.selectOptions && a.selectOptions.length ? a.selectOptions : getSelectOptionsForName(a.name)
              }
            : a
        );
        setTabKey('variant');
        return updated;
      }

      // count active attributes
      const activeCount = prev.filter((p) => p.active).length;
      if (activeCount >= 3) {
        notify({ type: 'warning', message: 'Max 3 variations allowed' });
        return prev;
      }

      // otherwise append a new custom (non-preset) attribute and activate it
      const newAttr = {
        id: generateId(),
        name: '',
        options: [{ id: generateId(), value: '' }],
        preset: false,
        selectOptions: [],
        active: true
      };
      setTabKey('variant');
      return [...prev, newAttr];
    });
  }, [notify, getSelectOptionsForName]);

  const removeAttribute = useCallback((attrId) => {
    setAttributes((prev) => {
      const found = prev.find((a) => a.id === attrId);
      if (!found) return prev;
      // If preset, don't remove from array; just deactivate and clear options
      if (found.preset) {
        return prev.map((a) => (a.id === attrId ? { ...a, active: false, options: [] } : a));
      }
      // otherwise fully remove
      return prev.filter((a) => a.id !== attrId);
    });
  }, []);

  const updateAttributeName = useCallback((attrId, name) => {
    setAttributes((prev) => prev.map((a) => (a.id === attrId ? { ...a, name } : a)));
  }, []);

  // Option handlers (prevent duplicate option values per attribute)
  // Behavior change requested:
  // - If a user tries to set an option value that duplicates another option in the same attribute, DO NOT apply the change and DO NOT append a new empty option. Only show a notification.
  const updateOptionValue = useCallback(
    (attrId, optionId, value) => {
      const normalizedNew = value === undefined || value === null ? '' : String(value).trim().toLowerCase();

      setAttributes((prev) => {
        // find attribute
        const attr = prev.find((a) => a.id === attrId);
        if (!attr) return prev;

        // collect other option values normalized (exclude the current option)
        const otherValues = attr.options
          .filter((o) => String(o.id) !== String(optionId))
          .map((o) => (o.value === undefined || o.value === null ? '' : String(o.value).trim().toLowerCase()))
          .filter((v) => v !== '');

        // If the new value is non-empty and already exists among other values -> notify and do nothing
        if (normalizedNew !== '' && otherValues.includes(normalizedNew)) {
          notify({
            type: 'warning',
            message: 'Duplicate option',
            description: 'This option value already exists for this variation.'
          });
          return prev; // no state change, importantly no new empty option appended
        }

        // Otherwise apply the change. Append a single empty option only if:
        // - this was the last option (we compare ids)
        // - and the new value is non-empty
        // - and the new value is not a duplicate (we already checked)
        return prev.map((a) => {
          if (a.id !== attrId) return a;
          const options = a.options.map((opt) => (String(opt.id) === String(optionId) ? { ...opt, value } : opt));
          const lastOpt = options[options.length - 1];
          if (lastOpt && String(lastOpt.id) === String(optionId) && String(value).trim() !== '') {
            // append a new empty option (only when unique and non-empty)
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

  const onDragEnd = useCallback(({ active, over }) => {
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
  }, []);

  // ---------- Variant rows generation ----------
  const generateCombinations = useCallback((attrs) => {
    const activeAttrs = (Array.isArray(attrs) ? attrs.filter((a) => a.active) : []).map((a) =>
      a.options.map((o) => o.value).filter((v) => v && String(v).trim() !== '')
    );
    if (activeAttrs.length === 0) return [];
    // if any attribute has zero options -> no combos
    if (activeAttrs.some((arr) => arr.length === 0)) return [];
    // product
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

  // ---------- Variant rows generation ----------
  useEffect(() => {
    const combos = generateCombinations(attributes);
    const rowsFromCombos = combos.map((values) => {
      const key = values.join('||');
      return { key, values };
    });

    const activeAttrs = attributes.filter((a) => a.active);

    // Build new variantRows (exactly the generated combos)
    setVariantRows(rowsFromCombos);

    // Build new variantData by trying to reuse previous entries where they match.
    setVariantData((prevData) => {
      const next = {};
      const usedPrevKeys = new Set();

      // Helper to check if prevValues is prefix-match of newValues
      const isPrefixMatch = (prevValues, newValues) => {
        if (!Array.isArray(prevValues) || prevValues.length === 0) return false;
        // prevValues length must be <= newValues length
        if (prevValues.length > newValues.length) return false;
        for (let i = 0; i < prevValues.length; i++) {
          // treat empty strings as non-matching
          const pv = prevValues[i] ?? '';
          const nv = newValues[i] ?? '';
          if (String(pv) !== String(nv)) return false;
        }
        return true;
      };

      // Build an index of previous rows' values array (if present in state)
      const prevRows = (Array.isArray(variantRows) ? variantRows : []).map((r) => ({ key: r.key, values: r.values }));

      // For each new row, try:
      // 1) exact key match in prevData -> reuse
      // 2) else try to find a prevRow whose values array is a prefix of the new values and whose prevData not yet used -> reuse
      // 3) else default empty
      rowsFromCombos.forEach((r) => {
        if (prevData && prevData[r.key]) {
          next[r.key] = prevData[r.key];
          usedPrevKeys.add(r.key);
          return;
        }

        // try find a prevRow whose values is a prefix of r.values
        let foundKey = null;
        if (prevRows && prevRows.length) {
          for (let i = 0; i < prevRows.length; i++) {
            const pr = prevRows[i];
            if (usedPrevKeys.has(pr.key)) continue;
            if (isPrefixMatch(pr.values, r.values)) {
              // if prevData exists for this prevRow.key, use it
              if (prevData && prevData[pr.key]) {
                foundKey = pr.key;
                break;
              }
            }
          }
        }

        if (foundKey) {
          // reuse entire object including variant_id
          next[r.key] = prevData[foundKey];
          usedPrevKeys.add(foundKey);
        } else {
          // ensure default value includes variant_id: null
          next[r.key] = { sku: '', price: 0, stock: 0, variant_id: null };
        }
      });

      return next;
    });

    // preserve groupImages only for remaining first-attribute option values (best-effort)
    setGroupImages((prevG) => {
      const newG = {};
      // determine imageAttrIndex using rule-set
      const imageAttrIndex = chooseImageAttrIndex(activeAttrs);
      const firstOptions =
        activeAttrs[imageAttrIndex]?.options.map((o) => o.value).filter((v) => v && String(v).trim() !== '') || [];
      firstOptions.forEach((val) => {
        if (prevG && Object.prototype.hasOwnProperty.call(prevG, val)) newG[val] = prevG[val];
      });
      return newG;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attributes, generateCombinations]);

  // helper: build UploadImage value array from stored groupImages entry
  const getUploadImageValue = useCallback((stored, groupKey) => {
    // IMPORTANT:
    // UploadImage elsewhere expects an array of file-like objects (uid, name, status, url).
    // For group images we must provide the same structure per-instance to avoid UploadImage instances clobbering one another.
    // Return [] when no image.
    if (!stored) return [];

    // If we stored a File-like object with a preview (new upload)
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

    // If stored is an object with url property (server provided)
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

    // If stored is a plain string url
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

    // Fallback: try to build from preview/url fields
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

  // IMPORTANT CHANGE:
  // Store file (originFileObj or File) when user uploads, otherwise keep url/string for existing images
  const handleGroupImageChange = useCallback((groupValue, files) => {
    const file = Array.isArray(files) ? files[files.length - 1] : files;
    if (!file) {
      // remove image
      setGroupImages((prev) => {
        const next = { ...(prev || {}) };
        // revoke preview if present
        const prevItem = next[groupValue];
        if (prevItem && prevItem.__createdPreviewUrl && prevItem.preview) {
          try {
            URL.revokeObjectURL(prevItem.preview);
          } catch (e) {}
        }
        delete next[groupValue]; // remove key entirely
        return next;
      });
      return;
    }

    setGroupImages((prev) => {
      // revoke previous preview for this group if we created one earlier
      const prevItem = prev ? prev[groupValue] : null;
      if (prevItem && prevItem.__createdPreviewUrl && prevItem.preview) {
        try {
          URL.revokeObjectURL(prevItem.preview);
        } catch (e) {}
      }

      // Determine stored shape:
      // - If antd Upload provides originFileObj (new upload) => store file + preview
      // - If file is File instance => same
      // - If server-returned object with response.url or url => keep { url }
      // - If plain string => keep string
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
        // fallback - keep the object (might contain url)
        if (file && file.url) stored = { url: file.url };
        else stored = file;
      }

      return { ...(prev || {}), [groupValue]: stored };
    });
  }, []);

  // cleanup created object URLs on unmount (safety)
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

  // ---------- Submit ----------
  const transformImagesToObject = useCallback((images, type) => {
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
  }, []);

  // helper to parse tree-select items into numeric id arrays
  const parseTreeSelectIds = useCallback((items) => {
    const ids = [];
    if (!Array.isArray(items)) return ids;
    items.forEach((it) => {
      // support numeric values, objects with value, or strings like 'category-1' or '1'
      if (typeof it === 'number') {
        ids.push(it);
      } else if (typeof it === 'string') {
        // try to extract trailing number
        const match = it.match(/(\d+)$/);
        if (match) ids.push(Number(match[1]));
        else {
          const n = Number(it);
          if (!Number.isNaN(n)) ids.push(n);
        }
      } else if (it && typeof it === 'object') {
        // antd tree-select with treeCheckStrictly returns { value, label }
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
    // unique numeric ids
    return Array.from(new Set(ids.filter((v) => !Number.isNaN(v))));
  }, []);

  // helper to get direct child IDs from category tree for selected category ids
  const getChildIdsFromCategoryTree = useCallback(
    (selectedCategoryIds) => {
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
            // collect direct children IDs (if any)
            if (Array.isArray(n.children)) {
              n.children.forEach((c) => {
                const cid = parseNodeId(c);
                if (cid !== null) childIds.add(cid);
              });
            }
          }
          // still traverse deeper for other matches
          if (Array.isArray(n.children) && n.children.length) traverse(n.children);
        });
      };

      traverse(categoryTreeOptions);
      return Array.from(childIds);
    },
    [categoryTreeOptions]
  );

  // helper to resolve an attribute option value to an id (for preset selects)
  const resolveOptionValueToId = useCallback((attr, rawVal) => {
    if (rawVal === undefined || rawVal === null) return null;
    // If attr has selectOptions, try to find matching option by label or value
    if (attr && Array.isArray(attr.selectOptions) && attr.selectOptions.length) {
      const found =
        attr.selectOptions.find((s) => String(s.value) === String(rawVal)) ||
        attr.selectOptions.find((s) => String(s.label).toLowerCase() === String(rawVal).toLowerCase());
      if (found) {
        const num = Number(found.value);
        return !Number.isNaN(num) ? num : found.value;
      }
    }
    // try parse numeric directly from rawVal
    const parsed = Number(rawVal);
    return !Number.isNaN(parsed) ? parsed : null;
  }, []);

  // coerce helper: ensure value becomes string for fields that must be strings
  const coerceToString = useCallback((val) => {
    if (val === undefined || val === null) return '';
    if (Array.isArray(val)) {
      // prefer first non-empty element, fallback to joined string
      const first = val.find((v) => v !== undefined && v !== null && String(v).trim() !== '');
      if (first !== undefined) return String(first);
      return val.map((v) => String(v)).join(', ');
    }
    return String(val);
  }, []);

  const handleFinish = async (values) => {
    // Construct images
    const images = transformImagesToObject(values.image, 'cover');
    const rawCategoryItems = values.category_ids || [];
    const rawBrandItems = values.brand_ids || [];
    const rawColorItems = values.color_ids || [];
    const rawPromotionItems = values.promotion_ids || [];

    // regexes to detect explicit prefixes
    const subcatRegex = /^sub[_-]?category-/i;
    const categoryPrefixRegex = /^category-/i;
    const numericRegex = /^\d+$/;

    // helper to extract the raw value (string/number) from an item
    const extractRawValue = (it) => {
      if (typeof it === 'number') return it;
      if (typeof it === 'string') return it;
      if (it && typeof it === 'object') return it.value ?? it.key ?? '';
      return '';
    };

    // explicit subcategory items provided inside category_ids (e.g. value: 'sub_category-6')
    const explicitSubcatsFromCategoryField = (Array.isArray(rawCategoryItems) ? rawCategoryItems : []).filter((it) => {
      const val = extractRawValue(it);
      return typeof val === 'string' && subcatRegex.test(val);
    });

    // explicit category items (category-* or numeric) from category_ids
    const explicitCategoriesFromCategoryField = (Array.isArray(rawCategoryItems) ? rawCategoryItems : []).filter(
      (it) => {
        const val = extractRawValue(it);
        if (typeof val === 'number') return true;
        if (typeof val === 'string') {
          // include strings that are 'category-*' or pure numeric '123'
          return categoryPrefixRegex.test(val) || numericRegex.test(val);
        }
        return false;
      }
    );

    // parse brand ids normally (they usually don't use sub_category prefix)
    const brand_ids = parseTreeSelectIds(rawBrandItems);
    const color_ids = parseTreeSelectIds(rawColorItems);
    const promotion_ids = parseTreeSelectIds(rawPromotionItems);

    // Now parse into numeric arrays
    const category_ids = parseTreeSelectIds(explicitCategoriesFromCategoryField);

    // explicitSubcats could be supplied via dedicated fields too (support backward compatibility)
    const explicitSubcats =
      values.subcategory_ids || values.sub_category || values.sub_category_ids || values.subcategory || [];

    let subcategory_ids = [];
    if (explicitSubcats && Array.isArray(explicitSubcats) && explicitSubcats.length) {
      // if dedicated subcategory field present, prefer it
      subcategory_ids = parseTreeSelectIds(explicitSubcats);
    } else if (explicitSubcatsFromCategoryField.length) {
      // else take subcategories provided inside category_ids (with 'sub_category-*' prefix)
      subcategory_ids = parseTreeSelectIds(explicitSubcatsFromCategoryField);
    } else {
      // fallback: derive from categoryTreeOptions children (direct children)
      subcategory_ids = getChildIdsFromCategoryTree(category_ids);
    }

    const is_variant = tabKey === 'variant';

    try {
      // base payload (flat fields)
      const payload = {
        name: values.name ?? '',
        slug: coerceToString(values.slug ?? ''),
        description: values.description ?? '',
        features: values.features ?? '',
        size_chart: values.size_chart ?? '',
        is_variant: is_variant ? 1 : 0,
        sku: !is_variant ? coerceToString(values.sku ?? '') : null,
        price: !is_variant ? (values.price ?? 0) : 0,
        sale_price: !is_variant ? (values.sale_price ?? 0) : 0,
        stock: !is_variant ? (values.stock ?? 0) : 0,
        weight: values.weight ?? 0,
        width: values.width ?? 0,
        length: values.length ?? 0,
        height: values.height ?? 0,
        category_ids,
        subcategory_ids,
        brand_ids,
        color_ids,
        promotion_ids,
        ...images,
        ...(method === 'post' ? { status: 1, created_by: user?.id } : { id: values.id, updated_by: user?.id })
      };

      // Build variants payload when in variant mode
      if (is_variant) {
        const activeAttrs = attributes.filter((a) => a.active);

        // attributes mapping: determine index for Material/Size/Color (case-insensitive)
        const attrIndexByName = {};
        activeAttrs.forEach((a, idx) => {
          const key = String(a.name || '').toLowerCase();
          attrIndexByName[key] = idx;
        });

        const materialIdx = typeof attrIndexByName['material'] === 'number' ? attrIndexByName['material'] : null;
        const sizeIdx = typeof attrIndexByName['size'] === 'number' ? attrIndexByName['size'] : null;
        const colorIdx = typeof attrIndexByName['color'] === 'number' ? attrIndexByName['color'] : null;

        // determine image attribute index using the new rules (prefer Color for many combos)
        const imageAttrIndex = chooseImageAttrIndex(activeAttrs);

        // helper to get display label for a raw value (selectOptions label fallback)
        const getDisplayLabel = (attr, rawVal) => {
          if (!attr) return String(rawVal ?? '');
          if (Array.isArray(attr.selectOptions) && attr.selectOptions.length) {
            const found =
              attr.selectOptions.find((s) => String(s.value) === String(rawVal)) ||
              attr.selectOptions.find((s) => String(s.label).toLowerCase() === String(rawVal).toLowerCase());
            if (found) return found.label;
          }
          return String(rawVal ?? '');
        };

        const variants = variantRows.map((r) => {
          // build attribute map (by attribute name)
          const attrMap = {};
          activeAttrs.forEach((a, idx) => {
            attrMap[a.name] = r.values[idx] ?? '';
          });

          // determine ids for material/color/size
          const material_val = materialIdx !== null ? r.values[materialIdx] : null;
          const color_val = colorIdx !== null ? r.values[colorIdx] : null;
          const size_val = sizeIdx !== null ? r.values[sizeIdx] : null;

          const material_id =
            materialIdx !== null ? resolveOptionValueToId(activeAttrs[materialIdx], material_val) : null;
          const color_id = colorIdx !== null ? resolveOptionValueToId(activeAttrs[colorIdx], color_val) : null;
          const size_id = sizeIdx !== null ? resolveOptionValueToId(activeAttrs[sizeIdx], size_val) : null;

          // build variant_name: prefer "Color Size" if both exist, else join all non-empty values
          const colorLabel = colorIdx !== null ? getDisplayLabel(activeAttrs[colorIdx], color_val) : '';
          const sizeLabel = sizeIdx !== null ? getDisplayLabel(activeAttrs[sizeIdx], size_val) : '';

          let variant_name = '';
          if (colorLabel && sizeLabel) variant_name = `${colorLabel} ${sizeLabel}`;
          else {
            // fallback: join all attribute display values for this variant
            variant_name = activeAttrs
              .map((a, idx) => getDisplayLabel(a, r.values[idx] ?? ''))
              .filter((v) => v && String(v).trim() !== '')
              .join(' ');
          }

          // variant-level price/sku/stock taken from variantData (if present) or form defaults
          const vdata = variantData[r.key] || {};
          // coerce sku and variant_name to string to avoid sending arrays
          const vsku = coerceToString(vdata.sku ?? '');
          const vprice = typeof vdata.price === 'number' ? vdata.price : (payload.price ?? 0);
          const vstock = typeof vdata.stock === 'number' ? vdata.stock : 0;

          // variant weight fallback to overall weight if not provided per-variant
          const vweight = values.weight ?? payload.weight ?? 0;

          // determine group image for this variant (use imageAttrIndex value as key)
          const imageKey = r.values[imageAttrIndex] ?? r.values[0] ?? '';
          const storedImage = groupImages[imageKey] ?? null;
          // extract actual file or url to include in variant object:
          const imageForPayload =
            storedImage && storedImage.file
              ? storedImage.file
              : storedImage && storedImage.url
                ? storedImage.url
                : storedImage;

          return {
            variant_name: coerceToString(variant_name),
            sku: vsku,
            price: vprice,
            sale_price: 0,
            stock: vstock,
            weight: vweight,
            width: payload.width ?? 0,
            length: payload.length ?? 0,
            height: payload.height ?? 0,
            status: 1,
            material_id: typeof material_id === 'number' ? material_id : (material_id ?? null),
            color_id: typeof color_id === 'number' ? color_id : (color_id ?? null),
            size_id: typeof size_id === 'number' ? size_id : (size_id ?? null),
            // include image (could be File-like or url/string)
            image: imageForPayload,
            // include existing variant id when available so API can update instead of creating duplicate
            variant_id: vdata.variant_id ?? null
          };
        });

        payload.variants = variants;
      }

      // If API expects multipart form, convert; otherwise pass JSON object directly.
      // We'll create FormData only if onSubmit expects FormData (previous code used FormDataUtil)
      const formData = FormDataUtil(payload);

      // If we built FormData, and variants exist, append them explicitly (FormDataUtil might already handle)
      if (payload.variants && Array.isArray(payload.variants)) {
        payload.variants.forEach((v, idx) => {
          formData.append(`variants[${idx}][variant_name]`, coerceToString(v.variant_name));
          formData.append(`variants[${idx}][sku]`, coerceToString(v.sku));
          formData.append(`variants[${idx}][price]`, v.price ?? 0);
          formData.append(`variants[${idx}][sale_price]`, v.sale_price ?? 0);
          formData.append(`variants[${idx}][stock]`, v.stock ?? 0);
          formData.append(`variants[${idx}][weight]`, v.weight ?? 0);
          formData.append(`variants[${idx}][width]`, v.width ?? 0);
          formData.append(`variants[${idx}][length]`, v.length ?? 0);
          formData.append(`variants[${idx}][height]`, v.height ?? 0);
          formData.append(`variants[${idx}][status]`, v.status ?? 1);
          if (v.material_id !== undefined && v.material_id !== null)
            formData.append(`variants[${idx}][material_id]`, v.material_id);
          if (v.color_id !== undefined && v.color_id !== null)
            formData.append(`variants[${idx}][color_id]`, v.color_id);
          if (v.size_id !== undefined && v.size_id !== null) formData.append(`variants[${idx}][size_id]`, v.size_id);

          // append variant_id when present so server can map to existing variant
          if (v.variant_id !== undefined && v.variant_id !== null) {
            formData.append(`variants[${idx}][variant_id]`, v.variant_id);
          }

          // Append variant image if present.
          if (v.image !== undefined && v.image !== null && v.image !== '') {
            // Prefer appending binary File when available:
            if (v.image instanceof File) {
              // Append as binary with a filename
              formData.append(`variants[${idx}][image]`, v.image, v.image.name || `variant-${idx}.jpg`);
            } else if (v.image && v.image.originFileObj) {
              // antd Upload file shape fallback
              formData.append(`variants[${idx}][image]`, v.image.originFileObj, v.image.name || `variant-${idx}.jpg`);
            } else if (typeof v.image === 'object' && v.image.url) {
              // server returned url object
              formData.append(`variants[${idx}][image]`, v.image.url);
            } else if (typeof v.image === 'string') {
              // plain url string
              formData.append(`variants[${idx}][image]`, v.image);
            } else {
              // fallback - append the object as-is
              formData.append(`variants[${idx}][image]`, v.image);
            }
          }
        });
      }

      const response = await onSubmit(formData, method);

      if (response) {
        notify({ type: 'success', message: `Data ${title} successfully` });
        router.push('/product');
      }
    } catch (err) {
      notify({
        type: 'error',
        message: `Data failed to ${title}`,
        description: err?.message ?? 'Unknown error'
      });
    }
  };

  const handleEnableForm = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setViewOnly(false);
  };

  // ---------- Table helpers ----------
  const productAfter = useCallback(
    (i) => {
      const activeAttrs = attributes.filter((a) => a.active);
      let p = 1;
      for (let k = i + 1; k < activeAttrs.length; k++) {
        const len = activeAttrs[k]?.options?.filter((o) => o.value && String(o).trim() !== '').length || 0;
        p *= Math.max(1, len);
      }
      return p;
    },
    [attributes]
  );

  const optionsCount = useMemo(() => {
    const activeAttrs = attributes.filter((a) => a.active);
    return activeAttrs.map((a) => a.options.filter((o) => o.value && String(o).trim() !== '').length || 0);
  }, [attributes]);

  // helper to display option label when selectOptions provided
  const getDisplayLabel = useCallback((attr, rawVal) => {
    if (!attr) return rawVal;
    if (Array.isArray(attr.selectOptions) && attr.selectOptions.length) {
      return attr.selectOptions.find((s) => String(s.value) === String(rawVal))?.label ?? rawVal;
    }
    return rawVal;
  }, []);

  // Decide which active attribute index should be used for grouping/upload image
  const chooseImageAttrIndex = useCallback((activeAttrs) => {
    if (!Array.isArray(activeAttrs) || activeAttrs.length === 0) return 0;
    const names = activeAttrs.map((a) => String(a.name || '').toLowerCase());
    const hasMaterial = names.includes('material');
    const hasColor = names.includes('color');
    const hasSize = names.includes('size');

    // 1. Color + Material + Size  > Upload Image Color
    if (hasColor && hasMaterial && hasSize) return names.indexOf('color');

    // 2. Two-attribute rules:
    // Color + Material -> Color
    if (hasColor && hasMaterial) return names.indexOf('color');
    // Color + Size -> Color
    if (hasColor && hasSize) return names.indexOf('color');
    // Material + Size -> Material
    if (hasMaterial && hasSize) return names.indexOf('material');

    // 3. Single attribute present: use that attribute
    if (hasMaterial) return names.indexOf('material');
    if (hasColor) return names.indexOf('color');
    if (hasSize) return names.indexOf('size');

    // fallback
    return 0;
  }, []);

  const renderVariantTable = () => {
    const activeAttrs = attributes.filter((a) => a.active);
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
                    // groupSize represents how many rows one value of this attribute should span across children attributes
                    const groupSize = blockSize * Math.max(1, countAtI);
                    const positionWithinGroup = groupSize === 0 ? 0 : rowIndex % groupSize;
                    const shouldRender = groupSize === 0 ? false : positionWithinGroup % blockSize === 0;
                    if (!shouldRender) return null;

                    const rs = blockSize || 1;
                    const rawVal = row.values[idx] ?? '';
                    const displayVal = getDisplayLabel(a, rawVal);

                    // If this attribute is the image attribute, render UploadImage inside the cell
                    if (idx === imageAttrIndex) {
                      return (
                        <td key={`img-${a.id}-${rawVal}-${rowIndex}`} rowSpan={rs} align='center'>
                          <div className={style.variationUpload}>
                            <UploadImage
                              variant='simple'
                              maxCount={1}
                              disabled={viewOnly}
                              // convert stored groupImages value to UploadImage expected value
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

  // ---------- Variant data handlers ----------
  const updateVariantField = useCallback((key, field, value) => {
    setVariantData((prev) => {
      const base = prev && prev[key] ? prev[key] : { sku: '', price: 0, stock: 0, variant_id: null };
      return { ...prev, [key]: { ...base, [field]: value } };
    });
  }, []);

  const memberPrice = Form.useWatch('member_price', formInstance);
  const dealerPrice = Form.useWatch('dealer_price', formInstance);

  // ========== MEMBER DISCOUNT HANDLERS (FIXED) ==========
  const handleMemberNumberChange = useCallback(
    (value) => {
      if (!memberPrice || memberPrice === 0) return;

      const numValue = value || 0;
      setMemberDiscountNumber(numValue);

      // Calculate percentage
      const percentage = (numValue / memberPrice) * 100;
      const roundedPercentage = Math.round(percentage * 100) / 100;
      setMemberDiscountPercentage(roundedPercentage);

      // Update form
      formInstance.setFieldsValue({
        discount_member_number: numValue,
        discount_member: roundedPercentage
      });
    },
    [memberPrice, formInstance]
  );

  const handleMemberPercentageChange = useCallback(
    (value) => {
      if (!memberPrice || memberPrice === 0) return;

      const percentValue = value || 0;
      setMemberDiscountPercentage(percentValue);

      // Calculate number
      const discountAmount = (memberPrice * percentValue) / 100;
      const roundedAmount = Math.round(discountAmount);
      setMemberDiscountNumber(roundedAmount);

      // Update form
      formInstance.setFieldsValue({
        discount_member_number: roundedAmount,
        discount_member: percentValue
      });
    },
    [memberPrice, formInstance]
  );

  // ========== DEALER DISCOUNT HANDLERS (FIXED) ==========
  const handleDealerNumberChange = useCallback(
    (value) => {
      if (!dealerPrice || dealerPrice === 0) return;

      const numValue = value || 0;
      setDealerDiscountNumber(numValue);

      // Calculate percentage
      const percentage = (numValue / dealerPrice) * 100;
      const roundedPercentage = Math.round(percentage * 100) / 100;
      setDealerDiscountPercentage(roundedPercentage);

      // Update form
      formInstance.setFieldsValue({
        discount_dealer_number: numValue,
        discount_dealer: roundedPercentage
      });
    },
    [dealerPrice, formInstance]
  );

  const handleDealerPercentageChange = useCallback(
    (value) => {
      if (!dealerPrice || dealerPrice === 0) return;

      const percentValue = value || 0;
      setDealerDiscountPercentage(percentValue);

      // Calculate number
      const discountAmount = (dealerPrice * percentValue) / 100;
      const roundedAmount = Math.round(discountAmount);
      setDealerDiscountNumber(roundedAmount);

      // Update form
      formInstance.setFieldsValue({
        discount_dealer_number: roundedAmount,
        discount_dealer: percentValue
      });
    },
    [dealerPrice, formInstance]
  );

  // Initialize discount values from data (FIXED)
  useEffect(() => {
    if (!data) return;

    // Initialize member discount
    if (data.discount_member_number) {
      setMemberDiscountNumber(data.discount_member_number);
      setMemberDiscountEnabled(true);

      if (data.member_price > 0) {
        const percentage = (data.discount_member_number / data.member_price) * 100;
        setMemberDiscountPercentage(Math.round(percentage * 100) / 100);
      }
    }

    // Initialize dealer discount
    if (data.discount_dealer_number) {
      setDealerDiscountNumber(data.discount_dealer_number);
      setDealerDiscountEnabled(true);

      if (data.dealer_price > 0) {
        const percentage = (data.discount_dealer_number / data.dealer_price) * 100;
        setDealerDiscountPercentage(Math.round(percentage * 100) / 100);
      }
    }
  }, [data]);

  // ---------- Render ----------
  return (
    <>
      {notificationHolder}
      <section id='product-form' className='section-form'>
        <div className='row-container'>
          <Breadcrumb
            items={[
              { title: <Link href='/product'>Product</Link> },
              {
                title:
                  action === 'add'
                    ? 'Add Product'
                    : action === 'edit'
                      ? `Edit ${data?.name ?? ''}`
                      : `Detail ${data?.name ?? ''}`
              }
            ]}
          />
        </div>

        <Form form={formInstance} id='form-product' layout='vertical' onFinish={handleFinish} autoComplete='off'>
          <Form.Item name='id' hidden>
            <Input />
          </Form.Item>

          <Row gutter={24}>
            <Col span={15}>
              <Collapse
                expandIconPosition='end'
                expandIcon={() => <DownOutlined />}
                defaultActiveKey={['general', 'price']}
                items={[
                  {
                    key: 'general',
                    label: 'General Information',
                    children: (
                      <TranslationTabs>
                        {(lang) => (
                          <>
                            <Form.Item
                              label='Product Name'
                              name={[lang, 'name']}
                              rules={[{ required: true, message: 'Please input product name!' }]}>
                              <Input placeholder='Enter product name' disabled={viewOnly} />
                            </Form.Item>
                            <Form.Item label='Custom URL' name={[lang, 'slug']}>
                              <Input placeholder='Enter custom url' disabled={viewOnly} />
                            </Form.Item>
                            <Form.Item
                              label='Deskripsi'
                              name={[lang, 'description']}
                              rules={[{ required: true, message: 'Please input deskripsi!' }]}>
                              <TextEditor readOnly={viewOnly} />
                            </Form.Item>
                            <Row align='middle' gutter={[12]} className={style.row}>
                              <Col>
                                <Switch
                                  checked={featureEnabled}
                                  onChange={(checked) => setFeatureEnabled(checked)}
                                  disabled={viewOnly}
                                />
                              </Col>
                              <Col>Feature</Col>
                            </Row>
                            <Form.Item
                              name={[lang, 'feature']}
                              hidden={!featureEnabled}
                              rules={[{ required: featureEnabled, message: 'Please input feature!' }]}>
                              <TextEditor readOnly={viewOnly} />
                            </Form.Item>
                          </>
                        )}
                      </TranslationTabs>
                    )
                  },
                  {
                    key: 'price',
                    label: 'Price and Stock',
                    children: (
                      <Tabs
                        activeKey={tabKey}
                        onChange={setTabKey}
                        items={[
                          {
                            key: 'simple',
                            label: 'Simple Product',
                            disabled: viewOnly,
                            children: (
                              <>
                                <Form.Item
                                  label='SKU'
                                  name='sku'
                                  rules={[{ required: tabKey === 'simple', message: 'Please input SKU!' }]}>
                                  <Input placeholder='Enter SKU' disabled={viewOnly} />
                                </Form.Item>
                                <Form.Item
                                  label='Member Price'
                                  name='member_price'
                                  rules={[{ required: tabKey === 'simple', message: 'Please input member price!' }]}>
                                  <InputNumber
                                    min={0}
                                    step={1000}
                                    placeholder='Rp'
                                    disabled={viewOnly}
                                    formatter={(value) => {
                                      if (value || value === 0) return Currency.formatRp(value);
                                      return '';
                                    }}
                                    parser={(value) => {
                                      const parsed = Currency.removeRp(value || '');
                                      return parsed !== undefined && parsed !== null ? Number(parsed) : 0;
                                    }}
                                  />
                                </Form.Item>
                                <Row gutter={[16, 16]} className='ant-form-item' align='bottom'>
                                  <Col span={8}>
                                    <Form.Item
                                      label={
                                        <Switch
                                          checked={memberDiscountEnabled}
                                          onChange={(checked) => {
                                            setMemberDiscountEnabled(checked);
                                            if (!checked) {
                                              setMemberDiscountNumber(0);
                                              setMemberDiscountPercentage(0);
                                              formInstance.setFieldsValue({
                                                discount_member_number: 0,
                                                discount_member: 0
                                              });
                                            }
                                          }}
                                          data-label='Member Discount'
                                          size='small'
                                          disabled={viewOnly}
                                        />
                                      }
                                      name='discount_member_number'>
                                      <InputNumber
                                        min={0}
                                        step={1000}
                                        placeholder='Rp'
                                        disabled={!memberDiscountEnabled || viewOnly}
                                        value={memberDiscountNumber}
                                        onChange={handleMemberNumberChange}
                                        formatter={(value) => {
                                          if (value || value === 0) return Currency.formatRp(value);
                                          return '';
                                        }}
                                        parser={(value) => {
                                          const parsed = Currency.removeRp(value || '');
                                          return parsed !== undefined && parsed !== null ? Number(parsed) : 0;
                                        }}
                                      />
                                    </Form.Item>
                                  </Col>
                                  <Col span={4}>
                                    <Form.Item name='discount_member'>
                                      <InputNumber
                                        min={0}
                                        max={100}
                                        step={1}
                                        disabled={!memberDiscountEnabled || viewOnly}
                                        value={memberDiscountPercentage}
                                        onChange={handleMemberPercentageChange}
                                        formatter={(value) => (value ? `${value}%` : '')}
                                        parser={(value) => value?.replace('%', '')}
                                        suffix='%'
                                      />
                                    </Form.Item>
                                  </Col>
                                  <Col span={12}>
                                    <Form.Item
                                      label={
                                        <Switch
                                          checked={memberScheduleEnabled}
                                          onChange={(checked) => setMemberScheduleEnabled(checked)}
                                          data-label='Member Schedule'
                                          size='small'
                                          disabled={viewOnly}
                                        />
                                      }
                                      name='discount_member_schedule'>
                                      <RangePicker
                                        disabled={!memberScheduleEnabled || viewOnly}
                                        allowClear={false}
                                        format='DD MMM YYYY'
                                        presets={rangePresets}
                                        value={memberScheduleDateRange}
                                        onChange={(dates) => setMemberScheduleDateRange(dates)}
                                      />
                                    </Form.Item>
                                  </Col>
                                </Row>
                                <Form.Item
                                  label='Dealer Price'
                                  name='dealer_price'
                                  rules={[{ required: tabKey === 'simple', message: 'Please input dealer price!' }]}>
                                  <InputNumber
                                    min={0}
                                    step={1000}
                                    placeholder='Rp'
                                    disabled={viewOnly}
                                    formatter={(value) => {
                                      if (value || value === 0) return Currency.formatRp(value);
                                      return '';
                                    }}
                                    parser={(value) => {
                                      const parsed = Currency.removeRp(value || '');
                                      return parsed !== undefined && parsed !== null ? Number(parsed) : 0;
                                    }}
                                  />
                                </Form.Item>
                                <Row gutter={[16, 16]} className='ant-form-item' align='bottom'>
                                  <Col span={8}>
                                    <Form.Item
                                      label={
                                        <Switch
                                          checked={dealerDiscountEnabled}
                                          onChange={(checked) => {
                                            setDealerDiscountEnabled(checked);
                                            if (!checked) {
                                              setDealerDiscountNumber(0);
                                              setDealerDiscountPercentage(0);
                                              formInstance.setFieldsValue({
                                                discount_dealer_number: 0,
                                                discount_dealer: 0
                                              });
                                            }
                                          }}
                                          data-label='Dealer Discount'
                                          size='small'
                                          disabled={viewOnly}
                                        />
                                      }
                                      name='discount_dealer_number'>
                                      <InputNumber
                                        min={0}
                                        step={1000}
                                        placeholder='Rp'
                                        disabled={!dealerDiscountEnabled || viewOnly}
                                        value={dealerDiscountNumber}
                                        onChange={handleDealerNumberChange}
                                        formatter={(value) => {
                                          if (value || value === 0) return Currency.formatRp(value);
                                          return '';
                                        }}
                                        parser={(value) => {
                                          const parsed = Currency.removeRp(value || '');
                                          return parsed !== undefined && parsed !== null ? Number(parsed) : 0;
                                        }}
                                      />
                                    </Form.Item>
                                  </Col>
                                  <Col span={4}>
                                    <Form.Item name='discount_dealer'>
                                      <InputNumber
                                        min={0}
                                        max={100}
                                        step={1}
                                        disabled={!dealerDiscountEnabled || viewOnly}
                                        value={dealerDiscountPercentage}
                                        onChange={handleDealerPercentageChange}
                                        formatter={(value) => (value ? `${value}%` : '')}
                                        parser={(value) => value?.replace('%', '')}
                                        suffix='%'
                                      />
                                    </Form.Item>
                                  </Col>
                                  <Col span={12}>
                                    <Form.Item
                                      label={
                                        <Switch
                                          checked={dealerScheduleEnabled}
                                          onChange={(checked) => setDealerScheduleEnabled(checked)}
                                          data-label='Dealer Schedule'
                                          size='small'
                                          disabled={viewOnly}
                                        />
                                      }
                                      name='discount_dealer_schedule'>
                                      <RangePicker
                                        disabled={!dealerScheduleEnabled || viewOnly}
                                        allowClear={false}
                                        format='DD MMM YYYY'
                                        presets={rangePresets}
                                        value={dealerScheduleDateRange}
                                        onChange={(dates) => setDealerScheduleDateRange(dates)}
                                      />
                                    </Form.Item>
                                  </Col>
                                </Row>
                                <Form.Item
                                  label={
                                    <Switch
                                      checked={manageStockEnabled}
                                      onChange={(checked) => setManageStockEnabled(checked)}
                                      data-label='Manage Stock'
                                      size='small'
                                      disabled={viewOnly}
                                    />
                                  }
                                  name='stock'>
                                  <Input type='number' placeholder='Stock' disabled={!manageStockEnabled || viewOnly} />
                                </Form.Item>
                                <Row gutter={[16, 16]}>
                                  <Col span={12}>
                                    <Form.Item label='Weight' name='weight'>
                                      <Input suffix='g' type='number' placeholder='Weight' disabled={viewOnly} />
                                    </Form.Item>
                                  </Col>
                                  <Col span={12}>
                                    <Form.Item label='Width' name='width'>
                                      <Input suffix='cm' type='number' placeholder='Width' disabled={viewOnly} />
                                    </Form.Item>
                                  </Col>
                                  <Col span={12}>
                                    <Form.Item label='Length' name='length'>
                                      <Input suffix='cm' type='number' placeholder='Length' disabled={viewOnly} />
                                    </Form.Item>
                                  </Col>
                                  <Col span={12}>
                                    <Form.Item label='Height' name='height'>
                                      <Input suffix='cm' type='number' placeholder='Height' disabled={viewOnly} />
                                    </Form.Item>
                                  </Col>
                                </Row>
                              </>
                            )
                          },
                          {
                            key: 'variant',
                            label: 'Variable Product',
                            disabled: viewOnly,
                            children: (
                              <>
                                <div className='row-container'>
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
                                                    onClick={() => activateAttribute(attr.id)}
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

                                          {/** Only render sortable options area for active attributes */}
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
                                                    onChangeValue={(optId, val) =>
                                                      updateOptionValue(attr.id, optId, val)
                                                    }
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
                                  {renderVariantTable()}
                                </div>

                                <Row gutter={[16, 16]} style={{ marginTop: 12 }}>
                                  <Col span={12}>
                                    <Form.Item label='Weight' name='weight'>
                                      <Input suffix='g' type='number' placeholder='Weight' disabled={viewOnly} />
                                    </Form.Item>
                                  </Col>
                                  <Col span={12}>
                                    <Form.Item label='Width' name='width'>
                                      <Input suffix='cm' type='number' placeholder='Width' disabled={viewOnly} />
                                    </Form.Item>
                                  </Col>
                                  <Col span={12}>
                                    <Form.Item label='Length' name='length'>
                                      <Input suffix='cm' type='number' placeholder='Length' disabled={viewOnly} />
                                    </Form.Item>
                                  </Col>
                                  <Col span={12}>
                                    <Form.Item label='Height' name='height'>
                                      <Input suffix='cm' type='number' placeholder='Height' disabled={viewOnly} />
                                    </Form.Item>
                                  </Col>
                                </Row>
                              </>
                            )
                          }
                        ]}
                      />
                    )
                  }
                ]}
              />
            </Col>

            <Col span={9}>
              <Collapse
                expandIconPosition='end'
                expandIcon={() => <DownOutlined />}
                defaultActiveKey={['product_type', 'cover', 'tags', 'category', 'brand', 'color', 'promotion']}
                items={[
                  {
                    key: 'product_type',
                    label: 'Product Type',
                    children: (
                      <Form.Item
                        name='product_type'
                        rules={[{ required: true, message: 'Select at least one product type!' }]}>
                        <Checkbox.Group
                          className={style.checkboxGroup}
                          disabled={viewOnly}
                          options={[
                            { label: 'Member', value: 'member' },
                            { label: 'Dealer', value: 'dealer' }
                          ]}
                        />
                      </Form.Item>
                    )
                  },
                  {
                    key: 'cover',
                    label: 'Cover Image',
                    children: (
                      <Form.Item name='image' help='size: 1440 x 1078'>
                        <UploadImage maxCount={4} disabled={viewOnly} />
                      </Form.Item>
                    )
                  },
                  {
                    key: 'tags',
                    label: 'Tags',
                    children: (
                      <Form.Item name='tags' rules={[{ required: true, message: 'Select tags!' }]}>
                        <Select mode='tags' showSearch allowClear disabled={viewOnly} placeholder='Select tags' />
                      </Form.Item>
                    )
                  },
                  {
                    key: 'category',
                    label: 'Category',
                    children: (
                      <Form.Item name='category_ids' rules={[{ required: true, message: 'Select category!' }]}>
                        <TreeSelect
                          showSearch
                          allowClear
                          disabled={viewOnly}
                          placeholder='Select category'
                          treeData={categoryTreeOptions}
                          treeDefaultExpandAll
                          treeLine
                          treeCheckable
                          treeCheckStrictly
                        />
                      </Form.Item>
                    )
                  },
                  {
                    key: 'brand',
                    label: 'Brand',
                    children: (
                      <Form.Item name='brand_ids' rules={[{ required: true, message: 'Select brand!' }]}>
                        <TreeSelect
                          showSearch
                          allowClear
                          disabled={viewOnly}
                          placeholder='Select brand'
                          treeData={brandTreeOptions}
                          treeDefaultExpandAll
                          treeLine
                          treeCheckable
                          treeCheckStrictly
                        />
                      </Form.Item>
                    )
                  },
                  {
                    key: 'color',
                    label: 'Color',
                    children: (
                      <Form.Item name='color_ids' rules={[{ required: true, message: 'Select color!' }]}>
                        <TreeSelect
                          showSearch
                          allowClear
                          disabled={viewOnly}
                          placeholder='Select color'
                          treeData={colorTreeOptions}
                          treeDefaultExpandAll
                          treeLine
                          treeCheckable
                          treeCheckStrictly
                        />
                      </Form.Item>
                    )
                  },
                  {
                    key: 'promotion',
                    label: 'Promotion',
                    children: (
                      <Form.Item name='promotion_ids' rules={[{ required: true, message: 'Select promotion!' }]}>
                        <TreeSelect
                          showSearch
                          allowClear
                          disabled={viewOnly}
                          placeholder='Select promotion'
                          treeData={promotionTreeOptions}
                          treeDefaultExpandAll
                          treeLine
                          treeCheckable
                          treeCheckStrictly
                        />
                      </Form.Item>
                    )
                  }
                ]}
              />
            </Col>
          </Row>

          <Form.Item shouldUpdate className='floating-btn'>
            <Space size={16}>
              <Link href='/product'>
                <Button color='primary' variant='outlined'>
                  Cancel
                </Button>
              </Link>
              {viewOnly ? (
                <Button type='primary' htmlType='button' onClick={handleEnableForm}>
                  Edit
                </Button>
              ) : (
                <Button type='primary' htmlType='submit' form='form-product' loading={loading}>
                  Save
                </Button>
              )}
            </Space>
          </Form.Item>
        </Form>

        {slug && (
          <CardUserLog
            created_by={data?.created_by}
            updated_by={data?.updated_by}
            created_at={data?.created_at}
            updated_at={data?.updated_at}
          />
        )}
      </section>
    </>
  );
};

export default ProductFormView;
