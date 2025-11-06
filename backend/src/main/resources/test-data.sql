-- 测试数据SQL脚本

-- 清空现有数据（可选）
DELETE FROM app_info;

-- 插入100条测试数据
INSERT INTO app_info (app_name, group_name, gray_group_name, idc, zone, spec, disk_size, pod_count) VALUES
-- app1 (10个分组)
('app1', 'group1', 'gray-group1', '固安', 'zone-a', '4C8G', 100, 5),
('app1', 'group2', 'gray-group2', '固安', 'zone-b', '8C16G', 200, 10),
('app1', 'group3', NULL, '北京', 'zone-a', '4C8G', 150, 8),
('app1', 'group4', 'gray-group4', '上海', 'zone-a', '2C4G', 80, 3),
('app1', 'group5', NULL, '上海', 'zone-b', '4C8G', 100, 6),
('app1', 'group6', 'gray-group6', '固安', 'zone-c', '16C32G', 500, 20),
('app1', 'group7', 'gray-group7', '北京', 'zone-b', '8C16G', 200, 12),
('app1', 'group8', NULL, '北京', 'zone-c', '4C8G', 120, 7),
('app1', 'group9', 'gray-group9', '上海', 'zone-c', '2C4G', 60, 4),
('app1', 'group10', NULL, '固安', 'zone-a', '8C16G', 180, 9),

-- app2 (10个分组)
('app2', 'group1', 'gray-group1', '固安', 'zone-a', '4C8G', 100, 5),
('app2', 'group2', NULL, '固安', 'zone-b', '8C16G', 200, 10),
('app2', 'group3', 'gray-group3', '北京', 'zone-a', '2C4G', 80, 4),
('app2', 'group4', NULL, '北京', 'zone-b', '4C8G', 120, 6),
('app2', 'group5', 'gray-group5', '上海', 'zone-a', '8C16G', 250, 15),
('app2', 'group6', NULL, '上海', 'zone-b', '4C8G', 100, 5),
('app2', 'group7', 'gray-group7', '固安', 'zone-c', '16C32G', 600, 25),
('app2', 'group8', NULL, '北京', 'zone-c', '8C16G', 180, 10),
('app2', 'group9', 'gray-group9', '上海', 'zone-c', '4C8G', 140, 8),
('app2', 'group10', NULL, '固安', 'zone-a', '2C4G', 70, 3),

-- app3 (10个分组)
('app3', 'group1', 'gray-group1', '固安', 'zone-a', '8C16G', 200, 12),
('app3', 'group2', 'gray-group2', '固安', 'zone-b', '4C8G', 150, 8),
('app3', 'group3', NULL, '北京', 'zone-a', '16C32G', 500, 20),
('app3', 'group4', 'gray-group4', '北京', 'zone-b', '8C16G', 220, 11),
('app3', 'group5', NULL, '上海', 'zone-a', '4C8G', 100, 6),
('app3', 'group6', 'gray-group6', '上海', 'zone-b', '2C4G', 80, 4),
('app3', 'group7', NULL, '固安', 'zone-c', '8C16G', 190, 10),
('app3', 'group8', 'gray-group8', '北京', 'zone-c', '4C8G', 130, 7),
('app3', 'group9', NULL, '上海', 'zone-c', '16C32G', 550, 22),
('app3', 'group10', 'gray-group10', '固安', 'zone-a', '8C16G', 210, 13),

-- app4 (10个分组)
('app4', 'group1', 'gray-group1', '北京', 'zone-a', '4C8G', 120, 7),
('app4', 'group2', NULL, '北京', 'zone-b', '8C16G', 240, 14),
('app4', 'group3', 'gray-group3', '上海', 'zone-a', '2C4G', 60, 3),
('app4', 'group4', NULL, '上海', 'zone-b', '4C8G', 110, 6),
('app4', 'group5', 'gray-group5', '固安', 'zone-a', '16C32G', 480, 18),
('app4', 'group6', NULL, '固安', 'zone-b', '8C16G', 190, 10),
('app4', 'group7', 'gray-group7', '北京', 'zone-c', '4C8G', 130, 8),
('app4', 'group8', NULL, '上海', 'zone-c', '8C16G', 200, 11),
('app4', 'group9', 'gray-group9', '固安', 'zone-c', '4C8G', 140, 7),
('app4', 'group10', NULL, '北京', 'zone-a', '2C4G', 70, 4),

-- app5 (10个分组)
('app5', 'group1', NULL, '上海', 'zone-a', '8C16G', 210, 12),
('app5', 'group2', 'gray-group2', '上海', 'zone-b', '4C8G', 150, 8),
('app5', 'group3', NULL, '固安', 'zone-a', '16C32G', 520, 21),
('app5', 'group4', 'gray-group4', '固安', 'zone-b', '8C16G', 230, 13),
('app5', 'group5', NULL, '北京', 'zone-a', '4C8G', 105, 6),
('app5', 'group6', 'gray-group6', '北京', 'zone-b', '2C4G', 75, 4),
('app5', 'group7', NULL, '上海', 'zone-c', '8C16G', 195, 11),
('app5', 'group8', 'gray-group8', '固安', 'zone-c', '4C8G', 135, 7),
('app5', 'group9', NULL, '北京', 'zone-c', '16C32G', 560, 23),
('app5', 'group10', 'gray-group10', '上海', 'zone-a', '8C16G', 215, 12),

