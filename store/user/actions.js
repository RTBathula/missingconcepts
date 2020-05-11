import * as userAPI from '~/api/user';

const actions = {
  async login ({ commit }, { idToken }) {
	  const apiResp = await userAPI.login(idToken);
	  commit('login', { apiResp });
  }
};

export default actions;
