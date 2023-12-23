

import React, { useState } from "react";
import { GoogleLogin } from 'react-google-login';

import {
  Layout,
  Button,
  Typography,
  Card,
  Form,
  Input,
  Checkbox,
  Select,
  Tabs,
  message,
} from "antd";

// import logo1 from "../assets/images/logos-facebook.svg";
// import logo2 from "../assets/images/logo-apple.svg";
// import logo3 from "../assets/images/Google__G__Logo.svg.png";

import { Link } from "react-router-dom";

import BasicFooter from "../components/layout/Footer/BasicFooter";
import BasicHeader from "../components/layout/Header/BasicHeader";

const { Title } = Typography;
const { Content } = Layout;


const SignUp = () => {
  const { Option } = Select;
  const [registerMethod, setRegisterMethod] = useState("email");
  const [otpRequested, setOtpRequested] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  // Google registration success handler
  const responseGoogle = (response) => {
    // Handle successful Google registration
    console.log('Google Registration Success:', response);
    // Perform actions with the Google response if needed
  };

  // Google registration failure handler
  const responseGoogleFailure = (response) => {
    // Handle failed Google registration
    console.log('Google Registration Failed:', response);
    // Show error message or handle failure case
  };



  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onMobileOTPSubmit = (values) => {
    console.log("Mobile/OTP Form Values:", values);
  };

  const regenerateOTP = () => {
    // Regenerate OTP logic here (similar to handleGenerateOTP)
    handleGenerateOTP();
  };

  const handleGenerateOTP = () => {
    // Generate OTP logic here
    const newOtp = Math.floor(1000 + Math.random() * 9000); // Example OTP generation
    setOtpValue(newOtp.toString());
    setOtpRequested(true);
  };



  const handleOTPSubmit = (values) => {
    if (values.otp === otpValue) {
      onMobileOTPSubmit({ mobile: mobileNumber, otp: values.otp });
    } else {
      message.error("Invalid OTP. Please try again.");
    }
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="91">+91</Option>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );
  return (
    <>
      <Layout className="layout-default ant-layout layout-sign-up">

        <BasicHeader />
        <Content className="p-0">
          <div className="sign-up-header">
            <div className="content">
              <Title>Sign Up</Title>
              <p className="text-lg">
                Use these awesome forms to login or create new account in your
                project for free.
              </p>
            </div>
          </div>

          <Card
            className="card-signup header-solid h-full ant-card pt-0"
            title={<h5>Register With</h5>}
            bordered="false"
          >
            <div className="sign-up-gateways">
              {/* <Button type="false">
                <img src={logo1} alt="logo 1" />
              </Button>
              <Button type="false">
                <img src={logo2} alt="logo 2" />
              </Button> */}
              {/* <Button type="false">
                <img src={logo3} alt="logo 3" />
              </Button> */}
              {/* <Button type="false"> */}
              <GoogleLogin
                clientId="YOUR_CLIENT_ID_FROM_GOOGLE_DEVELOPER_CONSOLE"
                buttonText="Login with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogleFailure}
                cookiePolicy={'single_host_origin'}
              />
              {/* </Button> */}
            </div>
            <p className="text-center my-25 font-semibold text-muted">Or</p>
            <Tabs
              centered
              activeKey={registerMethod}
              onChange={(key) => setRegisterMethod(key)}
            >
              <Tabs.TabPane key="email" tab="Email">
                <Form
                  name="basic"
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  className="row-col"
                >
                  <Form.Item
                    name="Name"
                    rules={[
                      { required: true, message: "Please input your username!" },
                    ]}
                  >
                    <Input placeholder="Name" />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    rules={[
                      { required: true, message: "Please input your email!" },
                    ]}
                  >
                    <Input placeholder="email" />
                  </Form.Item>
                  <Form.Item
                    name="phone"
                    // label="Phone Number"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your phone number!',
                      },
                    ]}
                  >
                    <Input
                      placeholder="Phone Number"
                      addonBefore={prefixSelector}
                      style={{
                        width: '100%',
                      }}
                    />
                  </Form.Item>
                  <Form.Item

                    name="password"
                    rules={[{ required: true, message: "Please input your password!" }]}
                  >
                    <Input.Password placeholder="Password" />
                  </Form.Item>

                  <Form.Item name="remember" valuePropName="checked">
                    <Checkbox>
                      I agree the{" "}
                      <a href="#pablo" className="font-bold text-dark">
                        Terms and Conditions
                      </a>
                    </Checkbox>
                  </Form.Item>

                  <Form.Item>
                    <Button
                      style={{ width: "100%" }}
                      type="primary"
                      htmlType="submit"
                    >
                      SIGN UP
                    </Button>
                  </Form.Item>
                </Form>
              </Tabs.TabPane>
              <Tabs.TabPane key="mobile" tab="Mobile">
                <Form
                  onFinish={handleOTPSubmit}
                  layout="vertical"
                  className="row-col"
                >
                  <Form.Item
                    label="Mobile Number"
                    name="mobile"
                    rules={[{ required: true, message: "Please input your mobile number!" }]}
                  >
                    <Input
                      placeholder="Mobile Number"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item
                    label="password"
                    name="password"
                    rules={[{ required: true, message: "Please input your password!" }]}
                  >
                    <Input.Password placeholder="Password" />
                  </Form.Item>
                  <Form.Item
                    label="OTP"
                    name="otp"
                    rules={[{ required: true, message: "Please input the OTP!" }]}
                  >
                    <Input placeholder="OTP" />
                  </Form.Item>
                  <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'end' }}>
                    {!otpRequested ? (
                      <Form.Item >
                        <Button type="primary" onClick={handleGenerateOTP} size="small">
                          Generate OTP
                        </Button>
                      </Form.Item>
                    ) : (
                      <>
                        <Form.Item>
                          <Button type="primary" onClick={regenerateOTP} size="small">
                            Resend OTP
                          </Button>
                        </Form.Item>

                      </>
                    )}
                  </div>

                  <Form.Item >
                    <Button type="primary" htmlType="submit" block size="small">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </Tabs.TabPane>
            </Tabs>
            <p className="font-semibold text-muted text-center">
              Already have an account?{" "}
              <Link to="/sign-in" className="font-bold text-dark">
                Sign In
              </Link>
            </p>
          </Card>
        </Content>

        <BasicFooter />
      </Layout>
    </>
  );
};

export default SignUp;