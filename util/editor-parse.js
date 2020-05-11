const collectText = (jsonObj) => { 
  if (!jsonObj.content) {
    return jsonObj.text ? jsonObj.text : '';
  }

  let content = '';  
  for (let i = 0; i < jsonObj.content.length; ++i) {  	
    const collectedTxt = collectText(jsonObj.content[i]);
    content = `${content} ${collectedTxt}`;  	  
  }

  return content;
};

export const parseTitle = (titleJSON) => {
  const parsedObj = JSON.parse(titleJSON);   
  return parsedObj.content[0].content[0].text;      		
};

export const parseContent = (contentJSON) => {  
  return collectText(JSON.parse(contentJSON));	
};
