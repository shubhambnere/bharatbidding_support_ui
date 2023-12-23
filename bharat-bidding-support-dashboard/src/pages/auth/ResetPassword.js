import React from "react";
import { Layout,  Card, Form, Input, Button, Row, Col } from "antd";

const { Content } = Layout;

const ResetPassword = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
    // Logic to handle resetting the password
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Content>
      <Row justify="center" align='stretch' style={{ minHeight: "20vh" }}>
        <Col xs={24} sm={20} md={16} lg={12} xl={12}>
          <Card title="Set New Password" >
            <Form
              name="resetPassword"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                name="Old Password"
                rules={[
                  { required: true, message: "Please input your password!" },
                  { min: 6, message: "Password must be at least 6 characters" },
                ]}
              >
                <Input.Password placeholder="Old Password" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                  { min: 6, message: "Password must be at least 6 characters" },
                ]}
              >
                <Input.Password placeholder="New Password" />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                dependencies={["password"]}
                rules={[
                  { required: true, message: "Please confirm your password!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("The two passwords do not match!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Confirm Password" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Reset Password
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </Content>
  );
};

export default ResetPassword;
