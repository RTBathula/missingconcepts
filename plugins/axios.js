import Vue from 'vue';
import axios from 'axios';
import { getAuthTokens } from '../util/cookie';
import liteEnv from '~/config/lite-env';

const router = axios.create({
  baseURL: liteEnv.BACKEND_URL
});

router.interceptors.request.use((config) => {  
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${getAuthTokens().accessToken || ''}`     
  };
  
  return config;
}, error => Promise.reject(error));

router.interceptors.response.use((response) => response, (error) => {  
  if (error.response) {    
    if (error.response.status === 401) {         
      // store.commit('user/logout');          
    }
  }
  return Promise.reject(error);
});

const errorInterceptor = async (request) => {
  const reply = { data: null, error: '', status: 0 };
  try {
    const data = await request;     
    reply.data = data.data;
  } catch (e) {  
    reply.error = (e.response && e.response.data) ? e.response.data : 'Something went wrong';
    reply.status = (e.response && e.response.status) ? e.response.status : 0;
  }

  return reply;
};

export const makeRequest = (reqConfig) => { 
  return errorInterceptor(router({
    ...reqConfig
  }));
};

Vue.use(router);
