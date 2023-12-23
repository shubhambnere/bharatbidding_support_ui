import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const CustomLoader = ({ size = 'large', color = '#1890ff', tip = 'Loading...' }) => {
  const antIcon = <LoadingOutlined style={{ fontSize: size, color }} spin />;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Spin indicator={antIcon} tip={tip} />
    </div>
  );
};

export default CustomLoader;
