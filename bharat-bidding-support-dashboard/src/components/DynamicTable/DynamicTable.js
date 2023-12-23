import React, { useState } from 'react';
// eslint-disable-next-line 
import { Card, Col, Row, Table, Modal, Button, Form, Input, Select } from 'antd';
import { Icon } from '@iconify/react';
import trashFill from '@iconify/icons-iconamoon/trash-fill';
import editIcon from '@iconify/icons-uil/edit';

// const { Option } = Select;

const DynamicTable = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  // eslint-disable-next-line 
  const [image, setImage] = useState(null);

  const showModal = () => {
    form.resetFields();
    setModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      console.log('Received values:', values);
      setModalVisible(false);
    });
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleDelete = (record) => {
    Modal.confirm({
      title: 'Confirm Deletion',
      content: 'Are you sure you want to delete this record?',
      onOk() {
        // Delete logic here
        console.log('Record deleted:', record);
      },
    });
  };

  const handleImageChange = (e) => {
    // Handle image change when uploading
    const file = e.target.files[0];
    setImage(file);
  };

  const uploadButton = (
    <div>
      <input type="file" onChange={handleImageChange} />
    </div>
  );

  const columns = [

    {
      title: 'Image',
      key: 'image',
      width: 20,
      fixed: 'left',
      render: (_, record) => (
        <div>
          {record.imageUrl ? (
            <img src={record.imageUrl} alt="avatar" style={{ width: '35px', height: '35px', borderRadius: '50%' }} />
          ) : (
            <img src="https://artscimedia.case.edu/wp-content/uploads/sites/79/2016/12/14205134/no-user-image.gif" alt="default avatar" style={{ width: '35px', height: '35px', borderRadius: '50%' }} />
          )}
        </div>
      ),
    },
    {
      title: 'Full Name',
      width: 30,
      dataIndex: 'name',
      key: 'name',
      // fixed: 'left',
     
    },
    {
      title: 'Age',
      width: 20,
      dataIndex: 'age',
      key: 'age',
      // fixed: 'left',
      
    },
    {
      title: 'Column 1',
      dataIndex: 'address',
      key: '1',
      width: 50,
    },
    {
      title: 'Column 2',
      dataIndex: 'address',
      key: '2',
      width: 50,
    },
    {
      title: 'Column 3',
      dataIndex: 'address',
      key: '3',
      width: 50,
    },
    {
      title: 'Column 4',
      dataIndex: 'address',
      key: '4',
      width: 50,
    },
    {
      title: 'Column 5',
      dataIndex: 'address',
      key: '5',
      width: 50,
    },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 31,
      
      render: (_, record) => (
        <span style={{ display: 'flex', justifyContent: 'space-between',}}>
          <Button
            onClick={showModal}
            size='small'  shape="circle"
           
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: 'auto', // Set initial width
              maxWidth: '50%', // Limit the width on smaller screens
              padding: '8px', // Adjust padding as needed
            }}
          >
            <Icon icon={editIcon} width={16} height={16} />
          </Button>
          
          <Button
            onClick={() => handleDelete(record)}
            size='small'  shape="circle"
            danger
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: 'auto', // Set initial width
              maxWidth: '50%', // Limit the width on smaller screens
              padding: ' 8px', // Adjust padding as needed
            }}
          >
            <Icon icon={trashFill} width={16} height={16} />
          </Button>
        </span>
      ),
    },
  ];

  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      name: `Edward ${i}`,
      age: 32,
      address: `London Park no. ${i}`,
    });
  }
  

  return (
    <div className="tabled">
      <Row gutter={[24, 0]} >
        <Col span={24}>
          <Card bordered={false} className="criclebox tablespace mb-2" title="Dynamic Table Component">
            <div className="table-responsive ">
              <div style={{ display: 'flex', justifyContent: 'end', alignContent: 'end', margin: 8 }}>
                <Button onClick={showModal}>Add Record</Button>
              </div >
              <Table
                columns={columns}
                dataSource={data}
                scroll={{
                  x: 1500,
                  y: 400,

                  
                }}
                pagination={{
                  pageSizeOptions: ['10', '20', '30'],
                  showSizeChanger: true,
                  showTotal: (total) => `Total ${total} items`,
                  
                }}
                

              />

              <Modal
                title="Edit Record"
                visible={modalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <Form form={form} layout="vertical">
                  <Form.Item name="name" label="Full Name" rules={[{ required: true, message: 'Please enter full name' }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item name="age" label="Age" rules={[{ required: true, message: 'Please enter age' }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item name="address" label="Address">
                    <Input />
                  </Form.Item>
                  {/* Add image upload field */}
                  <Form.Item name="image" label="Image">
                    {uploadButton}
                  </Form.Item>
                </Form>
              </Modal>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DynamicTable;