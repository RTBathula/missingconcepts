import { parseTitle } from '../../util/editor-parse';
import { toStoryDate } from '../../util/app-date';

export default {
  	props: ['data'],
  	methods: {
  		getTitle (titleJSON) {
  		  return parseTitle(titleJSON);	
  		}
  	},
  	filters: {      
	    toStoryDate
  	}
};
