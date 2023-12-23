import React from 'react';
import { Card, Col, Row, Form, Input, Button, Select, DatePicker, InputNumber, Switch, TreeSelect, Cascader, Typography } from 'antd';
import QRCode from 'qrcode.react'; // Import QRCode library

const DemoForm = () => {
  const [form] = Form.useForm(); // Using Form hook

  const onFinish = (values) => {
    console.log('Form values:', values);
  };

  return (
    <div style={{ padding: '10px' }}>
      {/* Row containing two QR Code cards */}
      <Row gutter={16} justify="center" style={{ marginBottom: '10px' }}>
        <Col span={12}>
          <Card title="QR Code 1" justify="center" >
            
            {/* Generate QR Code with specific data */}
            <QRCode value="QR Code 1 Data 1234567890poiuytrewqasdfghjkl,mnbvcxzasdfh ghjkoiuytrebjuhtgds cvfvdnssssssssssssssss" />
            <Typography>Menu Creddos</Typography>
          </Card>
        </Col>
        <Col span={12} justify="center" >
          <Card title="QR Code 2">
            {/* Generate QR Code with different data */}
            <QRCode value="QR Code 2 Data" />
              <Typography>Menu Creddos</Typography>
          </Card>
        </Col>
      </Row>

      {/* Form */}
      <Card title="Demo Form">
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        style={{  justifyContent:'flex-start', }}
        layout="horizontal"
        onFinish={onFinish} // Handle form submission
      >
        {/* Form fields */}
        <Form.Item label="Input" name="input">
          <Input />
        </Form.Item>
        <Form.Item label="Select" name="select">
          <Select>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="TreeSelect" name="treeSelect">
          <TreeSelect
            treeData={[
              {
                title: 'Light',
                value: 'light',
                children: [
                  {
                    title: 'Bamboo',
                    value: 'bamboo',
                  },
                ],
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="Cascader" name="cascader">
          <Cascader
            options={[
              {
                value: 'zhejiang',
                label: 'Zhejiang',
                children: [
                  {
                    value: 'hangzhou',
                    label: 'Hangzhou',
                  },
                ],
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="DatePicker" name="datePicker">
          <DatePicker />
        </Form.Item>
        <Form.Item label="InputNumber" name="inputNumber">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Switch" valuePropName="checked" name="switch">
          <Switch />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 14, offset: 4 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      </Card>
    </div>
  );
};

export default DemoForm;
