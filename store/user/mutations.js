import { getUserFromCookie } from '~/util/cookie';
import { fetchClaims, setAuthTokens, removeAuthTokens } from '../../util/cookie';

const mutations = {
  setUserFromCookie (state) {
  	state.user = getUserFromCookie();
  },

  login (state, { apiResp }) {
	  if (apiResp.error) {
	  	return;
	  }

	  const claims = fetchClaims(apiResp.data.accessToken);
	  state.user = (claims && claims.user) ? claims.user : {};  
	  setAuthTokens(apiResp.data);
  },

  deleteToken (state) {
	  state.user = null;
	  removeAuthTokens();  
  }
};

export default mutations;
