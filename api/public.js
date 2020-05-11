import { makeRequest } from '~/plugins/axios';

export const listPublicStories = async (skip, limit, langRegion) => {
  let reqURL = `/public/story/list?skip=${skip}&limit=${limit}`;
  if (langRegion) {
    reqURL = `${reqURL}&langRegion=${langRegion}`;
  }

  return makeRequest({
    url: reqURL,
    method: 'GET'
  });
};

export const getStory = async id => makeRequest({
  url: `/public/story/${id}`,
  method: 'GET'
});

export const countVotes = async (storyId, type) => makeRequest({
  url: `/public/vote/count/${storyId}/${type}`,
  method: 'GET'
});
