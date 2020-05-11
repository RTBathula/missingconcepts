import { makeRequest } from '~/plugins/axios';

export const uploadFile = async (filePrePath, file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('name', 'nee abba');
  formData.append('password', 'cheppar');
    
  return makeRequest({
	  url: `/file/upload?filePrePath=${filePrePath}`,
	  method: 'POST',
	  data: formData,	  
	  headers: {
	  	'Accept': 'application/json',
	    'Content-Type': 'multipart/form-data'
	  }
  });
};

export const deleteFile = async (fileName) => makeRequest({
  url: '/file',
  method: 'DELETE',
  data: {
  	path: fileName 
  }
});
