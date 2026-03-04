import UilFacebook from '@iconscout/react-unicons/icons/uil-facebook-f';
import UilGithub from '@iconscout/react-unicons/icons/uil-github';
import UilGoogle from '@iconscout/react-unicons/icons/uil-google';
import UilTwitter from '@iconscout/react-unicons/icons/uil-twitter';
import { Button, Col, Form, Input, Row } from 'antd';
import React, { useCallback, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import { AuthFormWrap } from './style';
import { registerUser } from '../../../../redux/authentication/authSlice';
import { Checkbox } from '../../../../components/checkbox/checkbox';

function FbSignup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Memoize selectors to prevent unnecessary re-renders
  const isLoading = useMemo(() => (state) => state.auth.loading, []);
  const url = useMemo(() => (state) => state.auth.url, []);
  const isFileLoading = useMemo(() => (state) => state.auth.isFileLoading, []);
  
  const loading = useSelector(isLoading);
  const avatarUrl = useSelector(url);
  const fileLoading = useSelector(isFileLoading);
  
  const [form] = Form.useForm();
  const [state, setState] = useState({
    checked: null,
  });

  const handleSubmit = useCallback(
    (values) => {
      dispatch(registerUser({ values, callback: () => navigate('/admin') }));
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
            <h2 className="ninjadash-authentication-top__title">Sign up to Firebase</h2>
          </div>
          <div className="ninjadash-authentication-content">
            <Form name="register" form={form} onFinish={handleSubmit} layout="vertical">
              <Form.Item
                name="name"
                rules={[{ required: true, message: 'Please input your full name!' }]}
                label="Full Name"
              >
                <Input placeholder="Full name" />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
                label="Email Address"
              >
                <Input placeholder="name@example.com" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
                label="Password"
              >
                <Input.Password placeholder="Password" />
              </Form.Item>
              <Form.Item
                name="confirmPassword"
                dependencies={['password']}
                rules={[
                  { required: true, message: 'Please confirm your password!' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('The two passwords do not match!'));
                    },
                  }),
                ]}
                label="Confirm Password"
              >
                <Input.Password placeholder="Confirm password" />
              </Form.Item>
              <div className="ninjadash-auth-extra">
                <Checkbox onChange={onChange} checked={state.checked}>
                  Creating an account means you're okay with our{' '}
                  <Link to="#">Terms of Service</Link> and{' '}
                  <Link to="#">Privacy Policy</Link>
                </Checkbox>
              </div>
              <Form.Item>
                <Button className="btn-create" htmlType="submit" type="primary" size="large">
                  {loading ? 'Creating Account...' : 'Create Account'}
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
                  Already have an account?{' '}
                  <Link to="/fbSignIn">Sign in here</Link>
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

export default FbSignup;