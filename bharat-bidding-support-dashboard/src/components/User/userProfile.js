import React, { useState, useEffect, } from 'react';

import { Form, Input, Button, Select, Upload, DatePicker, Switch, Card, Col, Row, message, } from 'antd';
// import { useSnackbar } from 'notistack';
// import axios from 'axios';
import * as Yup from 'yup';
import 'antd/dist/antd.css';
import { LoadingOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
// import Grid from 'antd/lib/card/Grid';

const { Option } = Select;
const { TextArea } = Input

const UserProfile = () => {
    const [form] = Form.useForm();
    //   const { enqueueSnackbar } = useSnackbar();
    const [sellerData, setSellerData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const [imageUrl2, setImageUrl2] = useState();




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

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };
    const normFile2 = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList2;
    };


    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (imageUrl) => {
                setLoading(false);
                setImageUrl(imageUrl);
            });
        }
    };
    const handleChange2 = (info) => {
        if (info.file.status === 'uploading2') {
            setLoading2(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (imageUrl2) => {
                setLoading2(false);
                setImageUrl2(imageUrl2);
            });
        }
    };

    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };
    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };
    const beforeUpload2 = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    const uploadButton2 = (
        <div>
            {loading2 ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );


    return (
        <Form
                form={form}
                layout="vertical"
                onFinish={handleFormSubmit}
                initialValues={{
                    // Set initial form values here if needed
                }}
            >
                <Row gutter={16} justify="space-evenly" >
                <Col xs={24} sm={24} md={24} lg={22} xl={22}>
                <Card bordered={false} style={{ padding: 10, marginRight: -10, marginLeft: -10, marginBottom: 0 }} >
                {/* Your form fields */}
                <Row gutter={[16, 16]}>
                    <Col xs={{ span: 9, offset: 2 }} lg={{ span: 12, offset: 0 }} >
                        <Form.Item name="profile_photo" label='Profile Photo' valuePropName="fileList" getValueFromEvent={normFile}>
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                beforeUpload={beforeUpload}
                                onChange={handleChange}

                            >
                                {imageUrl ? (
                                    <img src={imageUrl} alt="avatar" style={{ overflow: 'auto', maxHeight: '100%' }} />
                                ) : (
                                    uploadButton
                                )}
                            </Upload>

                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 9, offset: 2 }} lg={{ span: 12, offset: 0 }} >
                        <Form.Item name="cover_photo" label="Cover Photo" valuePropName="fileList2" getValueFromEvent={normFile2}>
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                beforeUpload={beforeUpload2}
                                onChange={handleChange2}

                            >
                                {imageUrl2 ? (
                                    <img src={imageUrl2} alt="avatar" style={{ overflow: 'auto', maxHeight: '100%' }} />
                                ) : (
                                    uploadButton2
                                )}
                            </Upload>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={{ span: 24, offset: 0 }} lg={{ span: 12, offset: 0 }} >
                        <Form.Item name="first_name" label="First Name" rules={[{ required: true, message: 'First Name is required' }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24, offset: 0 }} lg={{ span: 12, offset: 0 }} >
                        <Form.Item name="last_name" label="Last Name" rules={[{ required: true, message: 'Last Name is required' }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>




                {/* New: Company Details */}
                <Row gutter={[16, 16]}>
                    <Col xs={{ span: 24, offset: 0 }} lg={{ span: 12, offset: 0 }} >
                        <Form.Item name="company_name" label="Company Name" rules={[{ required: true, message: 'Company Name is required' }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24, offset: 0 }} lg={{ span: 12, offset: 0 }} >
                        <Form.Item name="company_type" label="Company Type" rules={[{ required: true, message: 'Company Type is required' }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={[16, 16]}>
                    <Col xs={{ span: 24, offset: 0 }} lg={{ span: 12, offset: 0 }} >
                        <Form.Item name="products_deal_in" label="Products Deal In">
                            <Select mode="multiple" placeholder="Select products...">
                                {/* Map and render options */}
                                <Option value={'ss'}>{'productName'}</Option>
                                <Option value={'ss1'}>{'productName1'}</Option>
                                <Option value={'ss2'}>{'productNam3e'}</Option>
                                <Option value={'ss4'}>{'productName4'}</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24, offset: 0 }} lg={{ span: 12, offset: 0 }} >
                        <Form.Item name="total_directors" label="Total Directors">
                            <Input type="number"   min={1}/>
                        </Form.Item>
                    </Col>
                </Row>
                

                {/* Example: Select for Products */}
                <Form.Item name="company_description" label="Company Description">
                    <TextArea rows={4} />
                </Form.Item>




                {/* Example: DatePicker */}
                <Row gutter={[16, 16]}>
                    <Col xs={{ span: 24, offset: 0 }} lg={{ span: 12, offset: 0 }} >
                        <Form.Item name="dob" label="Date of Birth">
                            <DatePicker style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>

                    <Col xs={{ span: 24, offset: 0 }} lg={{ span: 12, offset: 0 }} >
                        <Form.Item name="Joining Date" label="Joining Date">
                            <DatePicker style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={[16, 16]}>
                    <Col xs={{ span: 24, offset: 0 }} lg={{ span: 12, offset: 0 }} >
                        <Form.Item name="pan_card" label='Upload Pan card' valuePropName="PanCard" >
                            <Upload
                                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                listType="picture"
                                maxCount={1}
                            >
                                <Button icon={<UploadOutlined />}>Upload Pan Card</Button>
                            </Upload>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24, offset: 0 }} lg={{ span: 12, offset: 0 }} >
                        <Form.Item name="aadhar_card" label='Upload Aadhaar ' valuePropName="aadhaar" >
                            <Upload
                                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                listType="picture"
                                maxCount={1}
                            >
                                <Button icon={<UploadOutlined />}>Upload Aadhaar</Button>
                            </Upload>
                        </Form.Item>
                    </Col>
                </Row>

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

                {/* Example: Switch for Is Verified */}
                <Form.Item name="is_verified" label="Is Verified" valuePropName="checked">
                    <Switch />
                </Form.Item>

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

export default UserProfile;
