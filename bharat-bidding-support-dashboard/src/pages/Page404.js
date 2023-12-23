import React from 'react';
import { Button, Result } from 'antd';
import { useHistory } from 'react-router-dom';


const Page404 = () => {
  const history = useHistory(); // Get the history object

  return (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Button type="primary" onClick={() => history.goBack()}>Go Back</Button>}
  />
  );
};
export default Page404;