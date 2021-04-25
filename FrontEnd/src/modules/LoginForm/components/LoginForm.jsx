import React from 'react';
import { Form, Input } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Block, Button } from '../../../components';
import { validateField } from '../../../utils/helpers';

const LoginForm = (props) => {
  const { touched, errors, handleChange, handleBlur, handleSubmit } = props;
  return (
    <div>
      <div className="auth__top">
        <h2>Войти в аккаунт</h2>
        <p>Пожалуйста, войдите в аккаунт</p>
      </div>
      <Block>
        <Form
          onSubmit={handleSubmit}
          name="normal_login"
          className="login-form"
        >
          <Form.Item
            name="email"
            validateStatus={validateField('email', touched, errors)}
            help={!touched.email ? '' : errors.email}
            hasFeedback
          >
            <Input
              id="email"
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Е-Mail"
              size="large"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Item>
          <Form.Item
            name="password"
            validateStatus={validateField('password', touched, errors)}
            help={!touched.password ? '' : errors.password}
            hasFeedback
          >
            <Input
              id="password"
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Пароль"
              size="large"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Item>
          <Form.Item>
            <Button onClick={handleSubmit} type="primary" size="large">
              Войти в аккаунт
            </Button>
          </Form.Item>
          <Link className="auth__register-link" to="/register">
            Зарегистрироваться
          </Link>
        </Form>
      </Block>
    </div>
  );
};

export default LoginForm;
