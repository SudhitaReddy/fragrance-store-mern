import UilFacebook from '@iconscout/react-unicons/icons/uil-facebook-f';
import UilGithub from '@iconscout/react-unicons/icons/uil-github';
import UilGoogle from '@iconscout/react-unicons/icons/uil-google';
import UilTwitter from '@iconscout/react-unicons/icons/uil-twitter';
import { Button, Col, Form, Input, Row } from 'antd';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import { AuthFormWrap } from './style';
import { loginUser } from '../../../../redux/authentication/authSlice';
import { Checkbox } from '../../../../components/checkbox/checkbox';

function FbSignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.loading);
  const [form] = Form.useForm();
  const [state, setState] = useState({
    checked: null,
  });

  const handleSubmit = useCallback(
    (values) => {
      dispatch(loginUser({ values, callback: () => navigate('/admin') }));
    },
    [navigate, dispatch],
  );

  const onChange = (checked) => {
    setState({ ...state, checked });
  };

  return (
    <Row justify="center">
      <Col xxl={6} xl={8} md={12} sm={18} xs={24}>
        <AuthFormWrap>
          <div className="ninjadash-authentication-top">
            <h2 className="ninjadash-authentication-top__title">Sign in to Firebase</h2>
          </div>
          <div className="ninjadash-authentication-content">
            <Form name="login" form={form} onFinish={handleSubmit} layout="vertical">
              <Form.Item
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
                initialValue="demo@example.com"
                label="Email Address"
              >
                <Input placeholder="name@example.com" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
                initialValue="123456"
                label="Password"
              >
                <Input.Password placeholder="Password" />
              </Form.Item>
              <div className="ninjadash-auth-extra">
                <Checkbox onChange={onChange} checked={state.checked}>
                  Keep me logged in
                </Checkbox>
                <Link className="forgot-pass-link" to="/forgotPassword">
                  Forgot password?
                </Link>
              </div>
              <Form.Item>
                <Button className="btn-signin" htmlType="submit" type="primary" size="large">
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Button>
              </Form.Item>
              <p className="ninjadash-form-divider">
                <span>Or</span>
              </p>
              <ul className="ninjadash-social-login">
                <li>
                  <Link className="google-social" to="#">
                    <ReactSVG src={require(`../../../../static/img/icon/google-customIcon.svg`).default} />
                    <span className="social-text">Continue with Google</span>
                  </Link>
                </li>
                <li>
                  <Link className="facebook-social" to="#">
                    <UilFacebook />
                    <span className="social-text">Continue with Facebook</span>
                  </Link>
                </li>
                <li>
                  <Link className="twitter-social" to="#">
                    <UilTwitter />
                    <span className="social-text">Continue with Twitter</span>
                  </Link>
                </li>
              </ul>
              <div className="ninjadash-authentication-bottom">
                <p>
                  Don't have an account?{' '}
                  <Link to="/fbRegister">Create an account</Link>
                </p>
                <p className="auth-switch">
                  <Link to="/" className="auth0-login">
                    Back to Auth0 Login
                  </Link>
                </p>
              </div>
            </Form>
          </div>
        </AuthFormWrap>
      </Col>
    </Row>
  );
}

export default FbSignIn;