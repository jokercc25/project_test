-- 测试数据SQL脚本

USE batch_selection;

-- 插入测试应用数据
INSERT INTO app_info (app_name, group_name, gray_group_name, idc, zone, spec, disk_size, pod_count) VALUES
('app1', 'group1', 'gray-group1', '固安', 'zone-a', '4C8G', 100, 5),
('app1', 'group2', 'gray-group2', '固安', 'zone-b', '8C16G', 200, 10),
('app1', 'group3', NULL, '北京', 'zone-a', '4C8G', 150, 8),
('app2', 'group1', 'gray-group1', '上海', 'zone-a', '2C4G', 80, 3),
('app2', 'group2', NULL, '上海', 'zone-b', '4C8G', 100, 6),
('app3', 'group1', 'gray-group1', '固安', 'zone-c', '16C32G', 500, 20),
('app3', 'group2', 'gray-group2', '北京', 'zone-a', '8C16G', 200, 12),
('app3', 'group3', NULL, '北京', 'zone-b', '4C8G', 100, 5),
('app3', 'group4', 'gray-group3', '上海', 'zone-a', '4C8G', 120, 7);

-- 查询验证
SELECT COUNT(*) as total_records FROM app_info;
SELECT app_name, COUNT(*) as group_count FROM app_info GROUP BY app_name;
