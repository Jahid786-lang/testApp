import axios from 'axios';
import {Alert} from 'react-native';

const createAxiosDefaults = {
  baseURL: process.env.REACT_APP_BASH,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
};

const instance = axios.create(createAxiosDefaults);

instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status >= 500) {
      Alert.alert('Internal server error, contact administrator');
    } else if (error.response.status === 413) {
      Alert.alert('Request Entity Too Large');
    }
    return Promise.reject(error);
  },
);

export const baseAxios = {
  get: url =>
    request(url, {
      method: 'GET',
    }),
};

async function request(url, options) {
  return instance(url, options)
    .then(res => res.data)
    .catch(err => onError(err));
}

export const onError = async error => {
  let errorMessage = 'Oops, something went wrong. Please try again later.';

  if (error.response?.data) {
    return Promise.reject(error.response?.data);
  }
  const {response} = error;
  errorMessage = response.data?.error ? response.data.error : errorMessage;
  console.error(`${response.status} - ${errorMessage}`);

  return Promise.reject(errorMessage);
};

export default baseAxios;
