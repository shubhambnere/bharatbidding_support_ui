import React, { useState } from 'react';
import { AudioOutlined } from '@ant-design/icons';

// eslint-disable-next-line 
import { Card, Col, Row, Table, Modal, Button, Form, Input, Select, Space } from 'antd';
import SellerMoreMenu from './SellerMoreMenu';



const { Search } = Input;
const onSearch = (value, _e, info) => console.log(info?.source, value);
const suffix = (
    <AudioOutlined
        style={{
            fontSize: 16,
            color: '#1677ff',
        }}
    />
);

const SellerListingTable = () => {
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

    const handleEdit = () => {
        // Logic for editing the record
        showModal(); // Show the edit modal
    };


    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            width: 150,
        },
        {
            title: 'Age',
            dataIndex: 'age',
            width: 150,
        },
        {
            title: 'Address',
            dataIndex: 'address',
        },
        {
            title: 'Action',
            dataIndex: 'operation',
            // fixed: 'right',
            width: 130,
            render: (_, record) => (
                <span style={{ display: 'flex', justifyContent: 'space-around' }}>

                    <SellerMoreMenu
                        record={record}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                    />
                </span>
            ),
        },
    ];
    const data = [];
    for (let i = 0; i < 100; i++) {
        data.push({
            key: i,
            name: `Edward King ${i}`,
            age: 32,
            address: `London, Park Lane no. ${i}`,
        });
    }


    return (
        <div className="tabled">
            <Row gutter={[24, 0]} >
                <Col span={24}>
                    <Card bordered={false} className="criclebox tablespace mb-10"  >
                        <div className="table-responsive ">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignContent: 'end', margin: 8 }}>

                                <Search placeholder="input search text" onSearch={onSearch} style={{
                                    width: 220,
                                }} enterButton />


                                <Button size='small' onClick={showModal}>Add Record</Button>
                            </div >
                            <Table
                                columns={columns}
                                dataSource={data}
                                pagination={{
                                    pageSize: 50,
                                }}
                                scroll={{
                                    x: 900,
                                    y: 400,

                                }}
                            />
                            <Modal
                                title="Add Record"
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
export default SellerListingTable;