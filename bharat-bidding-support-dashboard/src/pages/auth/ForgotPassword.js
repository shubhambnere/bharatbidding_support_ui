import React from "react";
import { Layout, Button, Typography, Card, Form, Input } from "antd";
import BasicHeader from "../../components/layout/Header/BasicHeader";
import BasicFooter from "../../components/layout/Footer/BasicFooter";


const { Title } = Typography;
const { Content } = Layout;

const ForgotPassword = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
    // Logic to handle the submission of the email for password reset
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Layout className="layout-default ant-layout layout-sign-up">
        <BasicHeader />
        <Content className="p-0">
          <div className="sign-up-header">
            <div className="content">
              <Title>Forgot Password</Title>
              <p className="text-lg">
                Enter your email address to reset your password.
              </p>
            </div>
          </div>

          <Card
            className="card-signup header-solid h-full ant-card pt-0"
            title={<h5>Reset Password</h5>}
            bordered="false"
          >
            <Form
              name="forgotPassword"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              className="row-col"
            >
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                  { type: "email", message: "Please enter a valid email!" },
                ]}
              >
                <Input placeholder="Enter your email" />
              </Form.Item>

              <Form.Item>
                <Button
                  style={{ width: "100%" }}
                  type="primary"
                  htmlType="submit"
                >
                  Reset Password
                </Button>
              </Form.Item>
            </Form>
           
          </Card>
        </Content>

        <BasicFooter />
      </Layout>
    </>
  );
};

export default ForgotPassword;
