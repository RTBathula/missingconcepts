import { makeRequest } from '~/plugins/axios';

export const addStory = async (filePrePath, file, title, description, langRegion) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('title', title);
  formData.append('description', description);
  formData.append('langRegion', langRegion);

  return makeRequest({
	  url: `/story?filePrePath=${filePrePath}`,
	  method: 'POST',
	  data: formData,
	  headers: {
	  	Accept: 'application/json',
	    'Content-Type': 'multipart/form-data'
	  }
  });
};

export const listStories = async (skip, limit, byUser, langRegion) => {
  let reqURL = `/story/list?skip=${skip}&limit=${limit}&byUser=${byUser}`;
  if (langRegion) {
    reqURL = `${reqURL}&langRegion=${langRegion}`;
  }

  return makeRequest({
    url: reqURL,
    method: 'GET'
  });
};

export const deleteStory = async id => makeRequest({
  url: `/story/${id}`,
  method: 'DELETE'
});
