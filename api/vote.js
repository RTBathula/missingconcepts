import { makeRequest } from '~/plugins/axios';

export const addOrRemoveVote = async (storyId, type) => makeRequest({
  url: '/vote',
  method: 'POST',
  data: {
  	storyId,
  	type
  }
});
