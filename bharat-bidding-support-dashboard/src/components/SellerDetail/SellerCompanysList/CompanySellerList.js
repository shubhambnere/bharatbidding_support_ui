import React, { useState, useEffect, } from 'react';
import { AudioOutlined } from '@ant-design/icons';
import { Form, Input, Button,Modal, Card, Col, Row, Table, } from 'antd';
// import { useSnackbar } from 'notistack';
// import axios from 'axios';
// import * as Yup from 'yup';
import 'antd/dist/antd.css';

import SellerCompanyListMoreMenu from './SellerCompanyListMoreMenu';
// import Grid from 'antd/lib/card/Grid';



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


const CompanySellerList = () => {

    //   const { enqueueSnackbar } = useSnackbar();
    // const [SellerData, setSellerData] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [form] = Form.useForm();
    // eslint-disable-next-line 




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
            width: 150,
            render: (_, record) => (
                <span style={{ display: 'flex', justifyContent: 'space-between' }}>

                    <SellerCompanyListMoreMenu
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

        <Row gutter={16} justify="space-evenly"   >


            <Col xs={24} sm={24} md={24} lg={23} xl={23}  >
            {/* <Col span={24}> */}
                    <Card bordered={false} className="criclebox tablespace mb-10 mt-25"  >
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
                           
                        </div>
                    </Card>
                {/* </Col> */}
            </Col>
        </Row>

    );




};

export default CompanySellerList;
