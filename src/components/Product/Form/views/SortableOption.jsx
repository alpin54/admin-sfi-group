// -- libraries
import { Button, Input, Select } from 'antd';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// -- icons
import { DeleteOutlined } from '@ant-design/icons';

// -- styles
import style from '@components/Product/Form/styles/style.module.scss';

// -- components
import DragHandle from '@components/Product/Form/views/DragHandle';

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

export default SortableOption;
