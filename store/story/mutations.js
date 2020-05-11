const mutations = {
  addStoryPending (state, flag) {
    state.newStory = {
      ...state.newStory,
      pending: flag,
      error: null
    };  
  },

  addStory (state, { apiResp }) {
    if (apiResp.error) {
    	state.newStory = {
  	    ...state.newStory,
  	    pending: false,
  	    error: apiResp.error
      };
    }

    	state.newStory = {
  	    ...state.newStory,
  	    value: apiResp.data, 
  	    pending: false,
  	    error: null
    };
  },

  listStoriesPending (state, flag) {
    state.storyList = {
      ...state.storyList,
      pending: flag,
      error: null,
      value: []
    };  
  },

  appendingStoriesPending (state, flag) {
    state.storyList = {
      ...state.storyList,   
      appendRecordsPending: flag    
    };  
  },

  listStories (state, { apiResp, skip }) { 
    if (apiResp.error) {
      state.storyList = {
        pending: false,
        error: apiResp.error,
        value: [] 
      };
      return;
    }
          
    state.storyList = {
      ...state.storyList,
      pending: false,
      appendRecordsPending: false,
      error: null,
      skip: skip + state.storyList.limit,
      value: [
        ...state.storyList.value,
        ...apiResp.data
      ]
    };
  },

  findStoryPending (state, flag) {
    state.findStory = {
      ...state.findStory,
      pending: flag,
      error: null
    };  
  },

  getStory (state, { apiResp }) {
    if (apiResp.error) {
      state.findStory = {
        ...state.findStory,
        pending: false,
        error: apiResp.error
      };
    }

    state.findStory = {
      ...state.findStory,
      value: apiResp.data, 
      pending: false,
      error: null
    };
  },

  removeStoryPending (state, { flag, id }) {
    state.removeStory = {
      ...state.removeStory,
      pending: {
        ...state.removeStory.pending,
        [id]: flag
      },
      error: null
    };  
  },

  deleteStory (state, { apiResp, id }) {
    if (apiResp.error) {
      state.removeStory = {
        ...state.removeStory,
        pending: {
          ...state.removeStory.pending,
          [id]: false
        },
        value: null,
        error: apiResp.error
      };
      return;
    }

    state.removeStory = {
      ...state.removeStory,
      value: 'success', 
      pending: {
        ...state.removeStory.pending,
        [id]: false
      },
      error: null
    };

    if (!apiResp.error) {
      const indexToBeRemoved = state.storyList.value.findIndex((story) => (story._id === id));
      if (indexToBeRemoved > -1) {
        state.storyList = {
          ...state.storyList,
          value: [
            ...state.storyList.value.slice(0, indexToBeRemoved),       
            ...state.storyList.value.slice(indexToBeRemoved + 1)
          ]
        }; 
      } 
    }
  }
};

export default mutations;
