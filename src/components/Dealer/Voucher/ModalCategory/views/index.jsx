// -- libraries
import { useEffect, useState } from 'react';
import { Button, Drawer, Form, Input, Space, Checkbox, Spin, Empty } from 'antd';

// -- icons
import { SearchOutlined } from '@ant-design/icons';

// -- styles
import style from '@components/Voucher/ModalCategory/styles/style.module.scss';

const ModalCategoryView = (props) => {
  const { open, onClose, initialValues, notify, onSave, categories, filters, loading, listRef, onFilterChange } = props;
  const [formInstance] = Form.useForm();
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    if (open) {
      setSelectedCategories(initialValues || []);
    }
  }, [open, initialValues]);

  const handleCheck = (checked, category) => {
    setSelectedCategories((prev) => (checked ? [...prev, category] : prev.filter((c) => c.id !== category.id)));
  };

  const handleFinish = async () => {
    try {
      onSave?.(selectedCategories, 'category');
      onClose?.();
      notify?.({
        type: 'success',
        message: `Data added successfully`
      });
    } catch (err) {
      notify?.({
        type: 'error',
        message: `Data failed to added`,
        description: err?.message ?? 'Unknown error'
      });
    }
  };

  const footerComponent = (
    <Space size={12}>
      <Button color='primary' variant='outlined' onClick={onClose}>
        Cancel
      </Button>
      <Button type='primary' htmlType='submit' form='form-selected-category'>
        Save
      </Button>
    </Space>
  );

  return (
    <Drawer
      title='Category'
      width={600}
      onClose={onClose}
      open={open}
      footer={footerComponent}
      onCancel={onClose}
      closable={true}
      className='drawer-form'>
      <div className={style.search}>
        <Input
          placeholder='Search ...'
          suffix={<SearchOutlined />}
          allowClear
          value={filters?.keyword}
          onChange={(e) => onFilterChange({ keyword: e.target.value })}
        />
      </div>
      <Form
        form={formInstance}
        id='form-selected-category'
        layout='vertical'
        onFinish={handleFinish}
        autoComplete='off'>
        <div ref={listRef} className={style.list}>
          {categories.map((category) => (
            <div className={style.item} key={category.id}>
              <div className={style.text}>
                <p className={style.name}>{category.name}</p>
              </div>
              <div className={style.checkbox}>
                <Checkbox
                  checked={selectedCategories.some((c) => c.id === category.id)}
                  onChange={(e) => handleCheck(e.target.checked, category)}
                />
              </div>
            </div>
          ))}
          {loading && (
            <div className={style.empty}>
              <Spin />
            </div>
          )}
          {!loading && categories.length === 0 && (
            <div className={style.empty}>
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </div>
          )}
        </div>
      </Form>
    </Drawer>
  );
};

export default ModalCategoryView;
