const mutations = {
  countVotes (state, { apiResp }) {
    if (apiResp.error) {
    	return;
    }
   
    state.primaryVotes = apiResp.data.count;
  },

  addOrRemoveVote (state, { apiResp }) {
    if (apiResp.error) {
    	return;
    } 

    if (apiResp.data === 'addedVote') {
    	state.primaryVotes = parseInt(state.primaryVotes) + 1;
    	return;
    }

    if (apiResp.data === 'removedVote') {
    	const finalCount = parseInt(state.primaryVotes) - 1;
    	state.primaryVotes = finalCount < 0 ? 0 : finalCount;
    }  
  }
};

export default mutations;
