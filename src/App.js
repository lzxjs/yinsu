import React, { useEffect } from 'react'
import useForm from 'rc-form-hooks'
import { Row, Col, Form, Icon, Input, Button, Checkbox, message } from 'antd'
import styled from 'styled-components'
import { login } from './api/login'

const OperaDiv = styled.div`
  border: 1px solid #ccc;
  width: 250px;
  height: 250px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
`;

const OperaSpan = styled.span`
  text-align: center;
  display: inline-block;
  width: 100%;
  margin: 15px 0;
`;

const App = () => {
  const { getFieldDecorator, validateFields, errors, values } = useForm();
  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields()
      .then(res => {
        let info = {
          username: res.username,
          password: res.password
        }
        login(info.username, info.password).then(res => {
          if(res.code === 200) {
            message.success('登录成功！');
          }else {
            message.error(res.msg);
          }
        })
      })
      .catch(e => console.error(e.message,1));
  }

  return (
    <div>
      <Row>
        <Col md={12} xs={24}>
          <OperaSpan>操作区</OperaSpan>
          <OperaDiv>
            <Form onSubmit={handleSubmit} className="login-form">
              <Form.Item>
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: '请输入用户名' }],
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="用户名"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '请输入密码' }],
                })(
                  <Input.Password
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="密码"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(<Checkbox>记住密码</Checkbox>)}
                <Button type="primary" htmlType="submit" className="login-form-button">
                  登录
                </Button>
              </Form.Item>
            </Form>
          </OperaDiv>
        </Col>
        <Col md={12} xs={24}>
          <OperaSpan>工作区</OperaSpan>
          <OperaDiv></OperaDiv>
        </Col>
      </Row>

    </div>
  )
}

export default App