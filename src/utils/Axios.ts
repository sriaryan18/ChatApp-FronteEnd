import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

// Create a shared Axios instance
const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to make a request
const makeRequest = async (method: string, url: string, data?: any, customHeaders?: any, params?: any) => {
  const config: AxiosRequestConfig = {
    method,
    url,
    data,
    params,
    headers: { ...instance.defaults.headers, ...customHeaders },
  };
  try {
    const response = await instance(config);
    return response;
  } catch (error) {
    console.error('Error making request:', error);
    throw error;
  }
};

// API methods
const api = {
  get: async (url: string, params?: any, customHeaders?: any) => await makeRequest('GET', url, undefined, customHeaders, params),
  post: async (url: string, data: any, customHeaders?: any) => await makeRequest('POST', url, data, customHeaders),
  put: async (url: string, data: any, customHeaders?: any) => await makeRequest('PUT', url, data, customHeaders),
  delete: async (url: string, customHeaders?: any) => await makeRequest('DELETE', url, undefined, customHeaders),
};

export default api;
