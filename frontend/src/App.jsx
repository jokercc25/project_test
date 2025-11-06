import React from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import BatchSelectionPage from './components/BatchSelectionPage';

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <BatchSelectionPage />
    </ConfigProvider>
  );
}

export default App;