-- app6 (10个分组)
('app6', 'group1', 'gray-group1', '固安', 'zone-a', '4C8G', 125, 7),
('app6', 'group2', NULL, '固安', 'zone-b', '8C16G', 245, 14),
('app6', 'group3', 'gray-group3', '北京', 'zone-a', '2C4G', 65, 3),
('app6', 'group4', NULL, '北京', 'zone-b', '4C8G', 115, 6),
('app6', 'group5', 'gray-group5', '上海', 'zone-a', '16C32G', 490, 19),
('app6', 'group6', NULL, '上海', 'zone-b', '8C16G', 195, 11),
('app6', 'group7', 'gray-group7', '固安', 'zone-c', '4C8G', 135, 8),
('app6', 'group8', NULL, '北京', 'zone-c', '8C16G', 205, 12),
('app6', 'group9', 'gray-group9', '上海', 'zone-c', '4C8G', 145, 7),
('app6', 'group10', NULL, '固安', 'zone-a', '2C4G', 75, 4),

-- app7 (10个分组)
('app7', 'group1', NULL, '北京', 'zone-a', '8C16G', 220, 13),
('app7', 'group2', 'gray-group2', '北京', 'zone-b', '4C8G', 155, 9),
('app7', 'group3', NULL, '上海', 'zone-a', '16C32G', 530, 22),
('app7', 'group4', 'gray-group4', '上海', 'zone-b', '8C16G', 235, 14),
('app7', 'group5', NULL, '固安', 'zone-a', '4C8G', 110, 6),
('app7', 'group6', 'gray-group6', '固安', 'zone-b', '2C4G', 80, 4),
('app7', 'group7', NULL, '北京', 'zone-c', '8C16G', 200, 11),
('app7', 'group8', 'gray-group8', '上海', 'zone-c', '4C8G', 140, 8),
('app7', 'group9', NULL, '固安', 'zone-c', '16C32G', 570, 24),
('app7', 'group10', 'gray-group10', '北京', 'zone-a', '8C16G', 225, 13),

-- app8 (10个分组)
('app8', 'group1', 'gray-group1', '上海', 'zone-a', '4C8G', 130, 7),
('app8', 'group2', NULL, '上海', 'zone-b', '8C16G', 250, 15),
('app8', 'group3', 'gray-group3', '固安', 'zone-a', '2C4G', 70, 3),
('app8', 'group4', NULL, '固安', 'zone-b', '4C8G', 120, 6),
('app8', 'group5', 'gray-group5', '北京', 'zone-a', '16C32G', 500, 20),
('app8', 'group6', NULL, '北京', 'zone-b', '8C16G', 200, 11),
('app8', 'group7', 'gray-group7', '上海', 'zone-c', '4C8G', 140, 8),
('app8', 'group8', NULL, '固安', 'zone-c', '8C16G', 210, 12),
('app8', 'group9', 'gray-group9', '北京', 'zone-c', '4C8G', 150, 8),
('app8', 'group10', NULL, '上海', 'zone-a', '2C4G', 80, 4),

-- app9 (10个分组)
('app9', 'group1', NULL, '固安', 'zone-a', '8C16G', 230, 14),
('app9', 'group2', 'gray-group2', '固安', 'zone-b', '4C8G', 160, 9),
('app9', 'group3', NULL, '北京', 'zone-a', '16C32G', 540, 23),
('app9', 'group4', 'gray-group4', '北京', 'zone-b', '8C16G', 240, 14),
('app9', 'group5', NULL, '上海', 'zone-a', '4C8G', 115, 6),
('app9', 'group6', 'gray-group6', '上海', 'zone-b', '2C4G', 85, 4),
('app9', 'group7', NULL, '固安', 'zone-c', '8C16G', 205, 12),
('app9', 'group8', 'gray-group8', '北京', 'zone-c', '4C8G', 145, 8),
('app9', 'group9', NULL, '上海', 'zone-c', '16C32G', 580, 25),
('app9', 'group10', 'gray-group10', '固安', 'zone-a', '8C16G', 235, 14),

-- app10 (10个分组)
('app10', 'group1', 'gray-group1', '北京', 'zone-a', '4C8G', 135, 8),
('app10', 'group2', NULL, '北京', 'zone-b', '8C16G', 255, 15),
('app10', 'group3', 'gray-group3', '上海', 'zone-a', '2C4G', 75, 4),
('app10', 'group4', NULL, '上海', 'zone-b', '4C8G', 125, 7),
('app10', 'group5', 'gray-group5', '固安', 'zone-a', '16C32G', 510, 21),
('app10', 'group6', NULL, '固安', 'zone-b', '8C16G', 205, 12),
('app10', 'group7', 'gray-group7', '北京', 'zone-c', '4C8G', 145, 8),
('app10', 'group8', NULL, '上海', 'zone-c', '8C16G', 215, 13),
('app10', 'group9', 'gray-group9', '固安', 'zone-c', '4C8G', 155, 9),
('app10', 'group10', NULL, '北京', 'zone-a', '2C4G', 85, 5);
