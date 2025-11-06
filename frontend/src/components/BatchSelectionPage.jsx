import React, { useState, useEffect, useMemo } from 'react';
import { Table, Button, message, Space, Typography } from 'antd';
import { getApplications, submitTasks } from '../api';
import EditableCell from './EditableCell';
import './BatchSelectionPage.css';

const { Title } = Typography;

/**
 * 批量勾选信息管理页面主组件
 */
const BatchSelectionPage = () => {
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [applications, setApplications] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [editedData, setEditedData] = useState({});
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '50', '100'],
    showTotal: (total) => `共 ${total} 条数据`
  });

  // 加载应用数据
  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    setLoading(true);
    try {
      const response = await getApplications();
      if (response.code === 200) {
        setApplications(response.data);
        // 计算总记录数
        const totalRecords = response.data.reduce((sum, app) => sum + app.groups.length, 0);
        setPagination(prev => ({ ...prev, total: totalRecords }));
      } else {
        message.error(response.message || '加载数据失败');
      }
    } catch (error) {
      message.error('加载数据失败: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // 转换数据为扁平结构（用于合并单元格）
  const tableData = useMemo(() => {
    const data = [];
    applications.forEach(app => {
      app.groups.forEach((group, index) => {
        data.push({
          key: `group-${group.id}`,
          id: group.id,
          appName: app.appName,
          groupName: group.groupName,
          grayGroupName: group.grayGroupName,
          idc: group.idc,
          zone: group.zone,
          spec: group.spec,
          diskSize: group.diskSize,
          podCount: group.podCount,
          // 用于合并单元格计算
          rowSpan: index === 0 ? app.groups.length : 0,
          // 合并编辑数据
          ...editedData[group.id]
        });
      });
    });
    return data;
  }, [applications, editedData]);

  // 处理字段编辑
  const handleFieldChange = (recordId, fieldName, value) => {
    setEditedData(prev => ({
      ...prev,
      [recordId]: {
        ...prev[recordId],
        [fieldName]: value
      }
    }));
  };

  // 表格列定义
  const columns = [
    {
      title: '应用名',
      dataIndex: 'appName',
      key: 'appName',
      width: 150,
      onCell: (record) => ({
        rowSpan: record.rowSpan,
      }),
      render: (text) => <strong>{text}</strong>
    },
    {
      title: '分组名',
      dataIndex: 'groupName',
      key: 'groupName',
      width: 150,
      render: (text, record) => (
        <EditableCell
          value={text}
          onChange={(value) => handleFieldChange(record.id, 'groupName', value)}
          placeholder="请输入分组名"
        />
      )
    },
    {
      title: '灰度分组名',
      dataIndex: 'grayGroupName',
      key: 'grayGroupName',
      width: 150,
      render: (text, record) => (
        <EditableCell
          value={text}
          onChange={(value) => handleFieldChange(record.id, 'grayGroupName', value)}
          placeholder="请输入灰度分组名"
        />
      )
    },
    {
      title: '机房',
      dataIndex: 'idc',
      key: 'idc',
      width: 120,
      render: (text, record) => (
        <EditableCell
          value={text}
          onChange={(value) => handleFieldChange(record.id, 'idc', value)}
          placeholder="请输入机房"
        />
      )
    },
    {
      title: '分区',
      dataIndex: 'zone',
      key: 'zone',
      width: 120,
      render: (text, record) => (
        <EditableCell
          value={text}
          onChange={(value) => handleFieldChange(record.id, 'zone', value)}
          placeholder="请输入分区"
        />
      )
    },
    {
      title: '参数规格',
      dataIndex: 'spec',
      key: 'spec',
      width: 120,
      render: (text, record) => (
        <EditableCell
          value={text}
          onChange={(value) => handleFieldChange(record.id, 'spec', value)}
          placeholder="请输入参数规格"
        />
      )
    },
    {
      title: '硬盘大小(GB)',
      dataIndex: 'diskSize',
      key: 'diskSize',
      width: 140,
      render: (text, record) => (
        <EditableCell
          value={text}
          onChange={(value) => handleFieldChange(record.id, 'diskSize', value)}
          type="number"
          min={1}
        />
      )
    },
    {
      title: 'Pod数量',
      dataIndex: 'podCount',
      key: 'podCount',
      width: 120,
      render: (text, record) => (
        <EditableCell
          value={text}
          onChange={(value) => handleFieldChange(record.id, 'podCount', value)}
          type="number"
          min={1}
        />
      )
    }
  ];

  // 处理分页变化
  const handleTableChange = (paginationConfig) => {
    setPagination({
      ...pagination,
      current: paginationConfig.current,
      pageSize: paginationConfig.pageSize
    });
  };

  // 行选择配置
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys, selectedRows) => {
      setSelectedRowKeys(selectedKeys);
    },
    getCheckboxProps: (record) => ({
      disabled: false,
    })
  };

  // 提交任务
  const handleSubmit = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请至少勾选一个分组');
      return;
    }

    // 收集勾选的分组数据
    const selectedTasks = tableData
      .filter(group => selectedRowKeys.includes(group.key))
      .map(group => ({
        appName: group.appName,
        groupName: group.groupName,
        grayGroupName: group.grayGroupName,
        idc: group.idc,
        zone: group.zone,
        spec: group.spec,
        diskSize: group.diskSize,
        podCount: group.podCount
      }));

    // 校验必填字段
    for (const task of selectedTasks) {
      if (!task.appName || !task.groupName || !task.idc || !task.zone || !task.spec) {
        message.error('勾选的数据中存在必填字段为空，请检查');
        return;
      }
      if (!task.diskSize || task.diskSize <= 0 || !task.podCount || task.podCount <= 0) {
        message.error('硬盘大小和Pod数量必须为正整数');
        return;
      }
    }

    setSubmitting(true);
    try {
      const response = await submitTasks(selectedTasks);
      if (response.code === 200) {
        message.success(`成功提交 ${response.data.count} 个任务`);
        setSelectedRowKeys([]);
        setEditedData({});
      } else {
        message.error(response.message || '提交失败');
      }
    } catch (error) {
      message.error('提交失败: ' + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  // 取消操作
  const handleCancel = () => {
    setSelectedRowKeys([]);
    setEditedData({});
    message.info('已清空勾选和编辑内容');
  };

  return (
    <div className="batch-selection-page">
      <div className="page-header">
        <Title level={3}>批量勾选信息管理</Title>
      </div>
      
      <div className="toolbar">
        <Space>
          <Button 
            type="primary" 
            onClick={handleSubmit}
            loading={submitting}
            disabled={selectedRowKeys.length === 0}
          >
            提交 ({selectedRowKeys.length})
          </Button>
          <Button onClick={handleCancel}>
            取消
          </Button>
        </Space>
      </div>

      <div className="table-container">
        <Table
          columns={columns}
          dataSource={tableData}
          loading={loading}
          rowSelection={rowSelection}
          pagination={pagination}
          onChange={handleTableChange}
          scroll={{ x: 1200 }}
          bordered
        />
      </div>
    </div>
  );
};

export default BatchSelectionPage;
