# 批量勾选信息管理系统

基于 React + Spring Boot + MySQL 实现的批量勾选信息管理系统，支持树形表格展示、在线编辑、批量提交等功能。

## 项目结构

```
.
├── backend/                    # 后端项目
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/example/batchselection/
│   │   │   │   ├── entity/           # 实体类
│   │   │   │   ├── dto/              # 数据传输对象
│   │   │   │   ├── repository/       # 数据访问层
│   │   │   │   ├── service/          # 业务逻辑层
│   │   │   │   ├── controller/       # 控制器层
│   │   │   │   └── BatchSelectionApplication.java
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       ├── schema.sql        # 数据库表结构
│   │   │       └── test-data.sql     # 测试数据
│   └── pom.xml
├── frontend/                   # 前端项目
│   ├── src/
│   │   ├── api/                # API接口
│   │   ├── components/         # React组件
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
└── README.md
```

## 功能特性

### 核心功能

1. **树形表格展示**
   - 应用-分组两级树形结构
   - 支持展开/折叠应用节点
   - 默认展开所有节点

2. **批量勾选**
   - 应用级勾选：自动勾选该应用下所有分组
   - 分组级勾选：单独勾选/取消分组
   - 半选状态：部分分组被勾选时显示

3. **在线编辑**
   - 双击单元格进入编辑模式
   - 支持文本和数字类型字段
   - 回车保存、ESC取消
   - 失焦自动保存

4. **数据验证**
   - 必填字段校验
   - 数值类型校验（硬盘大小、Pod数量）
   - 提交前完整性检查

5. **批量提交**
   - 收集所有勾选项数据
   - 包含用户编辑后的值
   - 事务性写入任务表
   - 自动生成任务ID和时间戳

### 数据字段

每个分组包含以下字段：
- 应用名
- 分组名（可编辑）
- 灰度分组名（可编辑）
- 机房（可编辑）
- 分区（可编辑）
- 参数规格（可编辑）
- 硬盘大小（可编辑，仅允许正整数）
- Pod数量（可编辑，仅允许正整数）

## 技术栈

### 后端
- Java 11
- Spring Boot 2.7.14
- Spring Data JPA
- MySQL 8.0
- Lombok

### 前端
- React 18
- Ant Design 5
- Axios
- Vite

## 快速开始

### 前置要求

- JDK 11+
- Maven 3.6+
- Node.js 16+
- MySQL 8.0+

### 数据库准备

1. 创建数据库并导入表结构：

```bash
mysql -u root -p < backend/src/main/resources/schema.sql
```

2. 导入测试数据（可选）：

```bash
mysql -u root -p batch_selection < backend/src/main/resources/test-data.sql
```

### 后端启动

1. 修改数据库配置（如需要）：

编辑 `backend/src/main/resources/application.properties`：

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/batch_selection?...
spring.datasource.username=root
spring.datasource.password=your_password
```

2. 编译并启动后端：

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

后端服务将在 http://localhost:8080 启动

### 前端启动

1. 安装依赖：

```bash
cd frontend
npm install
```

2. 启动开发服务器：

```bash
npm run dev
```

前端页面将在 http://localhost:3000 打开

## API 接口

### 1. 查询应用数据

```
GET /api/applications
```

**响应示例**：
```json
{
  "code": 200,
  "message": "success",
  "data": [
    {
      "appName": "app1",
      "groups": [
        {
          "id": 1,
          "groupName": "group1",
          "grayGroupName": "gray-group1",
          "idc": "固安",
          "zone": "zone-a",
          "spec": "4C8G",
          "diskSize": 100,
          "podCount": 5
        }
      ]
    }
  ]
}
```

### 2. 提交任务

```
POST /api/tasks/submit
Content-Type: application/json
```

**请求示例**：
```json
{
  "tasks": [
    {
      "appName": "app1",
      "groupName": "group1",
      "grayGroupName": "gray-group1",
      "idc": "固安",
      "zone": "zone-a",
      "spec": "4C8G",
      "diskSize": 100,
      "podCount": 5
    }
  ]
}
```

**响应示例**：
```json
{
  "code": 200,
  "message": "任务提交成功",
  "data": {
    "taskIds": [1001, 1002],
    "count": 2
  }
}
```

## 使用说明

1. **查看数据**
   - 页面加载后自动展示所有应用和分组数据
   - 点击应用名称左侧箭头可展开/折叠分组列表

2. **勾选数据**
   - 勾选应用：自动勾选该应用下所有分组
   - 勾选分组：单独勾选某个分组
   - 提交按钮显示已勾选数量

3. **编辑数据**
   - 双击可编辑的单元格进入编辑模式
   - 修改后按回车或点击其他地方保存
   - 按ESC键取消编辑
   - 编辑内容仅保存在内存中，提交时才写入数据库

4. **提交任务**
   - 点击"提交"按钮将勾选的数据写入任务表
   - 提交成功后显示生成的任务数量
   - 勾选状态和编辑内容自动清空

5. **取消操作**
   - 点击"取消"按钮清空所有勾选和编辑内容

## 数据库表结构

### app_info（应用数据表）

存储应用和分组的基础信息。

| 字段 | 类型 | 说明 |
|------|------|------|
| id | BIGINT | 主键，自增 |
| app_name | VARCHAR(64) | 应用名称 |
| group_name | VARCHAR(64) | 分组名称 |
| gray_group_name | VARCHAR(64) | 灰度分组名称 |
| idc | VARCHAR(32) | 机房 |
| zone | VARCHAR(32) | 分区 |
| spec | VARCHAR(64) | 参数规格 |
| disk_size | INT | 硬盘大小(GB) |
| pod_count | INT | Pod数量 |
| created_at | TIMESTAMP | 创建时间 |
| updated_at | TIMESTAMP | 更新时间 |

### task_info（任务表）

存储用户提交的任务数据。

| 字段 | 类型 | 说明 |
|------|------|------|
| task_id | BIGINT | 主键，自增 |
| app_name | VARCHAR(64) | 应用名称 |
| group_name | VARCHAR(64) | 分组名称 |
| gray_group_name | VARCHAR(64) | 灰度分组名称 |
| idc | VARCHAR(32) | 机房 |
| zone | VARCHAR(32) | 分区 |
| spec | VARCHAR(64) | 参数规格 |
| disk_size | INT | 硬盘大小(GB) |
| pod_count | INT | Pod数量 |
| created_at | TIMESTAMP | 任务创建时间 |

## 注意事项

1. **数据库连接**：首次启动前请确保 MySQL 服务已启动，且配置文件中的数据库连接信息正确

2. **端口占用**：后端默认使用 8080 端口，前端使用 3000 端口，请确保端口未被占用

3. **跨域配置**：已在后端 Controller 中配置 `@CrossOrigin`，开发环境无需额外配置

4. **数据编辑**：前端编辑的数据仅保存在内存中，刷新页面后会恢复原始值，只有提交后才会写入任务表

5. **任务表**：任务表中的数据是提交时的快照，不会随应用数据表的变化而变化

6. **性能优化**：单次提交限制最多 1000 条任务记录，超过时会返回错误提示

## 扩展功能

未来可扩展的功能点：

- 导出勾选数据为 Excel 文件
- 从 Excel 批量导入数据
- 查询历史任务记录
- 任务状态跟踪（待执行、执行中、已完成）
- 用户权限控制
- 操作日志记录

## 许可证

MIT License
