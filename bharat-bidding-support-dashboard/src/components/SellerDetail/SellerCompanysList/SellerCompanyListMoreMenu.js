import React, { useState } from 'react';


import { Link as  useHistory } from 'react-router-dom';
import { Button, Modal, Form,  } from 'antd';
import { Icon } from '@iconify/react';
import trashFill from '@iconify/icons-iconamoon/trash-fill';
import editIcon from '@iconify/icons-uil/edit';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const SellerCompanyListMoreMenu = ({ record, handleDelete }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const history = useHistory();

  const showModal = () => {
    form.resetFields();
    setModalVisible(true);
  };

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setImage(file);
  //   } else {
  //     console.log('No file selected');
  //   }
  // };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (values.name && values.age) {
          console.log('Received values:', values);
          setModalVisible(false);
        } else {
          console.log('Please enter all required fields');
        }
      })
      .catch((errorInfo) => {
        console.log('Validation Failed:', errorInfo);
      });
  };

  const handleCancel = () => {
    setModalVisible(false);
  };


  const handleDeleteAction = () => {
    Modal.confirm({
      title: 'Confirm Deletion',
      content: 'Are you sure you want to delete this record?',
      onOk() {
        // Handle deletion action
        handleDelete(record);
      },
    });
  };

  const handleEditClick = () => {
    const url = `/Buyer-profile`;
    // const url = `/${kebabCase ('Buyer-ABC')}/?id=${'12345ismyid'}`;
    history.push(url);
  };
  return (
    <>
     {/* <Link  to={`/Buyer-profile/${kebabCase ('Buyer-ABC')}/?id=${'12345ismyid'}`}>    */}
  <Button
  // component={RouterLink}  to={`/${kebabCase ('Buyer-ABC')}/?id=${'12345ismyid'}`}
    size="small"
    // onClick={handleEditClick}
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: 'auto',
      maxWidth: '50%',
     
      padding: '0 8px',
      // Add additional styles here if needed
      
    }}
  >
    {/* <Link   to={`/Buyer-profile`}> */}
    <Link   to={`/Buyer-profile/?id=${'12345ismyid'}`}>
    <Icon icon={editIcon} width={18} height={18} style={{display:'flex', justifySelf:'center',  }}  />
    </Link>
  </Button>
{/* </Link> */}
     {/* <Link to={`/edit/${record.id}`}>
  <Button
    size="small"
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: 'auto',
      maxWidth: '50%',
      padding: '0 8px',
      // Add additional styles here if needed
    }}
  >
    <Icon icon={editIcon} width={18} height={18} />
  </Button>
</Link> */}
      <Button
        onClick={handleDeleteAction}
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
      {/* Rest of your modal code... */}
    </>
  );
};

export default SellerCompanyListMoreMenu;
