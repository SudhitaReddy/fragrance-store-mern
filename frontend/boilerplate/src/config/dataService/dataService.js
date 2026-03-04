import axios from 'axios';
import MockDataService from './mockDataService';
import { getItem } from '../../utility/localStorageControl';

const API_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/api`;

const authHeader = () => ({
  Authorization: `Bearer ${getItem('access_token')}`,
});

const client = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    Authorization: `Bearer ${getItem('access_token')}`,
    'Content-Type': 'application/json',
  },
});

class DataService {
  static get(path = '') {
    // Use mock service in development if API is unavailable
    if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_USE_MOCK_API === 'true') {
      return MockDataService.get(path);
    }

    return client({
      method: 'GET',
      url: path,
      headers: { ...authHeader() },
    }).catch((error) => {
      // Fallback to mock data if API fails (e.g., SSL issues)
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.warn('API request failed, falling back to mock data:', error.message);
        return MockDataService.get(path);
      }
      throw error;
    });
  }

  static post(path = '', data = {}, optionalHeader = {}) {
    // Use mock service in development if API is unavailable
    if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_USE_MOCK_API === 'true') {
      return MockDataService.post(path, data);
    }

    return client({
      method: 'POST',
      url: path,
      data,
      headers: { ...authHeader(), ...optionalHeader },
    }).catch((error) => {
      // Fallback to mock data if API fails (e.g., SSL issues)
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.warn('API request failed, falling back to mock data:', error.message);
        return MockDataService.post(path, data);
      }
      throw error;
    });
  }

  static patch(path = '', data = {}) {
    return client({
      method: 'PATCH',
      url: path,
      data: JSON.stringify(data),
      headers: { ...authHeader() },
    }).catch((error) => {
      // Fallback to mock data if API fails (e.g., SSL issues)
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.warn('API request failed, falling back to mock data:', error.message);
        return MockDataService.patch(path, data);
      }
      throw error;
    });
  }

  static put(path = '', data = {}) {
    return client({
      method: 'PUT',
      url: path,
      data: JSON.stringify(data),
      headers: { ...authHeader() },
    }).catch((error) => {
      // Fallback to mock data if API fails (e.g., SSL issues)
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.warn('API request failed, falling back to mock data:', error.message);
        return MockDataService.put(path, data);
      }
      throw error;
    });
  }
}

/**
 * axios interceptors runs before and after a request, letting the developer modify req,req more
 * For more details on axios interceptor see https://github.com/axios/axios#interceptors
 */
client.interceptors.request.use((config) => {
  // do something before executing the request
  // For example tag along the bearer access token to request header or set a cookie
  const requestConfig = config;
  const { headers } = config;
  requestConfig.headers = { ...headers, Authorization: `Bearer ${getItem('access_token')}` };

  return requestConfig;
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    /**
     * Do something in case the response returns an error code [3**, 4**, 5**] etc
     * For example, on token expiration retrieve a new access token, retry a failed request etc
     */
    const { response } = error;
    const originalRequest = error.config;
    if (response) {
      if (response.status === 500) {
        // do something here
      } else {
        return originalRequest;
      }
    }
    return Promise.reject(error);
  },
);
export { DataService };
