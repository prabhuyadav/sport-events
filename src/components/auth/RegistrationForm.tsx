import React from "react";
import { Button, Form, Input, Typography } from "antd";

import { User } from "../../constants/types";

import { semSpacingXs } from "../../constants/variables";
import { getFormattedErrorMessage } from "../../utils";
import { AxiosError } from "axios";

const { Item } = Form;
const { Text } = Typography;

interface Props {
  buttonText?: string;
  onSubmit: (values: any) => void;
  error: AxiosError;
  hideNameInput?: boolean;
}

const RegistrationForm: React.FC<Props> = ({
  onSubmit,
  error,
  buttonText = "Sign Up",
  hideNameInput = false,
}) => (
  <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 10 }}
    style={{ marginTop: "100px", fontWeight: "bold" }}
    initialValues={{ remember: true }}
    onFinish={onSubmit}
    autoComplete="off"
  >
    <Item<User> label="Username" name="name" hidden={hideNameInput}>
      <Input size="large" />
    </Item>

    <Item<User>
      label="Email"
      name="email"
      rules={[{ required: true, message: "Please input your email address!" }]}
    >
      <Input size="large" />
    </Item>

    <Item<User>
      label="Password"
      name="password"
      rules={[{ required: true, message: "Please input your password!" }]}
    >
      <Input.Password size="large" />
    </Item>

    <Item wrapperCol={{ offset: 8, span: 16 }}>
      {error && (
        <div style={{ display: "flex", marginBottom: semSpacingXs }}>
          <Text type="danger">
            {error.message}. {getFormattedErrorMessage(error)}
          </Text>
        </div>
      )}
      <Button type="primary" size="large" htmlType="submit">
        {buttonText}
      </Button>
    </Item>
  </Form>
);

export default RegistrationForm;
