import React, { useEffect } from "react";
import {
  Row,
  Col,
  Menu,
  Form,
  Select,
  Input,
  Button,
  Statistic,
  Table,
} from "antd";
import { HistoryOutlined, PhoneOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import { makeOutBoundCall, getCallHistory } from "./actions";

const { Option } = Select;
const { Countdown } = Statistic;

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

const columns = [
  {
    title: "Caller",
    dataIndex: "from",
    key: "from",
  },
  {
    title: "Receiver",
    dataIndex: "to",
    key: "to",
  },
  {
    title: "Duration",
    dataIndex: "duration",
    key: "duration",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
];

function App() {
  const [current, setCurrent] = React.useState("outbound");
  const [duration, setDuration] = React.useState(0);
  // const outboundCall = useSelector((state) => state.call.outboundCall);
  const callHistory = useSelector((state) => state.call.callHistory);
  const dispatch = useDispatch();

  const onClick = (e) => {
    setCurrent(e.key);
    if (e.key === "history" && !callHistory) {
      dispatch(getCallHistory(10, 0));
    }
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
        <Row gutter={[20, 20]}>
          <Col md={6} xs={24}>
            <Menu
              onClick={onClick}
              selectedKeys={[current]}
              mode={
                window.innerWidth < 768 && window.innerWidth > 360
                  ? "horizontal"
                  : "vertical"
              }
              items={items}
            />
          </Col>
          <Col md={18} xs={24}>
            {current === "outbound" ? (
              <Form
                layout="vertical"
                labelCol={{
                  xs: { span: 16, offset: 0 },
                  sm: { span: 12, offset: 6 },
                }}
                wrapperCol={{
                  xs: { span: 16, offset: 0 },
                  sm: { span: 12, offset: 6 },
                }}
                name="outbound-form"
                onFinish={(values) => {
                  const duration =
                    Date.now() + 1000 * 60 * Number(values.duration);
                  setDuration(duration);
                  dispatch(
                    makeOutBoundCall({
                      to: values.prefix + values.to,
                      from: values.prefix + values.from,
                      duration: Number(values.duration) * 60,
                    })
                  );
                }}
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
                  name="from"
                  label="Phone Number"
                  rules={[
                    {
                      required: true,
                      message: "Please input your phone number!",
                    },
                  ]}
                >
                  <Input
                    addonBefore={prefixSelector}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
                <Form.Item
                  name="to"
                  label="Phone Number to connect"
                  rules={[
                    {
                      required: true,
                      message: "Please input your phone number to connect!",
                    },
                  ]}
                >
                  <Input
                    addonBefore={prefixSelector}
                    style={{ width: "100%" }}
                  />
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
                  {duration > 0 ? (
                    <Countdown
                      title="Timer"
                      value={duration}
                      onFinish={() => setDuration(0)}
                    />
                  ) : (
                    <Button type="primary" htmlType="submit">
                      Make a Call
                    </Button>
                  )}
                </Form.Item>
              </Form>
            ) : (
              <Table dataSource={callHistory} columns={columns} />
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default App;
