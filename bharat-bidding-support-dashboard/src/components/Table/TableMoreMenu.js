import React, { useState } from 'react';
import { Button, Modal, Form, Input } from 'antd';
import { Icon } from '@iconify/react';
import trashFill from '@iconify/icons-iconamoon/trash-fill';
import editIcon from '@iconify/icons-uil/edit';

const TableMoreMenu = ({ record, handleDelete }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [image, setImage] = useState(null); // State for handling image

  const showModal = () => {
    form.resetFields();
    setModalVisible(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // Check if a file is selected
    if (file) {
      setImage(file);
    } else {
      // Handle when no file is selected
      // For example, you might want to set a default value or display an error message
      console.log('No file selected');
      // Set a default image or display an error message
      // setImage(defaultImage);
    }
  };
  

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        // Check if values are present before proceeding
        if (values.name && values.age) {
          console.log('Received values:', values);
          setModalVisible(false);
        } else {
          // Handle case when fields are empty
          console.log('Please enter all required fields');
          // You might want to display an error message here
        }
      })
      .catch((errorInfo) => {
        console.log('Validation Failed:', errorInfo);
        // Handle validation failure, if required
      });
  };
  

  const handleCancel = () => {
    setModalVisible(false);
  };

  const uploadButton = (
    <div>
      <input type="file" onChange={handleImageChange} />
    </div>
  );

    return (
        <>
            <Button
                onClick={showModal}
                size="small"
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 'auto',
                    maxWidth: '50%',
                    padding: '0 8px',
                }}
            >
                <Icon icon={editIcon} width={18} height={18} />
            </Button>
            <Button
                onClick={() => handleDelete(record)}
                shape="circle"
                danger
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 'auto',
                    maxWidth: '50%',
                    padding: '0 8px',
                }}
            >
                <Icon icon={trashFill} width={18} height={18} />
            </Button>
            <Modal
                title="Edit new Record"
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
        </>
    );
};

export default TableMoreMenu;
