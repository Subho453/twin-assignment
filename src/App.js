import React from "react";
import { Row, Col, Menu, Form, Select, Input, Button } from "antd";
import { HistoryOutlined, PhoneOutlined } from "@ant-design/icons";
import "./App.css";

const { Option } = Select;
const items = [
  {
    label: "Outbound Call",
    key: "outbound",
    icon: <PhoneOutlined />,
  },
  {
    label: "Call History",
    key: "history",
    icon: <HistoryOutlined />,
  },
];
function App() {
  const [current, setCurrent] = React.useState("outbound");

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="+91">+91</Option>
      </Select>
    </Form.Item>
  );

  return (
    <div className="App">
      <div className="container">
        <Row>
          <Col md={6} xs={24}>
            <Menu
              onClick={onClick}
              selectedKeys={[current]}
              mode={window.innerWidth < 768 ? "horizontal" : "vertical"}
              items={items}
            />
          </Col>
          <Col md={18} xs={24}>
            <Form
              layout="vertical"
              labelCol={{
                xs: { span: 16, offset: 4 },
                sm: { span: 12, offset: 6 },
              }}
              wrapperCol={{
                xs: { span: 16, offset: 4 },
                sm: { span: 12, offset: 6 },
              }}
              name="outbound-form"
              onFinish={(values) => console.log(values)}
              initialValues={{
                prefix: "+91",
                duration: "5",
              }}
              scrollToFirstError
            >
              <Form.Item
                name="name"
                label="Name"
                rules={[
                  {
                    required: true,
                    message: "Please input your nickname!",
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item
                name="to_call"
                label="Phone Number to connect"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number to connect!",
                  },
                ]}
              >
                <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item
                name="duration"
                label="Duration"
                rules={[
                  {
                    required: true,
                    message: "Please select duration!",
                  },
                ]}
              >
                <Select>
                  <Option value="5">5 minutes</Option>
                  <Option value="10">10 minutes</Option>
                  <Option value="15">15 minutes</Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Make a Call
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default App;
