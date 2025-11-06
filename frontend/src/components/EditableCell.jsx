import React, { useState } from 'react';
import { Input, InputNumber } from 'antd';

/**
 * 可编辑单元格组件
 * 双击进入编辑模式，失焦或回车保存，ESC取消
 */
const EditableCell = ({ 
  value, 
  onChange, 
  type = 'text', 
  placeholder = '',
  min = 1,
  max
}) => {
  const [editing, setEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);
  const [tempValue, setTempValue] = useState(value);

  // 进入编辑模式
  const handleEdit = () => {
    setEditing(true);
    setTempValue(currentValue);
  };

  // 保存编辑
  const handleSave = () => {
    setEditing(false);
    
    // 校验并保存
    if (type === 'number') {
      const num = parseInt(tempValue);
      if (!isNaN(num) && num > 0) {
        setCurrentValue(num);
        onChange(num);
      } else {
        setTempValue(currentValue);
      }
    } else {
      const trimmed = String(tempValue || '').trim();
      setCurrentValue(trimmed);
      onChange(trimmed);
    }
  };

  // 取消编辑
  const handleCancel = () => {
    setEditing(false);
    setTempValue(currentValue);
  };

  // 处理键盘事件
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  // 渲染编辑模式
  if (editing) {
    if (type === 'number') {
      return (
        <InputNumber
          value={tempValue}
          onChange={setTempValue}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          min={min}
          max={max}
          autoFocus
          style={{ width: '100%' }}
        />
      );
    }
    
    return (
      <Input
        value={tempValue}
        onChange={(e) => setTempValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        autoFocus
      />
    );
  }

  // 渲染显示模式
  return (
    <div 
      onDoubleClick={handleEdit}
      style={{ 
        cursor: 'pointer', 
        padding: '4px 8px',
        minHeight: '32px',
        display: 'flex',
        alignItems: 'center'
      }}
      title="双击编辑"
    >
      {currentValue || <span style={{ color: '#999' }}>{placeholder}</span>}
    </div>
  );
};

export default EditableCell;
