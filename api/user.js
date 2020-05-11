import { makeRequest } from '~/plugins/axios';

export const login = async idToken => makeRequest({
  url: '/user/tokensignin',
  method: 'POST',
  data: {
    idToken
  }
});
