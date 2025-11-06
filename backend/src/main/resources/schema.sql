-- 批量勾选信息管理系统数据库初始化脚本

-- 创建数据库
CREATE DATABASE IF NOT EXISTS batch_selection DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE batch_selection;

-- 创建应用数据表
CREATE TABLE IF NOT EXISTS app_info (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '主键ID',
    app_name VARCHAR(64) NOT NULL COMMENT '应用名称',
    group_name VARCHAR(64) NOT NULL COMMENT '分组名称',
    gray_group_name VARCHAR(64) DEFAULT NULL COMMENT '灰度分组名称',
    idc VARCHAR(32) NOT NULL COMMENT '机房',
    zone VARCHAR(32) NOT NULL COMMENT '分区',
    spec VARCHAR(64) NOT NULL COMMENT '参数规格',
    disk_size INT NOT NULL COMMENT '硬盘大小(GB)',
    pod_count INT NOT NULL COMMENT 'Pod数量',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX idx_app_group (app_name, group_name) COMMENT '应用分组联合索引'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='应用数据表';

-- 创建任务表
CREATE TABLE IF NOT EXISTS task_info (
    task_id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '任务ID',
    app_name VARCHAR(64) NOT NULL COMMENT '应用名称',
    group_name VARCHAR(64) NOT NULL COMMENT '分组名称',
    gray_group_name VARCHAR(64) DEFAULT NULL COMMENT '灰度分组名称',
    idc VARCHAR(32) NOT NULL COMMENT '机房',
    zone VARCHAR(32) NOT NULL COMMENT '分区',
    spec VARCHAR(64) NOT NULL COMMENT '参数规格',
    disk_size INT NOT NULL COMMENT '硬盘大小(GB)',
    pod_count INT NOT NULL COMMENT 'Pod数量',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '任务创建时间',
    INDEX idx_created_at (created_at) COMMENT '创建时间索引'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='任务表';
