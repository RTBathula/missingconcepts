const DEFAULT_PARAMS = {
  pending: false,
  error: null,
  value: null
};

const state = () => ({
  newStory: {
    ...DEFAULT_PARAMS
  },
  storyList: {
    ...DEFAULT_PARAMS,
    skip: 0,
    limit: 30,
    appendRecordsPending: false,
    value: []   
  },
  findStory: {
    ...DEFAULT_PARAMS
  },
  removeStory: {
    ...DEFAULT_PARAMS,
    pending: {}
  }
});

export default state;
