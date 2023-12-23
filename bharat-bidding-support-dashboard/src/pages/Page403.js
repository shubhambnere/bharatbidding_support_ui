import React from 'react';
import { Button, Result } from 'antd';
import { useHistory } from 'react-router-dom'; // Import useHistory

const Page403 = () => {
  const history = useHistory(); // Get the history object

  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={<Button type="primary" onClick={() => history.goBack()}>Go Back</Button>} // Add an onClick handler to the button
    />
  );
};

export default Page403;