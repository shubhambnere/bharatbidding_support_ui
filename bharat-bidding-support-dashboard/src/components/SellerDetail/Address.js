import React, { useState, useEffect, } from 'react';

import { Form, Input, Button, Select, Card, Col, Row, message, Typography, } from 'antd';
// import { useSnackbar } from 'notistack';
// import axios from 'axios';
import * as Yup from 'yup';
import 'antd/dist/antd.css';
import { LoadingOutlined, PlusOutlined,  } from '@ant-design/icons';
// import Grid from 'antd/lib/card/Grid';

const { Option } = Select;


const Address = () => {
    const [form] = Form.useForm();
    //   const { enqueueSnackbar } = useSnackbar();
    const [sellerData, setSellerData] = useState(null);
    const [loading, setLoading] = useState(false);
  


    const states = [
        'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
        'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
        'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
        'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
        'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
        // Union territories
        'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli',
        'Daman and Diu', 'Delhi', 'Lakshadweep', 'Puducherry'
    ];


    // Other state variables...

    // Your schema remains the same
    const UpdateUserSchema = Yup.object().shape({
        first_name: Yup.string().required('First Name is required'),
        last_name: Yup.string().required('Last Name is required'),
        // ... add other validations as needed
    });

    useEffect(() => {
        // Fetch seller details and product data here
        // ...

        // Set seller data to form fields
        if (sellerData) {
            form.setFieldsValue({
                first_name: sellerData.first_name || '',
                last_name: sellerData.last_name || '',
                // Set other form fields similarly
            });
        }
    }, [sellerData, form]);

    const handleFormSubmit = async () => {
        try {
            const values = await form.validateFields();
            console.log('Form values:', values); // Add this line
            // Handle form submission, e.g., make an API call with values
            // ...

            //   enqueueSnackbar('Form submitted successfully!', { variant: 'success' });
        } catch (error) {
            //   enqueueSnackbar('Error submitting form!', { variant: 'error' });
        }
    };





    return (
        <Form form={form} layout="vertical" onFinish={handleFormSubmit} initialValues={{}}>
            <Row gutter={16}  justify="space-evenly" >


                <Col xs={24} sm={24} md={24} lg={23} xl={23}>
                    <Card style={{ padding: 10, marginRight: -10, marginLeft: -10, marginBottom: 0 }}>
                    <Row gutter={[16, 16]}>
                    <Col xs={{ span: 24, offset: 0 }} lg={{ span: 12, offset: 0 }} >
                        <Form.Item name="place" label="Place">
                            <Input placeholder="Enter place" />
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24, offset: 0 }} lg={{ span: 12, offset: 0 }} >
                        <Form.Item name="locality" label="Locality">
                            <Input placeholder="Enter locality" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row Row gutter={[16, 16]}>
                    <Col xs={{ span: 24, offset: 0 }} lg={{ span: 12, offset: 0 }} >
                        <Form.Item name="city" label="City">
                            <Input placeholder="Enter city" />
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24, offset: 0 }} lg={{ span: 12, offset: 0 }} >
                        <Form.Item name="landmark" label="Landmark">
                            <Input placeholder="Enter Landmark" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row Row gutter={[16, 16]}>
                    <Col xs={{ span: 24, offset: 0 }} lg={{ span: 12, offset: 0 }} >
                        <Form.Item name="state" label="State">
                            <Select
                                showSearch
                                placeholder="Select state"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {states.map(state => <Option key={state}>{state}</Option>)}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24, offset: 0 }} lg={{ span: 12, offset: 0 }} >
                        <Form.Item name="pin_code" label="Pincode">
                            <Input type="number" placeholder="Enter pincode" maxLength={6} />
                        </Form.Item>
                    </Col>
                </Row>


                        {/* Buttons */}
                        <Form.Item style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button type="primary" htmlType="submit">
                                Save Changes
                            </Button>
                        </Form.Item>
                    </Card>
                </Col>
            </Row>
        </Form>
    );



 
};

export default Address;
