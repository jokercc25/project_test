import React, { useEffect } from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import BatchSelectionPage from './components/BatchSelectionPage';
import { errorMonitor, performanceMonitor, behaviorMonitor } from './utils/monitor';

function App() {
  useEffect(() => {
    // 初始化错误监控
    errorMonitor.init();
    
    // 记录页面加载性能
    window.addEventListener('load', () => {
      setTimeout(() => {
        performanceMonitor.recordPageLoad();
      }, 0);
    });
    
    // 记录页面访问
    behaviorMonitor.recordPageView('BatchSelectionPage');
    
    console.log('🔍 监控系统已启动');
  }, []);

  return (
    <ConfigProvider locale={zhCN}>
      <BatchSelectionPage />
    </ConfigProvider>
  );
}

export default App;
