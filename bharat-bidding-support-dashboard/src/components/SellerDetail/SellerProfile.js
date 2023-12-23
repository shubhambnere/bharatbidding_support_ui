import { Fragment, useState } from 'react';
import {  Tabs, Row, Col } from 'antd';
import { UserOutlined,  } from '@ant-design/icons';
import { Icon } from '@iconify/react';
import SellerDetail from './SellerDetail';
import SellerCompanyDetail from './SellerCompany/SellerDetail';
import CompanySellerList from './SellerCompanysList/CompanySellerList';


// Your components


const { TabPane } = Tabs;

export default function SellerProfile() {
  const [currentTab, setCurrentTab] = useState('sellerDetail');

  const ACCOUNT_TABS = [

    { value: 'sellerDetail', icon: <UserOutlined />, text: 'Seller Detail', component: <SellerDetail /> },
    {
      value: 'sellerCompany',
      icon: <Icon icon="mingcute:building-1-line" style={{ marginBottom: 0, verticalAlign: 'middle', fontSize:'20px' }} />,
      text: 'Company',
      component: <SellerCompanyDetail />,
    },
    { value: 'listedCompany', icon: <Icon icon="fluent-mdl2:company-directory" style={{ marginBottom: 3,marginRight:8, verticalAlign: 'middle', fontSize:'16px' }} />, text: 'Listed Company', component: <CompanySellerList /> },
    // { value: 'SellerOrders', icon: <ShipOutlined />, component: <SellerOrderListing /> },
  ];

  return (
    <Fragment>
         <Row gutter={16} justify="space-evenly" >
                <Col xs={24} sm={24} md={24} lg={22} xl={22}>
    <Tabs value={currentTab} onChange={(value) => setCurrentTab(value)}>
      {ACCOUNT_TABS.map((tab) => (
        <TabPane tab={<span>{tab.icon} {tab.text}</span>} key={tab.value} />
      ))}
    </Tabs>
    </Col>
    </Row>
    {ACCOUNT_TABS.map((tab) => {
      const isMatched = tab.value === currentTab;
      return isMatched && <div key={tab.value}>{tab.component}</div>;
    })}
   
  </Fragment>
  );
}
