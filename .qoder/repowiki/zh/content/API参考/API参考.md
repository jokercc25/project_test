# API参考

<cite>
**Referenced Files in This Document**   
- [BatchSelectionController.java](file://backend/src/main/java/com/example/batchselection/controller/BatchSelectionController.java)
- [ApplicationResponseDTO.java](file://backend/src/main/java/com/example/batchselection/dto/ApplicationResponseDTO.java)
- [TaskSubmitDTO.java](file://backend/src/main/java/com/example/batchselection/dto/TaskSubmitDTO.java)
- [TaskSubmitResponse.java](file://backend/src/main/java/com/example/batchselection/dto/TaskSubmitResponse.java)
- [BatchTaskSubmitRequest.java](file://backend/src/main/java/com/example/batchselection/dto/BatchTaskSubmitRequest.java)
- [GroupInfoDTO.java](file://backend/src/main/java/com/example/batchselection/dto/GroupInfoDTO.java)
- [ApiResponse.java](file://backend/src/main/java/com/example/batchselection/dto/ApiResponse.java)
- [BatchSelectionService.java](file://backend/src/main/java/com/example/batchselection/service/BatchSelectionService.java)
- [index.js](file://frontend/src/api/index.js)
</cite>

## 目录
1. [简介](#简介)
2. [GET /api/applications](#get-appplications)
3. [POST /api/tasks/submit](#post-apptaskssubmit)
4. [响应结构](#响应结构)
5. [跨域支持](#跨域支持)
6. [前端调用示例](#前端调用示例)

## 简介
本文档提供了系统暴露的RESTful API的完整参考，旨在为前端开发者提供精确的接口契约。文档详细说明了两个核心接口：`GET /api/applications`用于获取应用及分组数据，以及`POST /api/tasks/submit`用于提交任务。所有接口均返回统一的响应结构，并已启用跨域支持，确保前后端协作无误。

**Section sources**
- [BatchSelectionController.java](file://backend/src/main/java/com/example/batchselection/controller/BatchSelectionController.java#L15-L62)

## GET /api/applications

### 功能说明
获取所有应用及其分组信息。该接口返回系统中所有应用的列表，每个应用包含其名称和下属的分组信息。

### 接口详情
- **HTTP方法**: GET
- **请求路径**: `/api/applications`
- **请求参数**: 无
- **成功状态码**: 200
- **响应内容**: `ApplicationResponseDTO`对象数组

### 响应示例
```json
{
  "code": 200,
  "message": "success",
  "data": [
    {
      "appName": "用户服务",
      "groups": [
        {
          "groupName": "生产组",
          "grayGroupName": "灰度组A",
          "idc": "北京机房",
          "zone": "可用区A",
          "spec": "4核8G",
          "diskSize": 100,
          "podCount": 3
        }
      ]
    }
  ]
}
```

**Section sources**
- [BatchSelectionController.java](file://backend/src/main/java/com/example/batchselection/controller/BatchSelectionController.java#L32-L42)
- [ApplicationResponseDTO.java](file://backend/src/main/java/com/example/batchselection/dto/ApplicationResponseDTO.java#L1-L15)
- [GroupInfoDTO.java](file://backend/src/main/java/com/example/batchselection/dto/GroupInfoDTO.java#L1-L20)

## POST /api/tasks/submit

### 功能说明
批量提交任务。该接口用于向系统提交一个或多个任务，每个任务包含应用部署所需的各项参数。

### 接口详情
- **HTTP方法**: POST
- **请求路径**: `/api/tasks/submit`
- **请求头**: `Content-Type: application/json`
- **请求体**: `BatchTaskSubmitRequest`对象，包含`tasks`字段，其值为`TaskSubmitDTO`对象数组
- **成功状态码**: 200
- **失败状态码**: 400（参数错误）、500（服务器错误）

### 请求体结构
请求体为JSON对象，包含以下字段：
- `tasks`: `TaskSubmitDTO`对象数组，每个对象包含以下字段：
  - `appName`: 应用名称（必填）
  - `groupName`: 分组名称（必填）
  - `grayGroupName`: 灰度分组名称
  - `idc`: 机房（必填）
  - `zone`: 分区（必填）
  - `spec`: 参数规格（必填）
  - `diskSize`: 硬盘大小（必填，正整数）
  - `podCount`: Pod数量（必填，正整数）

### 成功响应示例
```json
{
  "code": 200,
  "message": "任务提交成功",
  "data": {
    "taskIds": [1001, 1002, 1003],
    "count": 3
  }
}
```

### 失败响应示例
```json
{
  "code": 400,
  "message": "任务列表不能为空",
  "data": null
}
```

**Section sources**
- [BatchSelectionController.java](file://backend/src/main/java/com/example/batchselection/controller/BatchSelectionController.java#L48-L61)
- [TaskSubmitDTO.java](file://backend/src/main/java/com/example/batchselection/dto/TaskSubmitDTO.java#L1-L39)
- [BatchTaskSubmitRequest.java](file://backend/src/main/java/com/example/batchselection/dto/BatchTaskSubmitRequest.java#L1-L18)
- [TaskSubmitResponse.java](file://backend/src/main/java/com/example/batchselection/dto/TaskSubmitResponse.java#L1-L19)

## 响应结构

### 统一响应格式
所有API接口均返回统一的响应结构，由`ApiResponse<T>`泛型类封装。

### 字段说明
- `code`: 响应状态码（200表示成功，400表示客户端错误，500表示服务器错误）
- `message`: 响应消息
- `data`: 响应数据，类型根据具体接口而定

### 响应类定义
```java
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse<T> {
    private Integer code;
    private String message;
    private T data;
    
    public static <T> ApiResponse<T> success(T data) {
        return new ApiResponse<>(200, "success", data);
    }
    
    public static <T> ApiResponse<T> success(String message, T data) {
        return new ApiResponse<>(200, message, data);
    }
    
    public static <T> ApiResponse<T> error(Integer code, String message) {
        return new ApiResponse<>(code, message, null);
    }
    
    public static <T> ApiResponse<T> error(String message) {
        return new ApiResponse<>(500, message, null);
    }
}
```

**Section sources**
- [ApiResponse.java](file://backend/src/main/java/com/example/batchselection/dto/ApiResponse.java#L1-L35)

## 跨域支持

### 配置说明
后端已通过`@CrossOrigin`注解启用跨域支持，允许前端应用在不同域名下访问API。

### 注解配置
```java
@CrossOrigin(origins = "*")
public class BatchSelectionController {
    // 控制器方法
}
```

### 支持特性
- 允许所有来源（`origins = "*"`）
- 自动处理预检请求（OPTIONS）
- 支持常见的HTTP方法（GET、POST等）
- 支持JSON内容类型

**Section sources**
- [BatchSelectionController.java](file://backend/src/main/java/com/example/batchselection/controller/BatchSelectionController.java#L18)

## 前端调用示例

### API客户端配置
前端使用Axios库进行HTTP请求，已配置基础URL和默认请求头。

```javascript
const apiClient = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});
```

### 获取应用数据
```javascript
export const getApplications = () => {
  return apiClient.get('/applications');
};
```

### 提交任务
```javascript
export const submitTasks = (tasks) => {
  return apiClient.post('/tasks/submit', { tasks });
};
```

### 响应拦截器
前端已配置响应拦截器，自动提取响应数据并处理错误。

```javascript
apiClient.interceptors.response.use(
  response => response.data,
  error => {
    console.error('API请求错误:', error);
    return Promise.reject(error);
  }
);
```

**Section sources**
- [index.js](file://frontend/src/api/index.js#L1-L40)