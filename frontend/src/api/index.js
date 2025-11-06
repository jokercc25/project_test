import axios from 'axios';
import { performanceMonitor, errorMonitor } from '../utils/monitor';

// 创建axios实例
const apiClient = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 请求拦截器 - 记录开始时间
apiClient.interceptors.request.use(
  config => {
    config.metadata = { startTime: Date.now() };
    return config;
  },
  error => {
    errorMonitor.logError(error, { type: 'request' });
    return Promise.reject(error);
  }
);

// 响应拦截器 - 记录性能和错误
apiClient.interceptors.response.use(
  response => {
    const endTime = Date.now();
    const startTime = response.config.metadata?.startTime || endTime;
    
    // 记录 API 请求性能
    performanceMonitor.recordApiCall(
      response.config.url,
      startTime,
      endTime,
      true
    );
    
    return response.data;
  },
  error => {
    const endTime = Date.now();
    const startTime = error.config?.metadata?.startTime || endTime;
    
    // 记录 API 请求失败
    performanceMonitor.recordApiCall(
      error.config?.url || 'unknown',
      startTime,
      endTime,
      false
    );
    
    // 记录错误信息
    errorMonitor.logError(error, {
      type: 'api',
      url: error.config?.url,
      status: error.response?.status,
      message: error.response?.data?.message
    });
    
    console.error('API请求错误:', error);
    return Promise.reject(error);
  }
);

/**
 * 查询所有应用数据
 */
export const getApplications = () => {
  return apiClient.get('/applications');
};

/**
 * 批量提交任务
 * @param {Array} tasks - 任务列表
 */
export const submitTasks = (tasks) => {
  return apiClient.post('/tasks/submit', { tasks });
};

/**
 * 查询所有任务
 */
export const getTasks = () => {
  return apiClient.get('/tasks');
};

/**
 * 清空所有任务
 */
export const clearTasks = () => {
  return apiClient.delete('/tasks');
};

export default {
  getApplications,
  submitTasks,
  getTasks,
  clearTasks
};
