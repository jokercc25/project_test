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
      } else {
        message.error(response.message || '加载数据失败');
      }
    } catch (error) {
      message.error('加载数据失败: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // 转换数据为树形结构
  const treeData = useMemo(() => {
    const data = [];
    applications.forEach(app => {
      // 应用级节点
      const appNode = {
        key: `app-${app.appName}`,
        appName: app.appName,
        isApp: true,
        children: []
      };

      // 分组级节点
      app.groups.forEach(group => {
        const groupNode = {
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
          isApp: false,
          // 合并编辑数据
          ...editedData[group.id]
        };
        appNode.children.push(groupNode);
      });

      data.push(appNode);
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
      render: (text, record) => record.isApp ? <strong>{text}</strong> : ''
    },
    {
      title: '分组名',
      dataIndex: 'groupName',
      key: 'groupName',
      width: 150,
      render: (text, record) => {
        if (record.isApp) return null;
        return (
          <EditableCell
            value={text}
            onChange={(value) => handleFieldChange(record.id, 'groupName', value)}
            placeholder="请输入分组名"
          />
        );
      }
    },
    {
      title: '灰度分组名',
      dataIndex: 'grayGroupName',
      key: 'grayGroupName',
      width: 150,
      render: (text, record) => {
        if (record.isApp) return null;
        return (
          <EditableCell
            value={text}
            onChange={(value) => handleFieldChange(record.id, 'grayGroupName', value)}
            placeholder="请输入灰度分组名"
          />
        );
      }
    },
    {
      title: '机房',
      dataIndex: 'idc',
      key: 'idc',
      width: 120,
      render: (text, record) => {
        if (record.isApp) return null;
        return (
          <EditableCell
            value={text}
            onChange={(value) => handleFieldChange(record.id, 'idc', value)}
            placeholder="请输入机房"
          />
        );
      }
    },
    {
      title: '分区',
      dataIndex: 'zone',
      key: 'zone',
      width: 120,
      render: (text, record) => {
        if (record.isApp) return null;
        return (
          <EditableCell
            value={text}
            onChange={(value) => handleFieldChange(record.id, 'zone', value)}
            placeholder="请输入分区"
          />
        );
      }
    },
    {
      title: '参数规格',
      dataIndex: 'spec',
      key: 'spec',
      width: 120,
      render: (text, record) => {
        if (record.isApp) return null;
        return (
          <EditableCell
            value={text}
            onChange={(value) => handleFieldChange(record.id, 'spec', value)}
            placeholder="请输入参数规格"
          />
        );
      }
    },
    {
      title: '硬盘大小(GB)',
      dataIndex: 'diskSize',
      key: 'diskSize',
      width: 140,
      render: (text, record) => {
        if (record.isApp) return null;
        return (
          <EditableCell
            value={text}
            onChange={(value) => handleFieldChange(record.id, 'diskSize', value)}
            type="number"
            min={1}
          />
        );
      }
    },
    {
      title: 'Pod数量',
      dataIndex: 'podCount',
      key: 'podCount',
      width: 120,
      render: (text, record) => {
        if (record.isApp) return null;
        return (
          <EditableCell
            value={text}
            onChange={(value) => handleFieldChange(record.id, 'podCount', value)}
            type="number"
            min={1}
          />
        );
      }
    }
  ];

  // 行选择配置
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys, selectedRows) => {
      setSelectedRowKeys(selectedKeys);
    },
    onSelect: (record, selected, selectedRows) => {
      // 如果是应用级勾选，自动勾选/取消所有子分组
      if (record.isApp) {
        const childKeys = record.children.map(child => child.key);
        if (selected) {
          setSelectedRowKeys(prev => [...new Set([...prev, ...childKeys])]);
        } else {
          setSelectedRowKeys(prev => prev.filter(key => !childKeys.includes(key)));
        }
      }
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      if (selected) {
        // 全选时只选择分组行
        const allGroupKeys = [];
        treeData.forEach(app => {
          app.children.forEach(group => {
            allGroupKeys.push(group.key);
          });
        });
        setSelectedRowKeys(allGroupKeys);
      } else {
        setSelectedRowKeys([]);
      }
    },
    checkStrictly: false,
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
    const selectedTasks = [];
    treeData.forEach(app => {
      app.children.forEach(group => {
        if (selectedRowKeys.includes(group.key)) {
          selectedTasks.push({
            appName: group.appName,
            groupName: group.groupName,
            grayGroupName: group.grayGroupName,
            idc: group.idc,
            zone: group.zone,
            spec: group.spec,
            diskSize: group.diskSize,
            podCount: group.podCount
          });
        }
      });
    });

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
          dataSource={treeData}
          loading={loading}
          rowSelection={rowSelection}
          pagination={false}
          scroll={{ x: 1200, y: 600 }}
          defaultExpandAllRows
          bordered
        />
      </div>
    </div>
  );
};

export default BatchSelectionPage;
