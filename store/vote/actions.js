import { getUserFromCookie } from '~/util/cookie';
import * as voteAPI from '~/api/vote';
import * as publicAPI from '~/api/public';

const actions = {
  async countVotes ({ commit }, { storyId, type }) {
	  const apiResp = await publicAPI.countVotes(storyId, type);
	  commit('countVotes', { apiResp });
  },
  async addOrRemoveVote ({ commit }, { storyId, type }) {
	  if (getUserFromCookie()) {
	    const apiResp = await voteAPI.addOrRemoveVote(storyId, type);
	  	commit('addOrRemoveVote', { apiResp });
	  }  
  }
};

export default actions;
