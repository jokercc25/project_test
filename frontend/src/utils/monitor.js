/**
 * 前端监控工具
 */

// 性能监控
export const performanceMonitor = {
  // 记录页面加载性能
  recordPageLoad: () => {
    if (window.performance && window.performance.timing) {
      const timing = window.performance.timing;
      const metrics = {
        // DNS 查询时间
        dns: timing.domainLookupEnd - timing.domainLookupStart,
        // TCP 连接时间
        tcp: timing.connectEnd - timing.connectStart,
        // 请求响应时间
        request: timing.responseEnd - timing.requestStart,
        // DOM 解析时间
        domParse: timing.domComplete - timing.domInteractive,
        // 页面完全加载时间
        loadComplete: timing.loadEventEnd - timing.navigationStart,
      };
      
      console.log('📊 页面性能指标:', metrics);
      return metrics;
    }
  },

  // 记录 API 请求性能
  recordApiCall: (url, startTime, endTime, success) => {
    const duration = endTime - startTime;
    const log = {
      url,
      duration: `${duration}ms`,
      success,
      timestamp: new Date().toISOString(),
    };
    
    console.log(`${success ? '✅' : '❌'} API请求:`, log);
    
    // 可以在这里发送到监控服务器
    // sendToMonitorServer(log);
    
    return log;
  },
};

// 错误监控
export const errorMonitor = {
  // 全局错误处理
  init: () => {
    // 捕获 JS 运行时错误
    window.addEventListener('error', (event) => {
      const errorInfo = {
        type: 'JavaScript Error',
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack,
        timestamp: new Date().toISOString(),
      };
      
      console.error('🚨 JavaScript错误:', errorInfo);
      
      // 发送到监控服务器
      // sendErrorToServer(errorInfo);
    });

    // 捕获未处理的 Promise 错误
    window.addEventListener('unhandledrejection', (event) => {
      const errorInfo = {
        type: 'Promise Rejection',
        message: event.reason,
        timestamp: new Date().toISOString(),
      };
      
      console.error('🚨 Promise错误:', errorInfo);
      
      // 发送到监控服务器
      // sendErrorToServer(errorInfo);
    });

    // 捕获资源加载错误
    window.addEventListener('error', (event) => {
      if (event.target !== window) {
        const errorInfo = {
          type: 'Resource Load Error',
          tagName: event.target.tagName,
          src: event.target.src || event.target.href,
          timestamp: new Date().toISOString(),
        };
        
        console.error('🚨 资源加载错误:', errorInfo);
        
        // 发送到监控服务器
        // sendErrorToServer(errorInfo);
      }
    }, true);
  },

  // 手动记录错误
  logError: (error, context = {}) => {
    const errorInfo = {
      type: 'Manual Error',
      message: error.message,
      stack: error.stack,
      context,
      timestamp: new Date().toISOString(),
    };
    
    console.error('🚨 手动记录错误:', errorInfo);
    
    // 发送到监控服务器
    // sendErrorToServer(errorInfo);
  },
};

// 用户行为监控
export const behaviorMonitor = {
  // 记录用户点击
  recordClick: (elementInfo) => {
    const log = {
      type: 'click',
      element: elementInfo,
      timestamp: new Date().toISOString(),
    };
    
    console.log('👆 用户点击:', log);
    
    // 发送到监控服务器
    // sendToMonitorServer(log);
  },

  // 记录页面访问
  recordPageView: (pageName) => {
    const log = {
      type: 'pageview',
      page: pageName,
      timestamp: new Date().toISOString(),
    };
    
    console.log('👁️ 页面访问:', log);
    
    // 发送到监控服务器
    // sendToMonitorServer(log);
  },
};

// 统计信息
export const analytics = {
  // 获取当前监控统计
  getStats: () => {
    const stats = {
      performance: performanceMonitor.recordPageLoad(),
      timestamp: new Date().toISOString(),
    };
    
    return stats;
  },
};

export default {
  performanceMonitor,
  errorMonitor,
  behaviorMonitor,
  analytics,
};
