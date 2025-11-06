import axios from 'axios';

// 创建axios实例
const apiClient = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 响应拦截器
apiClient.interceptors.response.use(
  response => response.data,
  error => {
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

export default {
  getApplications,
  submitTasks
};
